---
title: 'Getting started with a VPS'
description: 'Create your account, set up billing, and launch your first VPS.'
order: 0
---

Thanks for using Fyra Stack! You create and manage your VPS through [Dashboard](https://dash.fyrastack.com). This page walks you through the initial setup of your VPS.

---

## 1. Create an account

To get started, [create an account on Dashboard](https://dash.fyrastack.com/register). Enter your name, email, and a password, and you'll receive a confirmation email. You must confirm your email before you can log in.

---

## 2. Create a project

Once you're logged in, click the button to create a new project. Give it a name and click **Create**.

---

## 3. Add billing information

Click the **Billing** tab in the sidebar, then click **Set up billing**. Enter your credit card details and click **Save**.

---

## Optional: add an SSH key

Open your terminal and run the following command to generate a new SSH key pair:

```bash
ssh-keygen -t ed25519
```

To get the public key, run:

```bash
cat ~/.ssh/id_ed25519.pub
```

If you saved the key in a different location, look there and use `cat` on the file ending in `.pub`.

Copy the line beginning with `ssh-ed25519` and ending with `username@hostname`. This is your public key, which you'll add to your VPS.

On Dashboard, click your profile icon and go to **Keys**. Paste in your public key, give it a name, and click **Add key**.

---

## 4. Create a VPS

In your project, go to the **Servers** tab in the sidebar and click the plus icon to create a new VPS. Name your VPS, select your distribution (see [Choosing a Linux distribution](/docs/vps/choosing-a-distro) for help), select your VPS tier, and add your SSH key.

If you're not using an SSH key, **you must save your root password here**. Your generated root password **will not** be shown again, and if you lose it, you won't be able to access your VPS.

**Note:** each distribution has its own page in our [Linux documentation](/docs/linux) covering what's in the image, installing packages, and updating your system. Read the page for the distribution you picked before you start setting up your server.

---

## Next: connect to your VPS

See [Connecting via SSH](/docs/vps/ssh) to log in for the first time.
