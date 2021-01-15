import { useState, useContext } from 'react';
import OrderContext from '../components/OrderContext';

export default function usePizza({ pizzas, input }) {
  // 1. Create some state to hold our order
  // We got rid of this line cos we moved useState up to the provider
  // const [order, setOrder] = useState([]);
  // Now we access both our state and our updated function (setOrder) via context
  const [order, setOrder] = useContext(OrderContext);
  // 2. Make a function add things to order
  function addToOrder(orderedPizza) {
    setOrder([...order, orderedPizza]);
  }
  // 3. Make a function remove things from order
  function removeFromOrder(index) {
    setOrder([
      // Everything before the item we want to remove
      ...order.slice(0, index),
      // Everything after the item we want to remove
      ...order.slice(index + 1),
    ]);
  }
  // TODO 4. Send this data to a serverless function when they checkout

  return {
    order,
    addToOrder,
    removeFromOrder,
  };
}
