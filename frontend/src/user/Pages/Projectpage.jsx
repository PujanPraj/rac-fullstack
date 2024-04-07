import React from "react";
import Heading from "../Homecomponent/Heading";
import Procard from "../Homecomponent/Procard";
import Projectpagelist from "../List/Projectpagelist";

const Project = () => {
  return (
    <>
      <div className="pageHeader py-4">
        <Heading title="Our Projects" />
      </div>
      <div className="container py-5">
        <Procard items={Projectpagelist} />
      </div>
    </>
  );
};

export default Project;
