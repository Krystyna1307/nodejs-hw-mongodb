import { readFileSync } from 'node:fs'; // Читає файл в старому режимі
import swaggerUiExpress from 'swagger-ui-express'; // щоб створити сторінку
import createHttpError from 'http-errors';

import { SWAGGER_PATH } from '../constants/index.js';

export const swaggerDocs = () => {
  try {
    const docs = JSON.parse(readFileSync(SWAGGER_PATH, 'utf-8'));
    return [...swaggerUiExpress.serve, swaggerUiExpress.setup(docs)]; // Повертає HTML сторінку
  } catch {
    return (req, res, next) => {
      next(createHttpError(500, 'Cannot load docs'));
    };
  }
};
