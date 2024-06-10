import React, { useState } from "react"; // imported from react library
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"; //imported from react-circular-progressbar for customizable circular progress bar.

import "react-circular-progressbar/dist/styles.css"; // from npmjs.com
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const RatingComponent = () => {
  const [rating, setRating] = useState(0);

  const forInputChange = (e) => {
    const value = e.target.value;
    if (value >= 1 && value <= 5) {
      setRating(Number(value));
    }
  };

  const forKeyDown = (e) => {
    if (e.key === "Enter") {
      const value = e.target.value;
      if (value >= 1 && value <= 5) {
        setRating(Number(value));
      }
    }
  };

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
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
        <CircularProgressbar
          value={rating}
          maxValue={5}
          text={`${rating.toFixed(1)}/5`}
          styles={buildStyles({   // for rotation bar-need to study
            pathColor: "green",
            textColor: "black",
            trailColor: "light-grey",
            textSize: "24px",
          })}
        />
      </div>
      <div className="stars-container">{renderStars()}</div>
      <input
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
