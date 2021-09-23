import React from "react";
import StarRating from "react-star-ratings";

const Star = ({ handleClick, numberOfStars }) => {
  const onChangeRating = () => {
    handleClick(numberOfStars);
  };

  return (
    <>
      <StarRating
        changeRating={onChangeRating}
        numberOfStars={numberOfStars}
        starDimension="20px"
        starSpacing="2px"
        starHoverColor="red"
        starEmptyColor="red"
      />
      <br />
    </>
  );
};

export default Star;
