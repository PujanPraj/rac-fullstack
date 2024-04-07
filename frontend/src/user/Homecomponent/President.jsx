import React from "react";
import "./CSS/President.css";

const IPP = "./images/boardmember/IPP.jpg";
const president = "./images/boardmember/president.jpg";

const color = "#A61151";

const President = () => {
  return (
    <>
      <div className="presidentSection py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12 col-md-12 col-lg-3">
              <h2 style={{ color, fontSize: "80px" }} className="tekoHeading">
                Meet Our Club Leader
              </h2>
            </div>

            <div className="col-12 col-md-12 col-lg-9">
              <div className="images d-flex gap-3 justify-content-end">
                <div className="imageItems">
                  <img src={president} alt="" />
                  <div className="text">
                    <h5>Rtr. Manish Prajapati</h5>
                    <h6>President</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default President;
