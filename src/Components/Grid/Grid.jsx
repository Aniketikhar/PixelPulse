import React from 'react'
import './Grid.css';

const Grid = ({ grid , color }) => {
  return (
    <div className="grid-container mx-auto">
    {/* Iterate through each row of the grid */}
      {grid.map((row, i) =>
      // Iterate through each cell in the row
        row.map((cell, j) => (
          <div
            key={`${i}-${j}`}  // Unique key for each grid item based on its row and column index
            className="grid-item"
            // Set background color: if cell value is 1, use the passed color, otherwise default to black
            style={{ backgroundColor: cell === 1 ? color : 'black' }}
          ></div>
        ))
      )}
    </div>
  )
}

export default Grid
