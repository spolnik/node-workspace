#!/usr/bin/env node

var Command = require('./command');

Command.executeCurrentOperation(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('OK! The command ran successfully!');
    }
});
