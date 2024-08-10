import { useState } from "react";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";

function App() {
  return (
    <>
      <div className="App">
        <Navbar />
        <div className="container d-flex flex-column-reverse flex-md-row">
          <div className="grid">grid</div>
          <div className="content">
            <div className="headline text-white">
              <h1>Where pixels dance and colors come alive!</h1>
              <p>
                PixelPulse transforms text into a captivating visual experience.
                Watch as characters flow seamlessly across a dynamic grid, with
                each letter rendered as a pixelated pattern. With every passing
                moment, colors shift randomly, bringing a vibrant, ever-changing
                spectacle to your screen.{" "}
              </p>
              <p>
                Type a message below and see the grid of pixels change
                accordingly:
              </p>
            </div>
            <form >
            <input
              type="text"
              name="input"
              className=" bg-black text-white border-0 px-3 py-2 rounded-2 outline-none w-50 "
              
              placeholder="Enter text here..."
              required
              id=""
            />
            <button className="button-play">
              <span>PLAY NOW</span>
            </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
