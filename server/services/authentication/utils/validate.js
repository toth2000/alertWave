const validateKeys = (keys, data) => {
  if (!data || data === undefined) return false;

  const result = keys.every((item) =>
    data[item] !== undefined ? true : false
  );
  return result;
};

module.exports = { validateKeys };
