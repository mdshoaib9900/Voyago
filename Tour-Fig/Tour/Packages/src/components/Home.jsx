import React from "react";
import BackgroundWrapper from "./BackgroundWrapper";
import TourGrid from "./TourGrid";
import AboutAndOffers from "./AboutAndOffers";
import PopularDestinations from "./PopularDestinations";
import BookBike from "./BookBike";
import TourCategory from "./TourCategory";
import HappyCustomer from "./HappyCustomers";
import { SearchBar } from "./SearchBar";
import { tourData } from "../data/toursData";
import PopularPackages from "./PopularPackages";

const Home = ({ onSearch }) => {
  return (
    <>
      <BackgroundWrapper>
      <SearchBar onSearch={onSearch} />
      </BackgroundWrapper>
      <TourGrid />
      <AboutAndOffers />
      <TourCategory />
      <PopularDestinations />
      <BookBike />
      <PopularPackages />
      <HappyCustomer />
    </>
  );
};

export default Home;
