import { useEffect, useState } from "react";

export default function App() {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  function handleResize() {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }
  useEffect(function () {
    window.addEventListener("resize", handleResize);
    console.log("Event Added");
    return function () {
      window.removeEventListener("resize", handleResize);
      console.log("Event Removed");
    };
  }, []);
  // useEffect(
  //   function () {
  //     document.title = `Size ${width} x ${height}`;
  //   },
  //   [width, height]
  // );
  return (
    <div className="App">
      <p>Window Width: {width}px</p>
      <p>Window Height: {height}px</p>
    </div>
  );
}
