const rndStr = (length = 12) => {
  return [...Array(length)]
    .map((i) => (~~(Math.random() * 36)).toString(36))
    .join("");
};

const rndInt = (max = 32, min = 8) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

module.exports = { rndStr, rndInt };
