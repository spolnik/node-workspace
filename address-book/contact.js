var Contact = {}

Contact.parseName = function (input) {
    return input.split(',')[0].trim();
};

Contact.parseNumber = function (input) {
    return input.split(',')[1].trim();
};

Contact.createContact = function (input) {
    return {
        name: this.parseName(input),
        number: this.parseNumber(input)
    };
};

Contact.loadContacts = function (done) {
    var Util = require('./util'),
        jf = require('jsonfile'),
        jsonPath = Util.getDataPath();

    jf.readFile(jsonPath, done);
};

Contact.saveContacts = function (contacts, done) {
    var Util = require('./util'),
        jf = require('jsonfile'),
        jsonPath = Util.getDataPath();

    jf.writeFile(jsonPath, contacts, done);
};

Contact.saveContact = function (contact, done) {
    var that = this;

    this.loadContacts(function (err, contacts) {
        if (err) { return done(err); }
        contacts.push(contact);
        that.saveContacts(contacts, done);
    });
};

Contact.findContacts = function (name, done) {

    this.loadContacts(function (err, contacts) {
        if (err) {
            return done(err);
        }

        var byName = function (contact) {
            return contact.name === name;
        };

        var result = contacts.filter(byName);
        done(null, result);
    });
};

module.exports = Contact;
