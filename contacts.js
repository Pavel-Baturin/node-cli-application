const { v4 } = require("uuid");
const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find((contact) => Number(contact.id) === contactId);
  if (!contact) {
    return null;
  }
  return contact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const idx = contacts.findIndex((contact) => Number(contact.id) === contactId);
  if (idx === -1) {
    return null;
  }
  const [deleteContact] = contacts.splice(idx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return deleteContact;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const id = v4();
  const newListContacts = [...contacts, { id, name, email, phone }];
  await fs.writeFile(contactsPath, JSON.stringify(newListContacts));
  return { id, name, email, phone };
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
