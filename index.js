'use strict';
import {
  listContacts,
  addContact,
  removeContact,
  getContactById,
} from './contacts.js';

import Yargs from 'yargs';
const args = Yargs(process.argv.slice(2)).argv;

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      listContacts();
      break;

    case 'get':
      getContactById(id);
      break;

    case 'add':
      addContact(name, email, phone);
      break;

    case 'remove':
      removeContact(id);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(args);
