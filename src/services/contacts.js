import ContactCollection from '../db/models/Contact.js';

export const getContacts = () => ContactCollection.find(); //якщо сервіс викидає помилку, вона вилітає з controllers далі 2

export const getContactById = (id) => ContactCollection.findById(id);
