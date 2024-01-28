# Simple Node express server with mongoose transactions

## Steps to setup replica set for mongodb local installation on ubuntu

### First copy the mongod config file

```bash
sudo cp /etc/mongod.conf /etc/mongod_repl.conf
```

### Then use editor of your choice to edit the copied config file

```bash
sudo vim /etc/mongod_repl.conf
```

### Then change the line in config file given below

```
storage:
  dbPath: /var/lib/mongodb_repl

systemLog:
  path: /var/log/mongodb/mongod_repl.log

net:
  port: 27018

replication:
  replSetName: rs0
```

### Then create the dirs and files, and assign permissions

```bash
sudo mkdir /var/lib/mongodb_repl
sudo chown mongodb:mongodb /var/lib/mongodb_repl
sudo touch /var/log/mongodb/mongod_repl.log
sudo chown mongodb:mongodb /var/log/mongodb/mongod_repl.log
```

### Then copy our existing startup file:

```bash
sudo cp /lib/systemd/system/mongod.service /etc/systemd/system/mongod_repl.service
```

### If you can't find mongod.service, sudo systemctl status mongod. It looks like:

> Loaded: loaded (/lib/systemd/system/mongod.service; disabled; vendor preset: enabled)

```bash
sudo vim /etc/systemd/system/mongod_repl.service
```

Change these lines:

```
ExecStart=/usr/bin/mongod --config /etc/mongod_repl.conf
PIDFile=/var/run/mongodb/mongod_repl.pid
```

> Let systemctl know we've made some changes: sudo systemctl daemon-reload

### Try to start the second server:

```bash
sudo systemctl start mongod_repl
sudo systemctl status mongod_repl
```

> If it's not running, have a look at the logs:

```bash
sudo tail -n100 /var/log/mongodb/mongod_repl.log
sudo journalctl -n100 -u mongod_repl
```

> (You can add a -f to either of those lines to tail the log)

> Log in (mongo | mongosh) --port 27018

Great! Now you have a second MongoDB server up and running.

### Configure your original server to use the same replication set

```bash
 sudo pico /etc/mongod.conf
```

Add this:

```
replication:
  replSetName: rs0
```

### Restart the mongo service

> Restart MongoDB sudo systemctl restart mongod

### Initialize replica set in primary mongo server

Login in primary mongo server and

```bash
(mongo | mongosh) --port 27018
```

Then in mongo shell run

```
rs.initiate()
```

Then add secondary server IP and port to your primary server

```
rs.add('<<YOUR_IP>>:27018')
// 127.0.0.1:17018
```

Now you should have a working replica set for your local mongo installation.
