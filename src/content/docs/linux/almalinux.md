---
title: 'AlmaLinux'
description: 'Package management, EPEL, updates, and firewall setup on an AlmaLinux VPS.'
order: 2
supported: true
---

Our AlmaLinux image is the official AlmaLinux Generic Cloud image, provisioned with `cloud-init`. AlmaLinux is binary-compatible with Red Hat Enterprise Linux, so most RHEL documentation and software applies to it as well. For help deciding whether AlmaLinux is right for you, see [Choosing a Linux distribution](/docs/vps/choosing-a-distro).

---

## What's in the image

- **Packages:** a minimal AlmaLinux install with `dnf`, OpenSSH, and `cloud-init`.
- **Networking:** configured by `cloud-init` at boot. See [VPS networking](/docs/vps/networking) for how your addresses are assigned.
- **Firewall:** the cloud image doesn't ship with an active firewall. See [Set up a firewall](#set-up-a-firewall).
- **SELinux:** enabled and enforcing. Some changes, like moving SSH to a different port, need an SELinux policy update as well.

To check which AlmaLinux release you're running:

```bash
cat /etc/almalinux-release
```

---

## Install packages

AlmaLinux uses `dnf` to install packages:

```bash
sudo dnf install htop
```

### Enable EPEL

AlmaLinux's own repositories are smaller than Fedora's or Debian's. Many common packages, such as `htop` and `fail2ban`, are in [EPEL](https://docs.fedoraproject.org/en-US/epel/) (Extra Packages for Enterprise Linux). To enable it, along with the CRB repository that some EPEL packages depend on, run:

```bash
sudo dnf install epel-release dnf-plugins-core
sudo dnf config-manager --set-enabled crb
```

---

## Update your system

To install the latest updates:

```bash
sudo dnf upgrade --refresh
```

Reboot if the update installed a new kernel. Minor releases, such as 10.0 to 10.1, are delivered as normal updates, so you don't need to do anything special to move between them.

### Automatic updates

To install updates automatically, install `dnf-automatic`:

```bash
sudo dnf install dnf-automatic
```

Open `/etc/dnf/automatic.conf` and set `apply_updates = yes` in the `[commands]` section so updates are applied, not just downloaded. Then, enable the timer:

```bash
sudo systemctl enable --now dnf-automatic.timer
```

### Major releases

Each major AlmaLinux release, such as AlmaLinux 10, is supported for about 10 years. Upgrading between major releases in place isn't recommended. When your release nears the end of its support, we recommend creating a new VPS on the current release and moving your applications over. If you need an in-place upgrade, see AlmaLinux's [ELevate project](https://wiki.almalinux.org/elevate/).

---

## Set up a firewall

AlmaLinux uses `firewalld`, the same as Fedora. Our [hardening guide](/docs/vps/hardening#4-set-up-your-firewall) walks through installing and configuring it. Follow the Fedora instructions.

---

## Next steps

Our [non-root user](/docs/vps/user-setup) and [hardening](/docs/vps/hardening) guides apply to AlmaLinux. Follow the Fedora instructions in each. Install `fail2ban` from EPEL.
