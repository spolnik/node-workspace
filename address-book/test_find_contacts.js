var Contact = require('./contact');

Contact.findContacts('John Smith', function(err, data) {
    console.log(data);
});
