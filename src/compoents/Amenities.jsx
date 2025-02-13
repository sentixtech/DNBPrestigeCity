import React from "react";

// Importing images using relative path
import gymnassium from "../assets/img/amenities/gymnassium.webp";
import swimmingPool from "../assets/img/amenities/Swimming-Pool.webp";
import joggingTrack from "../assets/img/amenities/jogging-track.webp";
import yogaStudio from "../assets/img/amenities/yoga-studio.webp";
import clubHouse from "../assets/img/amenities/club-house.webp";
import multipurposeHall from "../assets/img/amenities/Multipurpose-hall.webp";
import carParking from "../assets/img/amenities/car-parking.webp";
import openSpaces from "../assets/img/amenities/open-spaces.webp";

const Amenities = () => {
  // Array of amenities with imported images
  const amenities = [
    {
      imgSrc: gymnassium,
      altText: "Ivory County Sector 115 Noida",
      text: "Gymnasium"
    },
    {
      imgSrc: swimmingPool,
      altText: "Ivory County Apartments",
      text: "Swimming Pool"
    },
    {
      imgSrc: joggingTrack,
      altText: "Ivory County Price List",
      text: "Jogging Track"
    },
    {
      imgSrc: yogaStudio,
      altText: "Ivory County Phase 2",
      text: "Yoga & Meditation Center"
    },
    {
      imgSrc: clubHouse,
      altText: "Ivory County Floor Plan",
      text: "Club House"
    },
    {
      imgSrc: multipurposeHall,
      altText: "Ivory County Floor Plan",
      text: "Multipurpose Hall"
    },
    {
      imgSrc: carParking,
      altText: "Ivory County Noida Floor Plan",
      text: "Car Parking"
    },
    {
      imgSrc: openSpaces,
      altText: "Ivory County Floor Plan",
      text: "Amphitheatre"
    }
  ];

  return (
    <section className="amenities_wrap" id="amenities">
      <div className="container">
        <h2 className="section-title text-center">Amenities</h2>
        <div className="borBot"></div>

        <div className="row">
          {amenities.map((amenity, index) => (
            <div key={index} className="col-md-3 col-sm-6 col-xs-6 feature-box">
              <img
                src={amenity.imgSrc}
                alt={amenity.altText}
                className="img-responsive"
              />
              <p>{amenity.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Amenities;
