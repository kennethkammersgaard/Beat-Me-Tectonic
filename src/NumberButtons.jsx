import React from 'react';
import PropTypes from 'prop-types';

function NumberButtons({ selectedNumber, onClick, isNumberAvailable }) {
  return (
    <div style={{ marginTop: '20px' }}>
      {[1, 2, 3, 4, 5].map((number) => (
        <button
          key={number}
          onClick={() => onClick(number)}
          disabled={!isNumberAvailable(number)}
          style={{
            fontSize: '20px',
            padding: '10px 15px',
            margin: '0 5px',
            cursor: isNumberAvailable(number) ? 'pointer' : 'not-allowed',
            opacity: isNumberAvailable(number) ? 1 : 0.5,
            backgroundColor: selectedNumber === number ? 'yellow' : 'white',
          }}
        >
          {number}
        </button>
      ))}
    </div>
  );
}

NumberButtons.propTypes = {
  selectedNumber: PropTypes.number,
  onClick: PropTypes.func.isRequired,
  isNumberAvailable: PropTypes.func.isRequired
};

export default NumberButtons;