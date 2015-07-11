var Command = {};

Command.getOperation = function () {
    return process.argv[2];
};

Command.getOperationData = function () {
    return process.argv[3];
};

Command.add = function(done) {
    if (this.getOperation() !== 'add') {
        return;
    }

    var Contact = require('./contact'),
        data = this.getOperationData();

    var contact = Contact.createContact(data);
    Contact.saveContact(contact, done);
};

Command.find = function (done) {
    if (this.getOperation() !== 'find') {
        return;
    }

    var Contact = require('./contact'),
        data = this.getOperationData();

    Contact.findContacts(data, function (err, data) {
        if (err) {
            return done(err);
        }

        data.forEach(function (contact) {
            console.log(contact.name, contact.number);
        });

        done(null, data);
    });
};

Command.executeCurrentOperation = function (done) {
    var operation = this.getOperation();
    var command = Command[operation] || function (done) {
        done('Invalid command!')
    };
    command.bind(this)(done);
};

module.exports = Command;
