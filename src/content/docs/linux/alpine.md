---
title: 'Alpine'
description: 'Package management, services, updates, users, and firewall setup on an Alpine Linux VPS.'
order: 7
---

Our Alpine image is the official Alpine Linux cloud image, provisioned with `cloud-init`. Alpine is small and simple, but it works differently from most other distributions: it uses `musl` instead of `glibc`, BusyBox instead of GNU coreutils, and OpenRC instead of systemd. For help deciding whether Alpine is right for you, see [Choosing a Linux distribution](/docs/vps/choosing-a-distro).

---

## What's in the image

- **Packages:** a minimal Alpine install with `apk`, OpenSSH, and `cloud-init`.
- **Networking:** configured by `cloud-init` at boot. See [VPS networking](/docs/vps/networking) for how your addresses are assigned.
- **Firewall:** none is enabled by default. See [Set up a firewall](#set-up-a-firewall).

To check which Alpine release you're running:

```bash
cat /etc/alpine-release
```

---

## Install packages

Alpine uses `apk` to install packages:

```bash
apk update
apk add htop
```

To search for a package:

```bash
apk search htop
```

Because Alpine uses `musl`, prebuilt binaries made for other distributions may not run. Prefer packages from Alpine's repositories, or run the software in a container.

---

## Manage services

Alpine uses OpenRC instead of systemd. The commands you'll use most:

```bash
rc-service sshd restart     # Start, stop, or restart a service
rc-update add nginx default # Start a service on boot
rc-update del nginx default # Stop starting a service on boot
rc-status                   # List services and their status
```

---

## Update your system

To install the latest updates:

```bash
apk update
apk upgrade
```

Reboot if the update installed a new kernel.

### Upgrade to a new Alpine release

A new Alpine release comes out every six months, in May and November. Each release's main repository is supported for about two years.

To upgrade, open `/etc/apk/repositories` and change the version in each URL to the new release. For example, change `v3.22` to `v3.23`. Then run:

```bash
apk update
apk upgrade --available
sync
reboot
```

---

## Add a non-root user

Alpine uses `doas` as a lightweight alternative to `sudo`. Install it, then create your user and add it to the `wheel` group, replacing `stackuser` with your preferred username:

```bash
apk add doas
adduser stackuser
addgroup stackuser wheel
```

Allow members of `wheel` to use `doas`:

```bash
echo 'permit persist :wheel' > /etc/doas.d/wheel.conf
```

Your new user can now run administrative commands with `doas`, for example `doas apk upgrade`. Then follow the [SSH key steps](/docs/vps/user-setup#2-add-your-ssh-key) in our non-root user guide, using `doas` in place of `sudo`.

---

## Set up a firewall

UFW is available in Alpine's community repository. Install it, allow SSH and any services you run, then enable it:

```bash
apk add ufw
ufw allow 22/tcp
ufw allow 443/tcp # Example service
ufw enable
rc-update add ufw default
```

See our [hardening guide](/docs/vps/hardening) for more on SSH and `fail2ban`. On Alpine, use `rc-service` instead of `systemctl`.
