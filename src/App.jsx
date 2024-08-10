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
  const [text, setText] = useState("Hello");
  const [color, setColor] = useState(getRandomColor());

  const ChangeInput = (e) => {
    setInput(e.target.value); // Ensure uppercase input for matching patterns
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setText(input.replace(/[^a-zA-Z ]/g, ''));
    setInput("");
  };

  useEffect(() => {
    // Initialize the grid with the specified number of rows and columns, filled with 0s
    const initialGrid = Array(rows)
      .fill(null)
      .map(() => Array(cols).fill(0));


    // Convert the input text into a series of patterns, falling back to an empty array if a character has no pattern defined
    const textPattern = text.split("").map((char) => patterns[char] || []);

    let currentGrid = initialGrid; // The grid that will be updated as the text moves across the screen
    let offset = cols; // Offset to determine where the text starts from the right side of the grid

    const updateGrid = () => {

      // Reset the grid before each update
      currentGrid = Array(rows)
        .fill(null)
        .map(() => Array(cols).fill(0));



      let currentCol = offset; // Starting column position for the current update


      // Loop through each character's pattern
      for (let i = 0; i < textPattern.length; i++) {
        const pattern = textPattern[i];
        const patternCols = pattern[0]?.length || 0;  // Get the number of columns in the current pattern

        // Only draw the pattern if it's within the visible grid
        if (currentCol + patternCols >= 0 && currentCol < cols) {

          // Loop through the rows and columns of the pattern to update the grid
          for (let row = 0; row < pattern.length; row++) {
            for (let col = 0; col < pattern[row].length; col++) {
              if (
                pattern[row][col] === 1 &&  // Only draw where the pattern has a 1
                currentCol + col >= 0 &&  // Ensure we're within the grid's column range
                currentCol + col < cols
              ) {
                currentGrid[row][currentCol + col] = 1;  // Update the grid with the pattern
              }
            }
          }
        }
        currentCol += patternCols + 1;  // Move to the next position for the following character
      }

      setGrid(currentGrid);  // Update the state with the new grid

      offset--;  // Move the text to the left by decreasing the offset


      // Reset the offset to start from the right again when the text has fully moved off the left side of the grid
      if (offset < -text.length * 10) {
        offset = cols;
      }
    };


    // Interval to update the grid every 150 milliseconds
    const interval = setInterval(() => {
      updateGrid();
    }, 150);


    // Interval to change the color randomly every 2 seconds
    const intervalColor = setInterval(() => {
      setColor(getRandomColor());
    }, 2000);

    return () => {
      clearInterval(interval);
      clearInterval(intervalColor);
    };
  }, [text, cols, rows]);  // Dependency array to re-run the effect when text, cols, or rows change
  return (
    <>
      {/* Main application wrapper */}
      <div className="App">

        <Navbar />

        {/* Container for the main content */}
        <div className="container row mx-auto">

          {/* Left side content section with headline and description */}
          <div className=" col-12 col-lg-6 content py-5 ">
            <div className="headline text-white text-center text-lg-start">
              <h1>
                Where pixels dance and
                <br /> colors come alive!
              </h1>
              <p>
                PixelPulse transforms text into a captivating visual experience.
                Watch as characters flow seamlessly across a dynamic grid, with
                each letter rendered as a pixelated pattern. With every passing
                moment, colors shift randomly, ever-changing spectacle to your
                screen.{" "}
              </p>
              <p>
              Type a letter below and watch it light up on the pixel grid!
              </p>
            </div>

            {/* Form for user input with a play button */}
            <form
              onSubmit={handleSubmit}
              className="d-flex align-items-center justify-content-center justify-content-lg-start"
            >
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

          {/* Right side section for displaying the pixel grid */}
          <div className="grid col-12 col-lg-6 py-lg-5 pb-5 ">
            <Grid grid={grid} color={color} />
          </div>
        </div>

        
        <footer className="text-center text-white font-monospace ">
          <p>
            {" "}
            © 2024{" "}
            <a
              target="blank"
              href="https://port-folio-aniket-ikhar.vercel.app/"
            >
              Aniket Ikhar
            </a>
            . All rights reserved.
          </p>
        </footer>
      </div>
    </>
  );
}

export default App;
