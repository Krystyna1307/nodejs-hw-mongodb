import { Schema, model } from 'mongoose';
// import { handleSaveError, setUpdateSettings } from './hooks.js';
import { emailRegexp } from '../../constants/users.js';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: emailRegexp, // регулярний вираз
      unique: true, // унікальна
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

userSchema.methods.toJSON = function () {
  const obj = this.toObject(); // щоб пароль не повертався
  delete obj.password;
  return obj;
};

// userSchema.post('save', handleSaveError); // присвоюємо статус, якщо валідація не пройшла
// userSchema.pre('findOneAndUpdate', setUpdateSettings); // перед оновленням включаємо валідація
// userSchema.post('findOneAndUpdate', handleSaveError); // присвоюємо правильний статус

const UserCollection = model('user', userSchema);

export default UserCollection;
