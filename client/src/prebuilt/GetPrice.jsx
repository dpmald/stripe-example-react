const getPrice = numDonation =>
  (Math.round(numDonation * 1 * 100) / 100).toFixed(2);

export default getPrice;
