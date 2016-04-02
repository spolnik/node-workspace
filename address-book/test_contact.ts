import {ContactFactory} from './contact';

var contact = new ContactFactory().createContact('John Smith', '604-123-9999');
console.log(contact);
