import { Card, Skeleton } from "antd";
import React from "react";

const LoadingCard = ({ count }) => {
  const cards = () => {
    const totalCards = [];

    for (let i = 0; i < count; i++) {
      totalCards.push(
        <div className="col-md-4 p-3">
          <Card>
            <Skeleton active />
          </Card>
        </div>
      );
    }
    return totalCards;
  };

  return <div className="row pb-5">{cards()}</div>;
};

export default LoadingCard;
