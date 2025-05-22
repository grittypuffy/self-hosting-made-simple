# Pre-requisites

Some of the common dependencies and tools needed for self-hosting services are:

## Containerization software

An application is made up of several dependencies, which need to be installed for proper functionality along with reliance on other services such as databases, cache, messaging queues, APIs, etc. which need to be configured properly. However, installation of these dependencies and configuring services is a laborious and error-prone process.

This is eliminated by containerizing applications, meaning the application's source code and its dependencies are packaged into an image, which can be used to create a container that is consistent regardless of the host environment with all the needed dependencies without conflicts or misconfigurations.

Docker is a popular choice among developers due to its versatility and rich ecosystem for support.

### Installation

Follow the instructions provided in [Docker's documentation for installation of Docker Engine](https://docs.docker.com/engine/install/). Docker Desktop is not necessary as Docker compose and build can be used via the CLI.

Ensure to follow the [post-installation steps](https://docs.docker.com/engine/install/linux-postinstall/) to use Docker without administrator privileges.

## Version Control System

A version control system is highly useful for:

1. Retrieval of configuration files and source code hosted on collaborative software forges such as GitHub, GitLab, Codeberg, etc.
2. Managing configuration files for different services allowing rollback in case of disaster.

Git is a popular version control tool used by developers and can be installed via your Linux distribution's package manager or [via official website](https://git-scm.com/downloads)