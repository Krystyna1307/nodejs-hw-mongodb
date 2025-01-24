import { Router } from 'express';

import * as contactsController from '../controllers/contacts.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const contactsRouter = Router();

contactsRouter.get('/', ctrlWrapper(contactsController.getContactsController));

contactsRouter.get(
  '/:contactId',
  ctrlWrapper(contactsController.getContactsByIdController),
);

contactsRouter.post('/', ctrlWrapper(contactsController.addContactController));

contactsRouter.patch(
  '/:contactId',
  ctrlWrapper(contactsController.patchContactController),
);

export default contactsRouter;
