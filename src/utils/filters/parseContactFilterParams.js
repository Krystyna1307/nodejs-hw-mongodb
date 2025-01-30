const parseType = (type) => {
  if (typeof type === 'string' && ['work', 'home', 'personal'].includes(type)) {
    return type;
  }
  return undefined;

  // const isString = typeof type === 'string';
  // if (!isString) return;

  // const isType = (type) => ['work', 'home', 'personal'].includes(type);
  // if (isType(type)) return type;
};

export const parseContactFilterParams = (query) => {
  const { contactType, isFavourite } = query;

  return {
    type: parseType(contactType),
    isFavourite: isFavourite === 'true', // перетворюємо строку у boolean
  };

  // const parsedType = parseType(type);

  // return {
  //   type: parsedType,
  // };
};
