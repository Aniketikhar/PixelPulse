import React from 'react'
import './Grid.css';

const Grid = ({ grid , color }) => {
  return (
    <div className="grid-container">
      {grid.map((row, i) =>
        row.map((cell, j) => (
          <div
            key={`${i}-${j}`}
            className="grid-item"
            style={{ backgroundColor: cell === 1 ? color : 'black' }}
          ></div>
        ))
      )}
    </div>
  )
}

export default Grid
