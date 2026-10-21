---
title: 'Debian'
description: 'Package management, updates, release upgrades, and firewall setup on a Debian VPS.'
order: 3
supported: true
---

Our Debian image is the official Debian generic cloud image, provisioned with `cloud-init`. For help deciding whether Debian is right for you, see [Choosing a Linux distribution](/docs/vps/choosing-a-distro).

---

## What's in the image

- **Packages:** a minimal Debian install with `apt`, OpenSSH, and `cloud-init`.
- **Networking:** configured by `cloud-init` at boot. See [VPS networking](/docs/vps/networking) for how your addresses are assigned.
- **Firewall:** the cloud image doesn't ship with an active firewall. See [Set up a firewall](#set-up-a-firewall).

To check which Debian release you're running:

```bash
cat /etc/debian_version
```

---

## Install packages

Debian uses `apt` to install packages. Refresh the package lists first, then install:

```bash
sudo apt update
sudo apt install htop
```

To search for a package:

```bash
apt search htop
```

---

## Update your system

To install the latest updates:

```bash
sudo apt update
sudo apt full-upgrade
```

Reboot if the update installed a new kernel.

### Automatic updates

Debian can install security updates automatically with `unattended-upgrades`:

```bash
sudo apt install unattended-upgrades
sudo dpkg-reconfigure -plow unattended-upgrades
```

Answer **Yes** when asked whether to automatically download and install stable updates.

### Upgrade to a new Debian release

A new Debian release comes out about every two years. Each release gets about three years of security support from Debian, followed by two more years of [Debian LTS](https://wiki.debian.org/LTS).

To upgrade, follow the upgrade chapter of the new release's [release notes](https://www.debian.org/releases/). The process is roughly:

1. Fully update your current release and take a backup.
2. Replace the old release's codename with the new one in your APT sources, under `/etc/apt/sources.list.d/` or in `/etc/apt/sources.list`.
3. Run `sudo apt update`, then `sudo apt upgrade --without-new-pkgs`, then `sudo apt full-upgrade`.
4. Reboot.

Only upgrade one release at a time.

---

## Set up a firewall

Our [hardening guide](/docs/vps/hardening#4-set-up-your-firewall) walks through setting up UFW on Debian.

---

## Next steps

- [Add a non-root user](/docs/vps/user-setup)
- [Harden your server](/docs/vps/hardening)
