import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Grid from "./Components/Grid/Grid";
import { patterns } from "./assets/Patterns";

// Function to generate a random color
const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

function App() {
  const [grid, setGrid] = useState([]);
  const rows = 15;
  const cols = 20;
  const [input, setInput] = useState("");
  const [text, setText] = useState("");
  const [color, setColor] = useState(getRandomColor());

  const ChangeInput = (e) => {
    setInput(e.target.value); // Ensure uppercase input for matching patterns
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setText(input);
    setInput("");
  };

  useEffect(() => {
    const initialGrid = Array(rows)
      .fill(null)
      .map(() => Array(cols).fill(0));

    const textPattern = text.split("").map((char) => patterns[char] || []); // Fallback to an empty array if pattern doesn't exist

    let currentGrid = initialGrid;
    let offset = cols;

    const updateGrid = () => {
      currentGrid = Array(rows)
        .fill(null)
        .map(() => Array(cols).fill(0));

      let currentCol = offset;

      for (let i = 0; i < textPattern.length; i++) {
        const pattern = textPattern[i];
        const patternCols = pattern[0]?.length || 0;

        if (currentCol + patternCols >= 0 && currentCol < cols) {
          for (let row = 0; row < pattern.length; row++) {
            for (let col = 0; col < pattern[row].length; col++) {
              if (
                pattern[row][col] === 1 &&
                currentCol + col >= 0 &&
                currentCol + col < cols
              ) {
                currentGrid[row][currentCol + col] = 1;
              }
            }
          }
        }
        currentCol += patternCols + 1;
      }

      setGrid(currentGrid);

      offset--;

      if (offset < -text.length * 10) {
        offset = cols;
      }
    };

    const interval = setInterval(() => {
      updateGrid();
    }, 150);

    const intervalColor = setInterval(() => {
      setColor(getRandomColor());
    }, 2000);

    return () => {
      clearInterval(interval);
      clearInterval(intervalColor);
    };
  }, [text, cols, rows]);
  return (
    <>
      <div className="App">
        <Navbar />
        <div className="container row mx-auto">
          
          <div className=" col-12 col-lg-6 content py-5 ">
            <div className="headline text-white text-center text-lg-start">
              <h1>Where pixels dance and<br /> colors come alive!</h1>
              <p>
                PixelPulse transforms text into a captivating visual experience.
                Watch as characters flow seamlessly across a dynamic grid, with
                each letter rendered as a pixelated pattern. With every passing
                moment, colors shift randomly, ever-changing
                spectacle to your screen.{" "}
              </p>
              <p>
                Type a message below and see the grid of pixels change
                accordingly:
              </p>
            </div>
            <form onSubmit={handleSubmit} className="d-flex align-items-center justify-content-center justify-content-lg-start">
              <input
                type="text"
                name="input"
                className=" col-7 bg-black text-white border-0 px-3 py-2 rounded-2 outline-none "
                placeholder="Enter text here..."
                value={input}
                onChange={ChangeInput}
                required
                id=""
              />
              <button className="col-5 button-play">
                <span>PLAY NOW</span>
              </button>
            </form>
          </div>
          <div className="grid col-12 col-lg-6 py-lg-5 pb-5 ">
            <Grid grid={grid} color={color} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
