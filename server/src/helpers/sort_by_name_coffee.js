const sortByName = arr => {
  const result = arr.sort(function (a, b) {
    const nameA = a.size.toLowerCase(); // ignore upper and lowercase
    const nameB = b.size.toLowerCase(); // ignore upper and lowercase

    // sort in an ascending order
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    // names must be equal
    return 0;
  });
  return result;
};

module.exports = { sortByName };
