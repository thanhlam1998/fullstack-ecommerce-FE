import React from "react";
import Jumbotron from "./components/cards/Jumbotron";
import CategoryList from "./components/category/CategoryList";
import BestSellers from "./components/home/BestSellers";
import NewArrivals from "./components/home/NewArrivals";
import SubList from "./components/sub/SubList";

const Home = () => {
  return (
    <>
      {/* Jumbotron */}
      <div className="jumbotron text-center text-danger pt-5 pb-5 h1 font-weight-bold">
        <Jumbotron text={["Latest Products", "New Arrivals", "Best Sellers"]} />
      </div>

      <h1 className="text-center mt-5 mb-5 jumbotron bg-info text-light">
        NEW ARRIVALS
      </h1>
      <NewArrivals />

      <h1 className="text-center mt-5 mb-5 jumbotron bg-info text-light">
        BEST SELLERS
      </h1>
      <BestSellers />

      <h1 className="text-center mt-5 mb-5 jumbotron bg-info text-light">
        CATEGORIES
      </h1>
      <CategoryList />

      <h1 className="text-center mt-5 mb-5 jumbotron bg-info text-light">
        SUB CATEGORIES
      </h1>
      <SubList />
    </>
  );
};

export default Home;
