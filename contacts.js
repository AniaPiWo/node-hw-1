const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "db/contacts.json");

//all contacts
function listContacts() {
  return fs
    .readFile(contactsPath, "utf-8")
    .then((data) => {
      return JSON.parse(data);
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
}

//contact by id
function getContactById(contactId) {
  return fs.readFile(contactsPath, "utf-8").then((data) => {
    const contacts = JSON.parse(data);
    const contact = contacts.find(({ id }) => id === contactId);
    if (!contact) {
      throw new Error(`Contact with id=${contactId} not found`);
    }
    return contact;
  });
}

function addContact(name, email, phone) {
  const newContact = { id: uuidv4(), name, email, phone };
  return fs.readFile(contactsPath, "utf-8").then((data) => {
    const contacts = JSON.parse(data);
    contacts.push(newContact);
    return fs.writeFile(contactsPath, JSON.stringify(contacts));
  });
}

//remove contact
function removeContact(contactId) {
  return fs.readFile(contactsPath, "utf-8").then((data) => {
    const contacts = JSON.parse(data);
    const index = contacts.findIndex(({ id }) => id === contactId);
    if (index === -1) {
      throw new Error(`Contact with id=${contactId} not found`);
    }
    const newContacts = contacts.filter(({ id }) => id !== contactId);
    return fs.writeFile(contactsPath, JSON.stringify(newContacts));
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
