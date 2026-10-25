---
title: 'Gentoo'
description: 'Choosing between our systemd and OpenRC images, Portage, binary packages, services, updates, and firewall setup on a Gentoo VPS.'
order: 10
supported: true
---

We offer two Gentoo images: one with **systemd** and one with **OpenRC**. Both are built from Gentoo's official stage3 tarballs and provisioned with `cloud-init`. Gentoo is a rolling-release, source-based distribution: Portage builds packages on your server, and you control how they're built with USE flags. Our images use Gentoo's binary package host by default, so most installs and updates don't need to compile anything. For help deciding whether Gentoo is right for you, see [Choosing a Linux distribution](/docs/vps/choosing-a-distro).

The images are open source. You can read how they're built in the [FyraStack/gentoo](https://github.com/FyraStack/gentoo) repository.

---

## Choosing systemd or OpenRC

Both images have the same packages, kernel, and Portage setup. They differ in their init system and how networking is managed:

|                  | systemd                                | OpenRC                     |
| ---------------- | -------------------------------------- | -------------------------- |
| Profile          | `default/linux/amd64/23.0/systemd`     | `default/linux/amd64/23.0` |
| Services         | `systemctl`                            | `rc-service`, `rc-update`  |
| Networking       | `systemd-networkd`, `systemd-resolved` | NetworkManager             |
| Logging          | journald                               | sysklogd                   |

If you're not sure, choose systemd, since most guides and software assume it. Choose OpenRC if you prefer Gentoo's own init system or want a simpler boot process.

You can't switch an existing VPS between the two. To change, create a new VPS with the other image.

To check which image you're running:

```bash
cat /proc/1/comm
```

This prints `systemd` on the systemd image and `init` on the OpenRC image.

---

## What's in the image

- **Packages:** a minimal Gentoo install with Portage, OpenSSH, `sudo`, `cloud-init`, `curl`, `nano`, `vim`, and `gentoolkit`.
- **Kernel:** `gentoo-kernel-bin`, a prebuilt distribution kernel.
- **Binary packages:** Portage installs packages from Gentoo's binary package host when one matches your USE flags, and checks their signatures.
- **Networking:** configured by `cloud-init` at boot. See [VPS networking](/docs/vps/networking) for how your addresses are assigned.
- **SSH:** root login and password authentication are allowed so you can log in for the first time. We recommend turning both off after you [add a non-root user](#add-a-non-root-user) and an SSH key, as shown in our [hardening guide](/docs/vps/hardening).
- **Firewall:** none is enabled by default. See [Set up a firewall](#set-up-a-firewall).

---

## Sync the package repository

The image doesn't include a copy of the Gentoo package repository, since it would be out of date by the time you create your VPS. Before installing anything for the first time, download it:

```bash
sudo emerge --sync
```

Run this again before installing or updating packages so Portage sees the latest versions. Until your first sync, Portage warns that your profile is invalid. This is expected.

---

## Install packages

Gentoo uses `emerge` to install packages:

```bash
sudo emerge --ask app-misc/htop
```

To search for a package, search [packages.gentoo.org](https://packages.gentoo.org) or use `eix`, after installing it with `sudo emerge --ask app-portage/eix` and running `sudo eix-update`:

```bash
eix htop
```

If you change a package's USE flags, Portage can't use the binary package and compiles it on your server instead. This can take a while on a small VPS.

---

## Manage services

### systemd

```bash
sudo systemctl restart sshd       # Start, stop, or restart a service
sudo systemctl enable --now nginx # Start a service now and on boot
systemctl status nginx            # Check a service's status
```

### OpenRC

```bash
sudo rc-service sshd restart      # Start, stop, or restart a service
sudo rc-update add nginx default  # Start a service on boot
sudo rc-update del nginx default  # Stop starting a service on boot
rc-status                         # List services and their status
```

---

## Network configuration

`cloud-init` writes your network configuration on every boot. Where it goes depends on your image:

- **systemd:** `systemd-networkd` files in `/etc/systemd/network/`. Check the status with `networkctl status`.
- **OpenRC:** NetworkManager connections in `/etc/NetworkManager/system-connections/`. Check the status with `nmcli device status`.

The OpenRC image doesn't use netifrc (`/etc/conf.d/net`), because `cloud-init` can't configure it. Don't add `net.eth0` services, since they conflict with NetworkManager.

If you need to change your network configuration, read [VPS networking](/docs/vps/networking) first. If you lose access, contact us at [support@fyrastack.com](mailto:support@fyrastack.com).

---

## Update your system

Gentoo is a rolling release, so there are no release upgrades. Instead, update regularly. To install the latest updates:

```bash
sudo emerge --sync
sudo emerge --ask --verbose --update --deep --newuse @world
```

After updating, remove packages that are no longer needed and merge any changed configuration files:

```bash
sudo emerge --ask --depclean
sudo dispatch-conf
```

Reboot if the update installed a new kernel.

### Read the news

Gentoo publishes news items for changes that need your attention, such as profile migrations. Portage tells you when there's unread news after a sync. To read it:

```bash
eselect news read
```

Read the news before large updates. If you don't update for a long time, updates can become harder to resolve, so we recommend updating at least every few weeks.

---

## Add a non-root user

Create your user and add it to the `wheel` group, replacing `stackuser` with your preferred username:

```bash
useradd -m -G wheel stackuser
passwd stackuser
```

Members of `wheel` can already use `sudo` without a password, since you'll log in with an SSH key. If you'd rather require a password, edit `/etc/sudoers.d/90-wheel` with `visudo -f /etc/sudoers.d/90-wheel` and remove `NOPASSWD:`.

Then follow the [SSH key steps](/docs/vps/user-setup#2-add-your-ssh-key) in our non-root user guide.

---

## Set up a firewall

UFW is available in the Gentoo repository. Install it, then allow SSH and any services you run:

```bash
sudo emerge --ask net-firewall/ufw
sudo ufw allow 22/tcp
sudo ufw allow 443/tcp # Example service
sudo ufw enable
```

Then start UFW on boot:

```bash
# systemd
sudo systemctl enable --now ufw

# OpenRC
sudo rc-update add ufw default
```

See our [hardening guide](/docs/vps/hardening) for more on SSH and `fail2ban`. On Gentoo, install packages with `emerge` instead of `apt` or `dnf`, and on the OpenRC image, use `rc-service` and `rc-update` instead of `systemctl`.

---

## Next steps

- [Harden your server](/docs/vps/hardening)
- Read the [Gentoo Handbook](https://wiki.gentoo.org/wiki/Handbook:AMD64) for more on Portage, USE flags, and system maintenance
