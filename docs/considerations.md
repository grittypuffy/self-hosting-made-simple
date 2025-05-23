# Considerations

Some of the key considerations to be taken into account while self-hosting

## Networking

## Setting up a firewall with UFW

- UFW (or Uncomplicated FireWall) is an easy to use firewall to control which ports are open and to which IPs
- Improves security (since internal ports cannot be exposed, even by mistake)
- Really powerful in controlling who can connect to the server and where they connect to

---

## Basic setup of UFW

- Install UFW: `apt install ufw`
- Start UFW on boot: `systemctl enable --now ufw`
- Setup basic rules so you don't get locked out:
  - Allow ssh traffic: `ufw allow 22/tcp`
  - Allow web traffic:
    - HTTP: `ufw allow 80/tcp`
    - HTTPS: `ufw allow 443/tcp`
    - QUIC/HTTP3: `ufw allow 443/udp`
- Enable UFW: `ufw enable`

## Migration and backups

Needed for disaster recovery and helps in recovery of data and restoration of state of the system with minimal damage

# References

1. [Self-hosting workshop by Project Segfault](https://doc.projectsegfau.lt/9cal5vjqSO63NFrONue5Yg#)