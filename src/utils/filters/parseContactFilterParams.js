const parseType = (type) => {
  if (typeof type === 'string' && ['work', 'home', 'personal'].includes(type)) {
    return type;
  }
  return undefined;
};

const parseBoolean = (value) => {
  if (typeof value === 'string') {
    if (value.toLowerCase() === 'true') return true;
    if (value.toLowerCase() === 'false') return false;
  }
  return undefined;
};

export const parseContactFilterParams = (query) => {
  const { contactType, isFavourite } = query;

  return {
    type: parseType(contactType),
    isFavourite: parseBoolean(isFavourite), // перетворюємо строку у boolean
  };
};
