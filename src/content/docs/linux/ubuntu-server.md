---
title: 'Ubuntu Server'
description: 'Package management, updates, release upgrades, and firewall setup on an Ubuntu VPS.'
order: 4
supported: true
---

Our Ubuntu image is the official Ubuntu Server cloud image, provisioned with `cloud-init`. We offer Ubuntu's long-term support (LTS) releases. For help deciding whether Ubuntu is right for you, see [Choosing a Linux distribution](/docs/vps/choosing-a-distro).

---

## What's in the image

- **Packages:** a minimal Ubuntu Server install with `apt`, `snap`, OpenSSH, and `cloud-init`.
- **Networking:** configured by `cloud-init` at boot through Netplan. See [VPS networking](/docs/vps/networking) for how your addresses are assigned.
- **Firewall:** UFW is installed but not enabled. See [Set up a firewall](#set-up-a-firewall).
- **Automatic updates:** security updates are installed automatically by `unattended-upgrades`.

To check which Ubuntu release you're running:

```bash
lsb_release -a
```

---

## Install packages

Ubuntu uses `apt` to install packages. Refresh the package lists first, then install:

```bash
sudo apt update
sudo apt install htop
```

Some software is only distributed as a snap. You can install snaps with `sudo snap install <name>`.

---

## Update your system

To install the latest updates:

```bash
sudo apt update
sudo apt full-upgrade
```

Reboot if the update installed a new kernel. If a reboot is needed, Ubuntu shows a message when you log in, and the file `/var/run/reboot-required` exists.

### Upgrade to a new LTS release

A new LTS release comes out every two years, in April of even-numbered years. Each LTS release gets five years of standard support.

To upgrade, fully update your current release, reboot, and then run:

```bash
sudo do-release-upgrade
```

By default, `do-release-upgrade` only offers the next LTS release once its first point release (for example, 26.04.1) is out. Follow the prompts, and reboot when it finishes.

The upgrader may start a second SSH server on another port as a fallback. Keep your current session open until the upgrade is complete.

---

## Set up a firewall

Our [hardening guide](/docs/vps/hardening#4-set-up-your-firewall) walks through setting up UFW on Ubuntu. Make sure to allow SSH before running `ufw enable`.

---

## Next steps

- [Add a non-root user](/docs/vps/user-setup)
- [Harden your server](/docs/vps/hardening)
