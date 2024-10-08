import React from "react";

function RatingReview({ rating, setRating }: any) {
  return (
    <div>
      {[1, 2, 3, 4, 5].map((star, index) => {
        return (
          <span
            className="start"
            key={index}
            style={{
              cursor: "pointer",
              color: rating >= star ? "gold" : "gray",
              fontSize: `35px`,
            }}
            onClick={() => {
              setRating(star);
            }}
          >
            {" "}
            ★{" "}
          </span>
        );
      })}
    </div>
  );
}

export default RatingReview;
