'use strict';

import * as fs from 'fs';
import * as path from 'path';

const contactsPath = path.resolve('./db/contacts.json');
let allContacts = [];

function getAllContacts() {
  let data = fs.readFileSync(contactsPath);
  allContacts = JSON.parse(data);
}

export function listContacts() {
  getAllContacts();
  console.table(allContacts);
}

export function getContactById(contactId) {
  getAllContacts();

  let result = allContacts.find(contact => contact.id === contactId);
  if (!result) {
    console.log('--------- [Warning] ---------');
    console.log('contact with id =', contactId, 'does not exist');
    console.log('--------- [Warning] ---------');
    return;
  }

  console.log('--------- [Contact info] ---------');
  console.log('name:', result.name);
  console.log('email:', result.email);
  console.log('phone:', result.phone);
  console.log('--------- [Contact info] ---------');
}

export function removeContact(contactId) {
  getAllContacts();
  allContacts = allContacts.filter(contact => contact.id !== contactId);
  let data = JSON.stringify(allContacts);

  fs.writeFile(contactsPath, data, err => {
    if (err) throw err;
    console.log('--------- [Notification] ---------');
    console.log('contact with id =', contactId, 'completely removed');
    console.log('--------- [Notification] ---------');
  });
}

export function addContact(name, email, phone) {
  getAllContacts();
  const maxId = allContacts[allContacts.length - 1].id;
  let newContactObj = {};
  newContactObj.id = maxId + 1;
  newContactObj.name = name;
  newContactObj.email = email;
  newContactObj.phone = phone;
  allContacts.push(newContactObj);
  let data = JSON.stringify(allContacts);
  fs.writeFile(contactsPath, data, err => {
    if (err) throw err;
    console.log('--------- [Notification] ---------');
    console.log('new contact added successfully');
    console.log('--------- [Notification] ---------');
  });
}
