import React from 'react';
import Img1 from '../assets/img/floor-plan-coming-soon.webp';
import Img2 from '../assets/img/floor-plan-coming-soon.webp'
import Img3 from '../assets/img/master-plan.jpg'

const FloorPlans = () => {
  // Array of floor plans
  const floorPlans = [
    {
      title: "2 BHK",
      image: Img1,
      alt: "Prestige Indirapuram Extension 2BHK Layout",
    },
    {
      title: "3 BHK",
      image: Img2,
      alt: "Prestige Indirapuram Extension 3BHK Layout",
    },
    {
      title: "4 BHK",
      image: Img3,
      alt: "Prestige Indirapuram Extension 4BHK Layout",
    },
  ];

  return (
    <section className="gallery-wrap" id="floor-plan">
      <div className="container text-center">
        <p>&nbsp;</p>
        <h2 className="section-title">Prestige City Floor Plan</h2>
        <div className="borBot"></div>

        <div className="row">
          {/* Dynamically render floor plans */}
          {floorPlans.map((plan, index) => (
            <div key={index} className="col-md-4 col-sm-12 col-xs-12 fulldevices">
              <a
                className="photogallery-image"
                data-fancybox="gallery"
                href={plan.image}
              >
                <img
                  src={plan.image}
                  alt={plan.alt}
                  className="img-responsive"
                />
                <div className="view-pdf" style={{ left: "30%" }}>
                  <h3>{plan.title}</h3>
                </div>
              </a>
            </div>
          ))}
        </div>

        <p>&nbsp;</p>
      </div>
    </section>
  );
};

export default FloorPlans;
