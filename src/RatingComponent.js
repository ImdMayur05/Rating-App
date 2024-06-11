import React, { useState,useRef } from "react"; // imported from react library
import { CircularProgressbarWithChildren, buildStyles   } from "react-circular-progressbar"; //imported from react-circular-progressbar for customizable circular progress bar.

import "react-circular-progressbar/dist/styles.css"; // from npmjs.com
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";



const RatingComponent = () => {
  const [rating, setRating] = useState(0);
  const inputRef = useRef(null);

  const forInputChange = (e) => { //for manually input
    const value = e.target.value;
    if (value === '') {
      setRating(0); // Reset rating if input is cleared
    } else if (value >= 1 && value <= 5) {
      setRating(Number(value));
      
    }
  };

  const forKeyDown = (e) => { // for up-down keys 
    if (e.key === 'Enter') {
      const value = e.target.value;
      if (value === '') {
        setRating(0); // Reset rating if input is cleared
      } else if (value >= 1 && value <= 5) {
        setRating(Number(value));
        inputRef.current.value = ''; // Clear the input field
        setRating(0); // Reset rating to default immediately
      }
    }
  };

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating); // 
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={`full-${i}`} className="star filled">
          ★
        </span>
      );
    }
    if (halfStar) {
      stars.push(
        <span key="half" className="star half-filled">
          ★
        </span>
      );
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="star">
          ★
        </span>
      );
    }

    return stars;
  };

  return (
    <div className="rating-container">
      <h3><strong>Overall Rating</strong></h3>
      <div className="progress-bar-container">
        <CircularProgressbarWithChildren
          value={rating}
          maxValue={10}
          // text={`${rating.toFixed(1)}/5`}
          styles={buildStyles({   // for rotation bar-need to study
            rotation: 0.75,
            strokeLinecap: 'butt',
            pathTransitionDuration: 0.5,
            pathColor: "green",
            // textColor: "black",
            trailColor: "light-grey",
            // textSize: "25px",
          })}
        >
        <div style={{ fontSize: 24, marginTop: -40 }}>
            <strong>{rating.toFixed(1)}</strong> / 5
          </div>
        </CircularProgressbarWithChildren>
      </div>
      
      <div className="stars-container">{renderStars()}</div>
      <input
      ref={inputRef}
        type="number"
        min="1"
        max="5"
        step="0.5"
        onChange={forInputChange}
        onKeyDown={forKeyDown}
        className="rating-input"
        placeholder="Enter rating (1-5)"
      />
      
    </div>
  );
};

export default RatingComponent;
