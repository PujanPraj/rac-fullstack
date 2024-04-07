import React from "react";
import "./CSS/Procard.css";
import Projectlist from "../List/Projectlist";
import Procard from "./Procard";
import Heading from "./Heading";
import Seemore from "./Seemore";

const Project = () => {
  return (
    <>
      <div className="projectSection py-5">
        <Heading
          title="Our Projects"
          para="We are here to make your website look more elegant and stylish!"
        />

        <div className="container">
          <Procard items={Projectlist} />
          <Seemore to="/project" />
        </div>
      </div>
    </>
  );
};

export default Project;
