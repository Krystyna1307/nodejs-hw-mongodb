import { Schema, model } from 'mongoose';

import { typeList } from '../../constants/contacts.js';

const contactSchema = new Schema(
  {
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String },
    isFavourite: { type: Boolean, default: false },
    contactType: {
      type: String,
      enum: typeList,
      default: 'personal',
      required: true,
    },
  },
  { timestamps: true }, // Додає createdAt(дату додавання) та updatedAt(дату останнього оновлення)
);

const ContactCollection = model('contact', contactSchema);

export default ContactCollection;
