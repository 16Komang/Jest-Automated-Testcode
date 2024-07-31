import { useState } from "react";

export const Count = () => {
  const [count, setCount] = useState(0);
  const handleDecrement = () => { setCount(count + 1);};
  const handleIncrement = () => { setCount(count - 1);};

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={handleIncrement}>-1</button>
      <button onClick={handleDecrement}>+1</button>
    </div>
  );
};
