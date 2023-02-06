module.exports = {
  reverse: function (collection) {
    const arr = [...collection];
    return arr.reverse();
  },
  max: function (collection, prop) {
    const arr = [...collection].sort((a, b) => (a[prop] > b[prop] ? 1 : -1));
    return arr.reverse()[0];
  },
};
