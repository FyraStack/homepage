---
title: "NixOS"
description: "How our NixOS image is built, and how to manage your VPS declaratively with nixos-rebuild."
order: 9
supported: true
---

Our NixOS image is a minimal NixOS install that is provisioned with `cloud-init`, the same way as our other distributions. Unlike other distributions, you configure a NixOS server by editing its Nix configuration and rebuilding the system, not by editing files in `/etc` directly. This page covers what's in the image and how to start managing it yourself.

The image is open source. You can read its full configuration in the [FyraStack/nixos](https://github.com/FyraStack/nixos) repository.

---

## What's in the image

The image is kept intentionally small:

- **Packages:** `cloud-init`, `curl`, `nano`, and `vim`.
- **Networking:** `systemd-networkd`, configured by `cloud-init` at boot. See [VPS networking](/docs/vps/networking) for how your addresses are assigned.
- **Firewall:** the NixOS firewall is enabled, with only TCP port 22 (SSH) open.
- **SSH:** OpenSSH is enabled. Root login and password authentication are allowed by default so you can log in for the first time. Password authentication is disabled if you add an SSH key. We recommend turning both off, as shown in [Harden SSH](#harden-ssh).
- **Flakes:** the `nix-command` and `flakes` experimental features are enabled.
- **Disk:** the root filesystem automatically grows to fill your VPS disk on boot.

---

## Get a copy of your configuration

The flake used to build your image is included at `/etc/nixos`, but those files are read-only links into the Nix store. Copy them somewhere you can edit them:

```bash
sudo cp -rL /etc/nixos /root/nixos
sudo chmod -R u+w /root/nixos
```

The directory contains three files:

- `flake.nix` defines the system configuration, called `x86_64`, and pins the version of nixpkgs it's built from.
- `flake.lock` locks nixpkgs to an exact revision.
- `configuration.nix` is the system configuration itself. This is the file you'll edit most often.

We recommend putting this directory under version control (for example, a private Git repository) so you can track changes and rebuild your server elsewhere if you need to. If you do use Git, remember that flakes only see files that are tracked by Git, so `git add` any new files before rebuilding.

### About `stateVersion`

`configuration.nix` sets `system.stateVersion` to the NixOS release your VPS was installed with, such as `"26.05"`. It tells NixOS which release your stateful data (databases, service data directories, and so on) was created with. Leave it at that value for the lifetime of the server, even after you upgrade. Read the [NixOS manual](https://nixos.org/manual/nixos/stable/options#opt-system.stateVersion) for more information.

If your VPS was created from an older image, your configuration may contain this line instead:

```nix
system.stateVersion = config.system.nixos.release;
```

Replace it with the release your VPS was installed with before you upgrade NixOS. Otherwise, the value will change on upgrade. If you haven't upgraded yet, `nixos-version` shows the right release.

---

## Apply changes

After editing your configuration, rebuild and switch to it:

```bash
sudo nixos-rebuild switch --flake /root/nixos#x86_64
```

If you'd rather test a change without making it the default boot entry, use `test` instead of `switch`. If a change breaks something, roll back to the previous generation:

```bash
sudo nixos-rebuild switch --rollback
```

Previous generations are also listed in the boot menu, which you can reach from the VPS console in Dashboard.

---

## Add a non-root user

On NixOS, you declare users in your configuration instead of running `adduser`. Add the following to `configuration.nix`, replacing `stackuser` and the key with your own:

```nix
users.users.stackuser = {
  isNormalUser = true;
  extraGroups = [ "wheel" ];
  openssh.authorizedKeys.keys = [
    "ssh-ed25519 AAAA... you@example"
  ];
  users.mutableUsers = false;
};
```

Members of `wheel` can use `sudo`. Our image lets `wheel` use `sudo` without a password, since the user is expected to log in with an SSH key. If you'd rather require a password, set one with `sudo passwd stackuser` and add:

```nix
security.sudo.wheelNeedsPassword = true;
```

Rebuild, then confirm you can log in as your new user in a second terminal before continuing.

---

## Harden SSH

The general advice in our [hardening guide](/docs/vps/hardening) applies to NixOS, but you should make the changes in your configuration rather than in `/etc/ssh`. Add the following to `configuration.nix`:

```nix
services.openssh.settings = {
  PermitRootLogin = "no";
  PasswordAuthentication = false;
  KbdInteractiveAuthentication = false;
  X11Forwarding = false;
  MaxAuthTries = 3;
};
```

Keep your current SSH session open, rebuild, and test logging in from a new terminal before you disconnect.

To add `fail2ban`, enable its module. It watches SSH by default:

```nix
services.fail2ban.enable = true;
```

---

## Open firewall ports

The NixOS firewall blocks all incoming traffic except SSH. To publish a service, open its ports in your configuration. For example, for a web server:

```nix
networking.firewall.allowedTCPPorts = [ 22 80 443 ];
```

Many NixOS service modules also have an `openFirewall` option that opens the right ports for you.

---

## Install packages

Add packages to `environment.systemPackages` in `configuration.nix`:

```nix
environment.systemPackages = with pkgs; [
  cloud-init
  curl
  nano
  vim
  git
  htop
];
```

You can search for packages and options at [search.nixos.org](https://search.nixos.org). Keep `cloud-init` in the list, since your VPS uses it to configure networking on boot.

To try a package without installing it, use `nix shell`:

```bash
nix shell nixpkgs#htop
```

---

## Update your system

To pull in the latest updates for your current NixOS release, update the flake lock file and rebuild:

```bash
cd /root/nixos
sudo nix flake update
sudo nixos-rebuild switch --flake .#x86_64
```

Reboot if the update included a new kernel.

### Upgrade to a new NixOS release

New NixOS releases come out every six months, in May and November, and each release is supported for about seven months. To upgrade, change the `nixpkgs` input in `flake.nix` to the new release:

```nix
nixpkgs.url = "github:nixos/nixpkgs/nixos-26.11";
```

Then run the update commands above. Read the [release notes](https://nixos.org/manual/nixos/stable/release-notes) before upgrading, since options are sometimes renamed or removed. Don't change `system.stateVersion` when you upgrade.

---

## Clean up old generations

Every rebuild keeps the previous system around so you can roll back, which uses disk space over time. To delete generations older than two weeks and free unused store paths:

```bash
sudo nix-collect-garbage --delete-older-than 14d
```

You can also have NixOS do this automatically:

```nix
nix.gc = {
  automatic = true;
  dates = "weekly";
  options = "--delete-older-than 14d";
};
```

---

## Things to avoid

- **Don't remove the image's base settings** unless you know what they do. The `proxmox-image.nix` import, boot settings, and `cloud-init` service are what let your VPS boot and come online.
- **Don't hard-code your network settings** unless you need to. `cloud-init` configures your addresses and routes on every boot. If you change your networking and lose access, contact us at [support@fyrastack.com](mailto:support@fyrastack.com).
- **Don't edit files under `/etc` directly.** Most are managed by NixOS and will be overwritten on your next rebuild.
