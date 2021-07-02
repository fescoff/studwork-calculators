export const createRectangle = (countOfRows, countOfLines, fill = 0) => {
  try {
    return Array(countOfRows)
      .fill()
      .map(row => Array(countOfLines).fill(fill));
  } catch (err) {
    return null;
  }
};

export const createSquare = (countOfRows, fill = 0) => {
  return createRectangle(countOfRows, countOfRows, fill);
};
