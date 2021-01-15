import calculatePizzaPrice from './calculatePizzaPrice';

export default function calculateOrderTotal(order, pizzas) {
  // Loop over each item in the order
  const total = order.reduce((runningTotal, singleOrder) => {
    const pizza = pizzas.find((foundPizza) => foundPizza.id === singleOrder.id);
    // Calculate the total for that pizza
    // Add that total to the running total
    return runningTotal + calculatePizzaPrice(pizza.price, singleOrder.size);
  }, 0);
  return total;
}
