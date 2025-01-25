import ContactCollection from '../db/models/Contact.js';

export const getContacts = () => ContactCollection.find(); //якщо сервіс викидає помилку, вона вилітає з controllers далі 2

export const getContactById = (id) => ContactCollection.findById(id);

export const addContact = (payload) => ContactCollection.create(payload);

export const updateContact = async (_id, payload, options = {}) => {
  const { upsert = false } = options;
  const result = await ContactCollection.findOneAndUpdate({ _id }, payload, {
    new: true,
    upsert, //додає оновлений обект (для PATCH не треба!)
    includeResultMetadata: true,
  });

  if (!result || !result.value) return null;

  const isNew = Boolean(result.lastErrorObject.upserted);

  return {
    isNew,
    data: result.value,
  };
};

export const deleteContact = (filter) =>
  ContactCollection.findOneAndDelete(filter);
