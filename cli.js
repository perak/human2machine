#! /usr/bin/env node

var util = require('util');
var fs = require('fs');
var path = require('path');
var args = process.argv.slice(2);
var h2m = require("./human2machine.js");

if(args.length < 1) {
  console.log("Invalid arguments.");
  console.log("Please provide at least input file (output file is optional).");
  process.exit(1);
}

fs.readFile(args[0], {encoding: 'utf-8'}, function(err, data) {
    if(!err) {
      var output = h2m.human2machine(data);

      if(args.length < 2) {
        console.log(JSON.stringify(output, null, "\t"));
      } else {
        fs.writeFile(args[1], JSON.stringify(output, null, "\t"), function(err) {
            if(err) {
              console.log(err);
              process.exit(1);
            }
            console.log("OK");
        });
      }
    } else {
      console.log(err);
      process.exit(1);
    }
});
