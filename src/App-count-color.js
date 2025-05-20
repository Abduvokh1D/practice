import { useEffect, useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);
  const [color, setColor] = useState("green");
  useEffect(
    function () {
      // document.title = `Count ${count} ${color}`;
    },
    [count, color]
  );
  function handleAdd() {
    setCount((count) => count + 1);
  }
  function handleRemove() {
    setCount((count) => count - 1);
  }
  function changeColor() {
    setColor((color) => (color === "green" ? "red" : "green"));
  }
  return (
    <div className="App">
      <p style={{ color: color }}>Count: {count}</p>
      <button onClick={handleAdd}>Add</button>
      <button onClick={handleRemove}>Remove</button>
      <button onClick={changeColor}>Change Color</button>
    </div>
  );
}
