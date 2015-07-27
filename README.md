Human to machine
================

This program translates human language to <a href="http://www.meteorkitchen.com" target="_blank">Meteor Kitchen</a> input .json file.

**This is just initial commit, more details will be added soon.**

Usage
-----

```
human2machine input_file.txt [output_file.json]
```

<a href="http://www.meteorkitchen.com" target="_blank">Meteor Kitchen</a> automatically executes human2machine, converts .txt file to .json and builds application:

```
meteor-kitchen input_file.txt ./output_dir
```
(you need latest version of meteor kitchen)


Example input files
-------------------


### Example 1 - CRUD

```
I want site with three pages: home, customers and about.
In home page I want jumbotron with title: "This application is written in human language!", text: "Human to describe app, machine to write code!", button url: "customers".
Please create one collection: customers.
In customers collection I want three fields: name, address and e-mail.
In customers page I want CRUD for customers collection.
In about page I want text: "This application is written in human language using Meteor Kitchen, code generator for Meteor".
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


Syntax
------

1. It's important to **finish each sentence with dot**. Newlines are not important and are ignored by parser.
2. To define a list you can say `4 pages` or `four pages`. After type name you can list element names after colon and separate items with comma: `three fields: name, address and e-mail`. If element names are not listed, they will be automatically named as type + item_index ("field0", "field1", "field2"). Exception is page names: "page0" will be named "home" and other pages: "page1", "page2"...
3. To add component or text into page, say `in page_name page` (word between `in` and `page` is interpreted as page name). If you make a typo and page name is unknown - complete sentence is ignored.
4. To define collection fields say `in collection_name collection` (word between `in` and `collection` is interpreted as collection name). If you make a typo and collection name is unknown - complete sentence is ignored.
5. In examples above, most of words are added to make text readable to human and are ignored by parser:

**Example 1** with important words only:

```
Three pages: home, customers and about.
In home page jumbotron title: "This application is written in human language!",  text: "Human to describe app, machine to write code!", button url: "customers".
One collection: customers.
In customers collection three fields: name, address and e-mail.
In customers page CRUD for customers collection.
In about page text: "This application is written in human language using Meteor Kitchen, code generator for Meteor".
```

**Example 2** with important words only:

```
One page.
One collection: sensors.
In sensors collection fields: topic and message.
Connect sensors collection mosquitto server: "test.mosquitto.org", topic: revspace/sensors/#.
In home page table showing sensors collection.
```

(to be continued)
