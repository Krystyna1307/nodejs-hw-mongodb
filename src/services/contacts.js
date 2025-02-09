import ContactCollection from '../db/models/Contact.js';
import { calcPaginationData } from '../utils/calcPaginationData.js';

export const getContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = 'asc',
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * limit; // рахуємо скільки сторінок треба пропустити

  const contactsQuery = ContactCollection.find();

  if (filter.type) {
    contactsQuery.where('contactType').equals(filter.type);
  }
  if (filter.isFavourite !== undefined) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }
  if (filter.userId) {
    contactsQuery.where('userId').equals(filter.userId); // Якщо передали userId, то шукаємо тільки його контакти
  }

  const totalItems = await ContactCollection.find()
    .merge(contactsQuery)
    .countDocuments(); //загальна кількість (одразу число)

  const contacts = await contactsQuery
    .find()
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder }); //якщо сервіс викидає помилку, вона вилітає з controllers далі 2

  const paginationData = calcPaginationData({ totalItems, page, perPage });

  return {
    data: contacts,
    page,
    perPage,
    totalItems,
    ...paginationData,
  };
};

export const getContactById = (id) => ContactCollection.findById(id);

export const getContact = (filter) => ContactCollection.findOne(filter);

export const addContact = (payload) => ContactCollection.create(payload);

export const updateContact = async (filter, payload, options = {}) => {
  const { upsert = false } = options;

  const result = await ContactCollection.findOneAndUpdate(filter, payload, {
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
