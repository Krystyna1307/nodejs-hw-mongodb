const parseType = (type) => {
  const isString = typeof type === 'string';
  if (!isString) return;

  const isType = (type) => ['work', 'home', 'personal'].includes(type);
  if (isType(type)) return type;
};

export const parseContactFilterParams = (query) => {
  const { type } = query;
  const parsedType = parseType(type);

  return {
    type: parsedType,
  };
};
