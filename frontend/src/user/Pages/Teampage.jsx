import React from "react";
import Heading from "../Homecomponent/Heading";
import Boardmemberlist from "../List/Boardmemberlist";
import Team from "../Homecomponent/Team";
import Members from "../List/Memberlist";

const Teampage = () => {
  return (
    <>
      <div className="pageHeader py-4">
        <Heading title="Board Members" />
      </div>
      <div className="container mt-4">
        <Team items={Boardmemberlist} />
      </div>
      <div className=" pt-5 pb-3">
        <Heading title="Members" />
      </div>
      <div className="container pb-5">
        <Team items={Members} />
      </div>
    </>
  );
};

export default Teampage;
