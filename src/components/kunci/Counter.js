import { useState } from 'react';

export const Counter = () => {
  const [count, setCount] = useState(0);
  const [amount, setAmount] = useState(0);

  const handleAmountChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setAmount(isNaN(value) ? '' : value);
  };

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
      <input
        type="number"
        name="amount"
        value={amount}
        onChange={handleAmountChange}
      />
      <button onClick={() => setCount(amount)}>Set</button>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
};
