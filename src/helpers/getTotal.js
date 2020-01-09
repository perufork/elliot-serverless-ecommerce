const getTotal = cart => cart.reduce((a, b) => a + b.price * b.quantity, 0);

export default getTotal;
