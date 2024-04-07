import React from "react";
import "./CSS/Procard.css";
import Latestprojectlist from "../List/Latestprojectlist";
import Procard from "./Procard";
import Heading from "./Heading";
import Seemore from "./Seemore";

const Latestproject = () => {
  return (
    <>
      <div className="latestProjectSection py-5">
        <Heading
          title="Our Latest Projects"
          para="We are here to make your website look more elegant and stylish!"
        />

        <div className="container">
          <Procard items={Latestprojectlist} />
          <Seemore to="/project" />
        </div>
      </div>
    </>
  );
};

export default Latestproject;
