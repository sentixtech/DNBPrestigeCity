import React, { useState } from "react";
import UpcomingImg from "../assets/img/upcoming-projects.webp";

const Footer = ({
    isFormVisible,
    handlePopupClose,
    formData,
    setFormData,
    errors,
    setErrors,
    isSubmitting,
    setIsSubmitting,
    handleChange,
    handleSubmit
  }) => {
 

  return (
    <>
      <section className="Enquire_Now_service" style={{ marginTop: "20px" }}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6" style={{ padding: "0px" }}>
              <img
                style={{ width: "100%" }}
                src={UpcomingImg}
                alt="Upcoming Projects"
              />
            </div>

            <div className="col-md-6">
              <div className="enquire_boxLeft">
                <h3 className="section-title">Contact Us</h3>
                <span className="divied"></span>

                {/* Form 1 */}
                <form onSubmit={(e) => handleSubmit(e, "form1")}>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Full Name"
                          id="clname4"
                        />
                        {errors.form1.name && <span>{errors.form1.name}</span>}
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <input
                          type="email"
                          name="email"
                          className="form-control"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Email"
                        />
                        {errors.form1.email && <span>{errors.form1.email}</span>}
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <input
                          type="text"
                          name="phone"
                          className="form-control"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Phone Number"
                        />
                        {errors.form1.phone && <span>{errors.form1.phone}</span>}
                      </div>
                    </div>

                    <div className="col-md-12">
                      <button
                        type="submit"
                        className="btn"
                        style={{ backgroundColor: "#c29e60", color: "#f6f6f6" }}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Sending..." : "Submit"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popup Form (form 2 example) */}
      <div
        id="form-popup"
        style={{ display: isFormVisible ? "block" : "none" }}
      >
        <div className="popup-content">
          <span className="close" id="close-button" onClick={handlePopupClose}>
            ×
          </span>
          <form onSubmit={(e) => handleSubmit(e, "form2")}>
            <h4 className="text-center">Leave Your Details Here</h4>
            <div className="form-group mb-2">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="clname3"
                placeholder="Your Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.form2.name && <span>{errors.form2.name}</span>}
            </div>
            <div className="form-group mb-2">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="clemail3"
                placeholder="Your Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.form2.email && <span>{errors.form2.email}</span>}
            </div>
            <div className="form-group mb-2">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="text"
                className="form-control"
                id="clphone3"
                placeholder="Your Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
              {errors.form2.phone && <span>{errors.form2.phone}</span>}
            </div>
            <input
              value="Submit"
              type="submit"
              className="btn my-btn w-100 mt-3"
              style={{
                backgroundColor: "#e8d7bb",
                borderRadius: "10px",
              }}
              name="submit"
            />
          </form>
        </div>
      </div>

      <a href="https://wa.me/919911594948" className="wp" target="_blank">
        <i className="fab fa-whatsapp wp"></i>
      </a>
    </>
  );
};

export default Footer;
