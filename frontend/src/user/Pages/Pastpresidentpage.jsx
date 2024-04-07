import React from "react";
import Heading from "../Homecomponent/Heading";
import Team from "../Homecomponent/Team";
import Pastpresidentlist from "../List/Pastpresidentlist";

const Pastpresident = () => {
  return (
    <>
      <div className="pageHeader py-4">
        <Heading title="Past Presidents" />
      </div>
      <div className="container mt-4 pb-5">
        <Team items={Pastpresidentlist} />
      </div>
    </>
  );
};

export default Pastpresident;
