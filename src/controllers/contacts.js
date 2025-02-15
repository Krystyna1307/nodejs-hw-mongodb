import createHttpError from 'http-errors';

import * as contactServices from '../services/contacts.js';

import { saveFileToUploadsDir } from '../utils/saveFileToUploadsDir.js';
import { saveFileToCloudihary } from '../utils/saveFileToCloudinary.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseContactFilterParams } from '../utils/filters/parseContactFilterParams.js';
import { getEnvVar } from '../utils/getEnvVar.js';

import { sortByList } from '../db/models/Contact.js';

export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query, sortByList);
  const filter = parseContactFilterParams(req.query);
  filter.userId = req.user._id; //Додаємо поле userId

  const data = await contactServices.getContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data,
  });
};

export const getContactByIdController = async (req, res) => {
  const { _id: userId } = req.user;
  const { contactId: _id } = req.params;

  const data = await contactServices.getContact({ _id, userId });

  if (!data) {
    throw createHttpError(404, `Contact not found`); // 2 помилка вилітає з контроллера, її ловить ctrlWrapper 3
  }

  res.json({
    status: 200,
    message: `Successfully found contact!`,
    data,
  });
};

export const addContactController = async (req, res) => {
  const cloudinaryEnable = getEnvVar('CLOUDINARY_ENABLE') === 'true';
  let photo;
  if (req.file) {
    if (cloudinaryEnable) {
      photo = await saveFileToCloudihary(req.file);
    } else {
      photo = await saveFileToUploadsDir(req.file);
    }
  }
  const { _id: userId } = req.user;
  const data = await contactServices.addContact({ ...req.body, photo, userId }); // Додаємо дані про користувача
  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data,
  });
};

export const upsertContactController = async (req, res) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;
  const { isNew, data } = await contactServices.updateContact(
    contactId,
    { ...req.body, userId },
    { upsert: true },
  );

  const status = isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: 'Successfully upsert contact',
    data,
  });
};

export const patchContactController = async (req, res) => {
  const { contactId: _id } = req.params;
  const { _id: userId } = req.user;
  const result = await contactServices.updateContact({ _id, userId }, req.body);

  if (!result) {
    throw createHttpError(404, `Contact not found`);
  }

  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result.data,
  });
};

export const deleteContactController = async (req, res) => {
  const { contactId: _id } = req.params;
  const { _id: userId } = req.user;
  const data = await contactServices.deleteContact({ _id, userId });

  if (!data) {
    throw createHttpError(404, `Contact not found`);
  }

  res.status(204).send();
};
