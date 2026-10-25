---
title: "openSUSE Leap"
description: "Package management, updates, users, and firewall setup on an openSUSE Leap VPS."
order: 5
supported: true
---

Our openSUSE Leap image is the official openSUSE Leap cloud image, provisioned with `cloud-init`. Leap is built from the same sources as SUSE Linux Enterprise, so it's a good fit if you're already familiar with the SUSE ecosystem. For help deciding whether openSUSE Leap is right for you, see [Choosing a Linux distribution](/docs/vps/choosing-a-distro).

---

## What's in the image

- **Packages:** a minimal openSUSE Leap install with `zypper`, OpenSSH, and `cloud-init`.
- **Networking:** configured by `cloud-init` at boot. See [VPS networking](/docs/vps/networking) for how your addresses are assigned.

To check which Leap release you're running:

```bash
cat /etc/os-release
```

To check whether a firewall is active:

```bash
sudo systemctl status firewalld
```

---

## Install packages

openSUSE uses `zypper` to install packages:

```bash
sudo zypper install htop
```

To search for a package:

```bash
zypper search htop
```

---

## Update your system

To install the latest updates:

```bash
sudo zypper refresh
sudo zypper update
```

Reboot if the update installed a new kernel. `zypper ps -s` lists running programs that still use old, now-replaced files that should be restarted.

### Upgrade to a new Leap release

Each Leap release is supported for about two years. To move to a newer release, follow openSUSE's [system upgrade guide](https://en.opensuse.org/SDB:System_upgrade). Take a backup before upgrading, and only upgrade one release at a time.

---

## Add a non-root user

Create your user, set its password, and add it to the `wheel` group, replacing `stackuser` with your preferred username:

```bash
sudo useradd -m -G wheel stackuser
sudo passwd stackuser
```

Allow members of `wheel` to use `sudo` by creating a sudoers drop-in file:

```bash
sudo visudo -f /etc/sudoers.d/wheel
```

Add this line, then save the file:

```text
%wheel ALL=(ALL:ALL) ALL
```

Then follow the [SSH key steps](/docs/vps/user-setup#2-add-your-ssh-key) in our non-root user guide to let your new user log in.

---

## Set up a firewall

openSUSE uses `firewalld`. Install and enable it, then allow SSH and any services you run:

```bash
sudo zypper install firewalld
sudo systemctl enable --now firewalld
sudo firewall-cmd --permanent --add-service=ssh
sudo firewall-cmd --permanent --add-service=https # Example service
sudo firewall-cmd --reload
sudo firewall-cmd --list-all
```

See our [hardening guide](/docs/vps/hardening) for more on SSH, firewalls, and `fail2ban`. The `firewalld` commands in the Fedora sections work the same way on openSUSE.
