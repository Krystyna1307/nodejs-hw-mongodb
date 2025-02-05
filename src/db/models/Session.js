import { Schema, model } from 'mongoose';
import { handleSaveError, setUpdateSettings } from './hooks.js';

const sessionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    accessToken: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    accessTokenValidUntil: {
      type: Date,
      required: true,
    },
    refreshTokenValidUntil: {
      type: Date,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

sessionSchema.post('save', handleSaveError); // присвоюємо статус, якщо валідація не пройшла
sessionSchema.pre('findOneAndUpdate', setUpdateSettings); // перед оновленням включаємо валідація
sessionSchema.post('findOneAndUpdate', handleSaveError); // присвоюємо правильний статус

const SessionCollection = model('session', sessionSchema);

export default SessionCollection;
