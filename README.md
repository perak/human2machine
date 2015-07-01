Human to machine
================

This program translates human language to <a href="http://www.meteorkitchen.com">Meteor Kitchen</a> input .json file.

**This is just initial commit, more details will be added soon.**

Usage
-----

```
human2machine input_file.txt [output_file.json]
```

Example input files
-------------------


### Example 1 - CRUD

```
My dear computer,

I want site with three pages: home, customers and about.
In home page I want jumbotron with title: "This application is written in human language!", text: "Human to describe app, machine to write code!", button url: "customers".
Please create one collection: customers.
In customers collection I want three fields: name, address and e-mail.
In customers page I want CRUD for customers collection.
In about page I want text: "This application is written in human language using Meteor Kitchen, code generator for Meteor".

That's it, please create this application for me.

Thank you.
Petar
```

Live application is <a href="http://generator-human.meteor.com" target="_blank">here</a>.


### Example 2 - IoT

```
I want site with one page.
Create one collection: sensors.
In sensors collection I want fields: topic and message.
Connect sensors collection to mosquitto server: "test.mosquitto.org" and subscribe to topic: revspace/sensors/#.
In home page I want table showing sensors collection.
```

Live application is <a href="http://generator-human-iot.meteor.com" target="_blank">here</a>.
