# Systemd Socket Listening Service

Example TCP based service managed and triggered by (Systemd)[https://en.wikipedia.org/wiki/Systemd].

Back in the olden days we used to use [init.d](https://en.wikipedia.org/wiki/Init) to listen out to specified TCP ports and then trigger an executable when a connection to that port was initiated.  This is how old school FTP servers and stuff used to work, they weren't memory resident services bound to a port, merely a binary that was called by init.d when you connected to that port (21 in this case).  It used to work just fine before we hit "internet scale" and spawning off a separate processes for every connection was untenable.

[Systemd](https://en.wikipedia.org/wiki/Systemd) also supports this behaviour.  This enables us to do cheaply and reliably do all sorts of funky and clever things such as listen on a port for messages to trigger certain actions (deploy a file, delete the tmp dir, get the status)

Service is written and tested in Node 18, w/ no deps `/svc`, you can of course use whatever language you want.

## Using

```bash
# link/copy service to /opt
sudo ln svc/svc.js /opt

# for testing purposes symlink to right dir as a user
# for production you'd want to copy the files to /etc/systemd/system
systemctl link --user ${PWD}/systemd/awesome-service.socket
systemctl link --user ${PWD}/systemd/awesome-service.service

systemctl --user start awesome-service.service
systemctl --user start awesome-service.socket

# watch the logs in another window
journalctl -f --user awesome-service.service

# test the service
echo "test" | nc 127.0.0.1 9999

# uninstall the service
systemctl --user disable awesome-service.service
systemctl --user disable awesome-service.socket
```

## NB

This is just a POC but if I was to deploy this into the wild I'd probably wrap it in a container and front it with a TLS + auth reverse-proxy such as nginx or [caddy](https://caddyserver.com/) or only use it in a private subnet.  Preferably both.

## TODO

- [ ] write service as a daemon, not a oneshot hack