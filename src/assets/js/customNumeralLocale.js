
export default {
  delimiters: {
    thousands: ',',
    decimal: '.',
  },
  abbreviations: {
    thousand: 'k',
    million: 'million',
    billion: 'billion',
    trillion: 'trillion',
  },
  ordinal: function(e) {
    var r = e % 10;
    return ~~(e % 100 / 10) === 1 ? 'th' : r === 1 ? 'st' : r === 2 ? 'nd' : r === 3 ? 'rd' : 'th';
  },
  currency: {
    symbol: '$',
  },
};
