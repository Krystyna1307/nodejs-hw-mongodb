import { Router } from 'express';

import { isValidId } from '../middlewares/isValidId.js';
import * as contactsController from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../utils/validateBody.js';
import {
  contactAddSchema,
  contactUpdateSchema,
} from '../validation/contacts.js';

const contactsRouter = Router();

contactsRouter.get('/', ctrlWrapper(contactsController.getContactsController));
contactsRouter.get(
  '/:contactId',
  isValidId,
  ctrlWrapper(contactsController.getContactsByIdController),
);
contactsRouter.post(
  '/',
  validateBody(contactAddSchema),
  ctrlWrapper(contactsController.addContactController),
);
contactsRouter.put(
  '/:contactId',
  isValidId,
  validateBody(contactAddSchema),
  ctrlWrapper(contactsController.upsertContactController),
);
contactsRouter.patch(
  '/:contactId',
  isValidId,
  validateBody(contactUpdateSchema),
  ctrlWrapper(contactsController.patchContactController),
);
contactsRouter.delete(
  '/:contactId',
  isValidId,
  ctrlWrapper(contactsController.deleteContactController),
);

export default contactsRouter;
