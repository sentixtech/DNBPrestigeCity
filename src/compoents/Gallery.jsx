import React from "react";

// Importing images
import img1 from "../assets/img/gallery/1.jpg";
import img2 from "../assets/img/gallery/2.jpg";
import img3 from "../assets/img/gallery/3.jpg";
import img4 from "../assets/img/gallery/4.jpg";

const Gallery = () => {
  // Array of gallery images with imported images
  const galleryImages = [
    {
      src: img1,
      alt: "Gallery1",
      title: "Gallery1",
    },
    {
      src: img2,
      alt: "Gallery2",
      title: "Gallery2",
    },
    {
      src: img3,
      alt: "Gallery3",
      title: "Gallery3",
    },
    {
      src: img4,
      alt: "Gallery4",
      title: "Gallery4",
    },
  ];

  return (
    <section className="gallery-wrap" id="gallery">
      <div className="container">
        <h2 className="section-title">
          Prestige City Indirapuram Extension - Gallery
        </h2>
        <div className="borBot"></div>
        <div className="row">
          {/* Dynamically render gallery items */}
          {galleryImages.map((image, index) => (
            <div key={index} className="col-md-3 col-sm-6 col-xs-6 fulldevices">
              <a
                className="photogallery-image"
                data-fancybox="gallery"
                href={image.src}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="img-responsive"
                />
                <div className="view-pdf" style={{ left: "30%" }}>
                  <h3>{image.title}</h3>
                </div>
              </a>
            </div>
          ))}
        </div>

        <p>&nbsp;</p>
        <p>&nbsp;</p>
      </div>
    </section>
  );
};

export default Gallery;
