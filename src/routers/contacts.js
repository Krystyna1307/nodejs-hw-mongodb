import { Router } from 'express';
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
  ctrlWrapper(contactsController.getContactsByIdController),
);
contactsRouter.post(
  '/',
  validateBody(contactAddSchema),
  ctrlWrapper(contactsController.addContactController),
);
contactsRouter.put(
  '/:contactId',
  validateBody(contactAddSchema),
  ctrlWrapper(contactsController.upsertContactController),
);
contactsRouter.patch(
  '/:contactId',
  validateBody(contactUpdateSchema),
  ctrlWrapper(contactsController.patchContactController),
);
contactsRouter.delete(
  '/:contactId',
  ctrlWrapper(contactsController.deleteContactController),
);

export default contactsRouter;
