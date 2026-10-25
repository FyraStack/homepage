---
title: 'Gentoo'
description: 'Portage, binary packages, services, updates, and firewall setup on a Gentoo VPS.'
order: 10
supported: true
---

Our Gentoo image is Gentoo's official amd64 cloud-init disk image, provisioned with `cloud-init`. Gentoo is a rolling-release, source-based distribution. Packages are usually compiled on your server with Portage, and you control how they're built with USE flags. For help deciding whether Gentoo is right for you, see [Choosing a Linux distribution](/docs/vps/choosing-a-distro).

---

## What's in the image

- **Profile:** `default/linux/amd64/23.0/no-multilib/systemd`. The image uses systemd, not OpenRC, and has no 32-bit libraries.
- **Packages:** a minimal Gentoo install with Portage, OpenSSH, `sudo`, `cloud-init`, `gentoolkit`, and a few admin tools such as `nano` and `screen`.
- **Kernel:** Gentoo's distribution kernel, installed with GRUB and `dracut`.
- **Networking:** configured by `cloud-init` at boot. See [VPS networking](/docs/vps/networking) for how your addresses are assigned.
- **Firewall:** none is enabled by default. See [Set up a firewall](#set-up-a-firewall).

To check your current profile:

```bash
eselect profile show
```

---

## Sync the package repository

Before installing anything for the first time, download a copy of the Gentoo package repository:

```bash
sudo emerge --sync
```

Run this again before installing or updating packages so Portage sees the latest versions.

---

## Install packages

Gentoo uses `emerge` to install packages:

```bash
sudo emerge --ask app-misc/htop
```

To search for a package, use `eix` (after installing it with `sudo emerge --ask app-portage/eix` and running `sudo eix-update`) or search [packages.gentoo.org](https://packages.gentoo.org):

```bash
eix htop
```

### Use binary packages

Compiling everything from source can be slow on a small VPS. Gentoo runs an official [binary package host](https://wiki.gentoo.org/wiki/Gentoo_Binary_Host_Quickstart) that the image is already configured to use, but Portage only uses it when asked. To use binary packages by default, add the following to `/etc/portage/make.conf`:

```bash
FEATURES="${FEATURES} getbinpkg binpkg-request-signature"
```

Portage falls back to compiling from source when a binary package doesn't match your USE flags.

To avoid compiling the kernel on every update, you can also switch to the prebuilt distribution kernel:

```bash
sudo emerge --ask sys-kernel/gentoo-kernel-bin
sudo emerge --ask --depclean sys-kernel/gentoo-kernel
```

---

## Manage services

Our Gentoo image uses systemd, so services are managed with `systemctl`, the same as on most other distributions:

```bash
sudo systemctl restart sshd       # Start, stop, or restart a service
sudo systemctl enable --now nginx # Start a service now and on boot
systemctl status nginx            # Check a service's status
```

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

Allow members of `wheel` to use `sudo`:

```bash
echo '%wheel ALL=(ALL:ALL) ALL' > /etc/sudoers.d/wheel
chmod 440 /etc/sudoers.d/wheel
```

Then follow the [SSH key steps](/docs/vps/user-setup#2-add-your-ssh-key) in our non-root user guide.

---

## Set up a firewall

UFW is available in the Gentoo repository. Install it, allow SSH and any services you run, then enable it:

```bash
sudo emerge --ask net-firewall/ufw
sudo ufw allow 22/tcp
sudo ufw allow 443/tcp # Example service
sudo ufw enable
sudo systemctl enable --now ufw
```

See our [hardening guide](/docs/vps/hardening) for more on SSH and `fail2ban`. On Gentoo, install packages with `emerge` instead of `apt` or `dnf`.

---

## Next steps

- [Harden your server](/docs/vps/hardening)
- Read the [Gentoo Handbook](https://wiki.gentoo.org/wiki/Handbook:AMD64) for more on Portage, USE flags, and system maintenance
