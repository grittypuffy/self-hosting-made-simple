# Pre-requisites

Some of the common dependencies and tools needed for self-hosting services are:

## Containerization software

An application is made up of several dependencies, which need to be installed for proper functionality along with reliance on other services such as databases, cache, messaging queues, APIs, etc. which need to be configured properly. However, installation of these dependencies and configuring services is a laborious and error-prone process.

This is eliminated by containerizing applications, meaning the application's source code and its dependencies are packaged into an image, which can be used to create a container that is consistent regardless of the host environment with all the needed dependencies without conflicts or misconfigurations.

Docker is a popular choice among developers due to its versatility and rich ecosystem for support.

### Installation

Follow the instructions provided in [Docker's documentation for installation of Docker Engine](https://docs.docker.com/engine/install/). Docker Desktop is not necessary as Docker compose and build can be used via the CLI.

Ensure to follow the [post-installation steps](https://docs.docker.com/engine/install/linux-postinstall/) to use Docker without administrator privileges.

Ensure to install Docker compose as well.

## Version Control System

A version control system is highly useful for:

1. Retrieval of configuration files and source code hosted on collaborative software forges such as GitHub, GitLab, Codeberg, etc.
2. Managing configuration files for different services allowing rollback in case of disaster.

Git is a popular version control tool used by developers and can be installed via your Linux distribution's package manager or [via official website](https://git-scm.com/downloads)

## SSH

- `ssh` or Secure SHell, is the utility used to remote into most modern servers.

- This utility is pre-installed on most linux and Mac systems, and windows computers running a Windows 10 version after ~2018.

To login using ssh, open your terminal/command prompt and run the following:

`ssh username@<hostname>`

Note: Password prompt will not show placeholders for the password.

---

### Generating SSH keypair

- SSH is cryptographically secure, but password login is weak by design
- To solve this issue, private-public keypairs are used for log-in on most servers

To generate your ssh keypair, run the following in your terminal/command prompt:

`ssh-keygen -t ed25519`

You can use the defaults for almost all questions prompted.

Note: ED25519 is a more modern cryptographic standard and an alternative to the older RSA. It is preferred here due to its smaller key size.

The key will be stored in `USER_DIR/.ssh`, which is `/home/USERNAME/.ssh` on linux, `C:\Users\USERNAME\.ssh` and `/Users/USERNAME/.ssh` on mac. This directory also stores the configurations for the user.

---

### Making the server use your keypair

- Copy your public key contents. It will be in `USER_DIR/.ssh/id_ed25519.pub`
- Log back into the provisioned VPS with `ssh username@<ip-address>`
- Create a directory called `.ssh` with `mkdir ~/.ssh`
- Use the echo command to add the contents to authorized list of keys with `echo 'KEY_CONTENTS_FROM_CLIPBOARD' >> .ssh/authorized_keys`

At this point, when you log back in, you should be let in without a password, with the authorization being taken care of by the ssh key!

---

### Further securing of SSH

- Others can still login without key
- Root (superuser) login is enabled meaning its easier for bots to brute force the password.

To remedy this, we need to edit ssh server config.
For this, we use nano which is very easy to understand and use.

	nano /etc/ssh/sshd_config
	<navigate to PermitRootLogin section>
	PermitRootLogin no
	<navigate to PasswordAuthentication section>
	PasswordAuthentication no
	<navigate to UsePAM section>
	UsePAM no

---

## Terminal multiplexer

### Using `tmux`

- `tmux` is a "terminal multiplexer" used for running multiple terminal sessions in a single window
- Can be used to multi-task from a single terminal window, or be used to persist long-running sessions over ssh (say a compilation or a long download)
- Launching a new session: `tmux`
- Attach to an existing `tmux` session: `tmux attach`
- Detaching from the session: `tmux detach`

### Useful `tmux` keybindings

- Main useful keybindings (followed by `Ctrl + B`)
  - `c`: Create a new window
  - `n`: Switch to the next window
  - `p`: Switch to the previous window
  - `d`: Detach from the session
  - `%`: Vertical Split
  - `"`: Horizontal Split
  - `o`: Cycle through panes
  - Scrollback & Clipboard
    - `[`: Toggle scrollback (Scroll with arrow keys, mouse or `hjkl`)
    - `Space`: Select a block of text to copy, terminate selection with `Enter`
    - `]`: Paste copied text

---

## Reverse proxy

### Setting up Caddy

- Caddy is a web server and reverse proxy
- More modern than NginX and apache and is easier to configure
- Automatically handles HTTPS redirects and TLS certificates

---

### Installing caddy

Caddy isn't in debian repos, so we must add another package repository:

```
$ extrepo update
$ extrepo enable caddy
$ apt update
$ apt install caddy
```

- Enable the `systemd` service for automatically starting Caddy on every boot: `sudo systemctl enable caddy`

---

### Initial setup of caddy

- Write a basic configuration at `/etc/caddy/Caddyfile`:

```
<hostname> {
	respond "Hi!"
}
```

This configures Caddy to respond to all requests for <hostname> with a `Hi!` body, try opening the hostname given in the chit with your web browser!

# References

1. [Self-hosting workshop by Project Segfault](https://doc.projectsegfau.lt/9cal5vjqSO63NFrONue5Yg#)