---
title: 'Fedora Server'
description: 'Package management, updates, release upgrades, and firewall setup on a Fedora VPS.'
order: 1
supported: true
---

Our Fedora image is the official Fedora Cloud Base image, provisioned with `cloud-init`. It's a minimal install, so you'll add the software you need yourself. For help deciding whether Fedora is right for you, see [Choosing a Linux distribution](/docs/vps/choosing-a-distro).

---

## What's in the image

- **Packages:** a minimal Fedora install with `dnf`, OpenSSH, and `cloud-init`.
- **Networking:** configured by `cloud-init` at boot. See [VPS networking](/docs/vps/networking) for how your addresses are assigned.
- **Firewall:** the cloud image doesn't ship with an active firewall. See [Set up a firewall](#set-up-a-firewall).
- **SELinux:** enabled and enforcing. Some changes, like moving SSH to a different port, need an SELinux policy update as well.

To check which Fedora release you're running:

```bash
cat /etc/fedora-release
```

---

## Install packages

Fedora uses `dnf` to install packages:

```bash
sudo dnf install htop
```

To search for a package:

```bash
dnf search htop
```

---

## Update your system

To install the latest updates:

```bash
sudo dnf upgrade --refresh
```

Reboot if the update installed a new kernel.

### Automatic updates

To install updates automatically, install the `dnf5-plugin-automatic` package:

```bash
sudo dnf install dnf5-plugin-automatic
```

Create `/etc/dnf/automatic.conf` with the following content so updates are applied, not just downloaded:

```ini
[commands]
apply_updates = yes
```

Then enable the timer:

```bash
sudo systemctl enable --now dnf5-automatic.timer
```

### Upgrade to a new Fedora release

A new Fedora release comes out about every six months, and each release is supported for about 13 months. Upgrade at least once a year to stay on a supported release.

First, fully update your current release and reboot. Then download the new release, replacing `45` with the release you're upgrading to:

```bash
sudo dnf system-upgrade download --releasever=45
```

When the download finishes, reboot into the upgrade:

```bash
sudo dnf offline reboot
```

The upgrade can take several minutes. Only upgrade one or two releases at a time.

---

## Set up a firewall

Fedora uses `firewalld`. Our [hardening guide](/docs/vps/hardening#4-set-up-your-firewall) walks through installing and configuring it.

---

## Next steps

- [Add a non-root user](/docs/vps/user-setup)
- [Harden your server](/docs/vps/hardening)
