import React, { useState } from "react";
import HeroBanner from "../assets/img/banner.jpg";
import Amenities from "./Amenities";
import PriceList from "./PriceList";
import FloorPlans from "./FloorPlans";
import Gallery from "./Gallery";
import Logo from "../assets/img/logo.png";
import Footer from "./Footer";
import config from "../config";

const Content = () => {
  const [showMore, setShowMore] = useState(false);

  const toggleText = () => {
    setShowMore(!showMore);
  };
  const [isActive, setIsActive] = useState(false);

  // Function to toggle the 'active' class
  const handleCallBackClick = (e) => {
    e.preventDefault(); // Prevent any default behavior (if needed)
    setIsActive(!isActive); // Toggle the 'active' class
  };

  const [isFormVisible, setFormVisible] = useState(false);

  // Function to toggle the visibility of the form popup
  const handlePopup = () => {
    setFormVisible(true); // Show the popup when the button is clicked
  };

  const handlePopupClose = () => {
    setFormVisible(false); // Show the popup when the button is clicked
  };

  //form submmission



  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    msg: "",
  });

  // Track errors separately for each form
  const [errors, setErrors] = useState({
    form1: {},
    form2: {},
    form3: {},
    form4: {},
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeForm, setActiveForm] = useState(""); // Track the active form (e.g., 'form1')

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e, formId) => {
    e.preventDefault();
    setActiveForm(formId); // Set active form ID

    // Frontend validation
    const newErrors = { ...errors };

    // Validate fields for the specific form being submitted
    if (formId === "form1") {
      if (!formData.name) newErrors.form1.name = "Name is required.";
      if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
        newErrors.form1.email = "A valid email is required.";
      if (!formData.phone) newErrors.form1.phone = "Phone number is required.";
    }

    if (formId === "form2") {
      if (!formData.name) newErrors.form2.name = "Name is required.";
      if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
        newErrors.form2.email = "A valid email is required for form 2.";
      if (!formData.phone) newErrors.form2.phone = "Phone number is required.";
    }

    if (formId === "form3") {
      if (!formData.name) newErrors.form3.name = "Name is required.";
      if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
        newErrors.form3.email = "A valid email is required for form 2.";
      if (!formData.phone) newErrors.form3.phone = "Phone number is required.";
    }
    if (formId === "form4") {
      if (!formData.name) newErrors.form4.name = "Name is required.";
      if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
        newErrors.form4.email = "A valid email is required for form 2.";
      if (!formData.phone) newErrors.form4.phone = "Phone number is required.";
    }

  

    // Add more validations for other forms (form3, form4) if needed

    setErrors(newErrors);

    if (Object.keys(newErrors[formId]).length === 0) {
      setIsSubmitting(true);

      const formDataToSubmit = new FormData();
      formDataToSubmit.append("name", formData.name);
      formDataToSubmit.append("email", formData.email);
      formDataToSubmit.append("phone", formData.phone);
      formDataToSubmit.append("msg", formData.msg);

      // Send data to PHP handler
      try {
        const response = await fetch(config.apiUrl, {
          method: "POST",
          body: formDataToSubmit,
        });
        const result = await response.json();
        console.log(result);

        // Handle success or failure
        if (result.success) {
          alert("Your message has been sent.");
          setFormData({ name: "", email: "", phone: "", msg: "" });
        } else {
          alert("There was an error sending your message.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("There was an error sending your message.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <>
      <div className={`right-form ${isActive ? "active" : ""}`}>
        <a href="#" className="get-call-back" onClick={handleCallBackClick}>
          Get Call Back
        </a>
        <form
      id="myForm1"
      name="getcallback"
      method="get"
      className="form-box form-box-1"
      action="mail.php"
      autocomplete="off"
      onSubmit={(e) => handleSubmit(e, "form4")}
    >
      <a className="form-brand" href="#">
        <img src={Logo} alt="Prestige Siddharth Vihar Ghaziabad" />
      </a>
      <div className="top-form">
        <span>
          <i className="fa fa-phone-square"></i> Call us:{" "}
          <a href="tel:XXXXXXXXXX">+91 XXX-XXXX-XXX</a>
        </span>
      </div>
      <div className="form-group">
        <input
          type="text"
          name="name"
          id="clname"
          className="form-control"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.form4?.name && <span style={{ color: "red" }}>{errors.form4.name}</span>}
      </div>
      <div className="form-group">
        <input
          type="email"
          name="email"
          id="clemail"
          className="form-control"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.form4?.email && <span style={{ color: "red" }}>{errors.form4.email}</span>}
      </div>
      <div className="form-group">
        <input
          type="text"
          name="phone"
          id="clphone"
          className="form-control"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
        />
        {errors.form4?.phone && <span style={{ color: "red" }}>{errors.form4.phone}</span>}
      </div>
      <div className="form-group">
        <textarea
          name="msg"
          id="clmessage"
          className="form-control"
          placeholder="Message"
          value={formData.msg}
          onChange={handleChange}
        />
        {errors.form4?.msg && <span style={{ color: "red" }}>{errors.form4.msg}</span>}
      </div>
      <input
        type="submit"
        name="submit"
        className="btn btn-primary btn-block"
        value={isSubmitting ? "Sending..." : "Submit"}
        disabled={isSubmitting}
      />
    </form>
      </div>

      <div
        className="main-banner"
        id="banner"
        style={{
          background: `url(${HeroBanner}) left top no-repeat`,
          backgroundSize: "cover",
        }}
      >
        <div className="banner-text">
          <h1>
            Prestige City <br />
            Siddharth Vihar Ghaziabad
          </h1>
          <div className="main-text">
            <span>2/3/4 BHK Luxury Apartments</span>
          </div>
        </div>

        <form
      id="myForm3"
      className="form-box form-box-3"
      onSubmit={(e) => handleSubmit(e, "form3")}
    >
      <h3>Prestige City Ghaziabad</h3>
      <div className="top-form">
        <span>
          <i className="fa fa-phone-square"></i> Call us:{" "}
          <a href="tel:XXXXXXXXXX">+91 XXX XXXX XXX</a>
        </span>
      </div>
      <div className="form-group">
        <input
          type="text"
          name="name"
          id="clname3"
          className="form-control"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.form3?.name && <span style={{ color: "red" }}>{errors.form3.name}</span>}
      </div>
      <div className="form-group">
        <input
          type="email"
          name="email"
          id="clemail3"
          className="form-control"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.form3?.email && <span style={{ color: "red" }}>{errors.form3.email}</span>}
      </div>
      <div className="form-group">
        <input
          type="text"
          name="phone"
          id="clphone3"
          className="form-control"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
        />
        {errors.form3?.phone && <span style={{ color: "red" }}>{errors.form3.phone}</span>}
      </div>
      <div className="form-group">
        <textarea
          name="msg"
          id="clmessage3"
          className="form-control"
          placeholder="Message"
          value={formData.msg}
          onChange={handleChange}
        />
        {errors.form3?.msg && <span style={{ color: "red" }}>{errors.form3.msg}</span>}
      </div>
      <input
        type="submit"
        name="submit"
        className="btn btn-primary btn-block"
        value={isSubmitting ? "Sending..." : "Submit"}
        disabled={isSubmitting}
      />
    </form>
      </div>

      <div className="about-section" id="about">
        {/* <!--<img src="img/pious-strip.jpg" alt="Ivory County" className="img-responsive">--> */}
        <br />
        <br />
        <div className="container">
          <h2 className="section-title text-center">
            Prestige City Siddharth Vihar Ghaziabad
          </h2>
          <div className="borBot"></div>
          <div className="row">
            <div className="col-md-6 col-sm-22 col-xs-12">
              <table className="table table-bordered table-responsive">
                <tbody>
                  <tr>
                    <td colspan="2">
                      <b />
                      PROJECT DETAILS
                    </td>
                  </tr>
                  <tr>
                    <td>Project Name</td>
                    <td>Prestige City Ghaziabad</td>
                  </tr>
                  <tr>
                    <td>Configuration</td>
                    <td>2/3/4 BHK Flats</td>
                  </tr>
                  <tr>
                    <td>Total Saleable Area</td>
                    <td>10 Million sq ft </td>
                  </tr>
                  <tr>
                    <td>Total Development Value</td>
                    <td>10000 Cr </td>
                  </tr>
                  <tr>
                    <td>Development time</td>
                    <td>4 Years</td>
                  </tr>
                  <tr>
                    <td>Apartment sizes</td>
                    <td>1800 - 3200 Sq.ft.</td>
                  </tr>
                  <tr>
                    <td>Project Area</td>
                    <td>62.5 acres</td>
                  </tr>

                  <tr>
                    <td>Project Type</td>
                    <td>Large-Format Integrated Townships</td>
                  </tr>
                  <tr>
                    <td>Price</td>
                    <td>10000/sq.ft approx plus</td>
                  </tr>
                  <tr>
                    <td>Location</td>
                    <td>Indirapuram Extension</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="col-md-6">
              <p>
                Prestige City Ghaziabad is an exciting new development in the
                real estate market. It offers a blend of modern living with
                various amenities and strategic location, making it a prime
                choice for homebuyers. With its focus on quality construction
                and thoughtful design, this project aims to meet the needs of
                families and professionals alike.
              </p>
              <p>
                Situated in a growing area, Prestige City provides easy access
                to key roads and public transport. This makes daily commuting
                much simpler for its residents. The community features a range
                of facilities, such as parks, gyms, and shopping areas,
                enhancing the living experience for everyone.
              </p>
              <p>
                Investing in Prestige City not only promises a comfortable
                lifestyle but also offers potential value appreciation in the
                future. Many are eager to explore what this vibrant community
                has to offer.
              </p>
              <p
                style={{ textAlign: "center" }}
                onClick={handlePopup}
                className="btn-cta get-price-offer"
              >
                Submit Your Expression of Interest (EOI) Now!
              </p>
            </div>
          </div>
          {/* <!--<p>&nbsp;</p>-->
                <!--<p>&nbsp;</p>--> */}
        </div>
      </div>

      <div className="container">
        <div className="price-list" id="highlights">
          <div className="container">
            <h3 className="section-title">
              OVERVIEW OF PRESTIGE CITY GHAZIABAD
            </h3>
            <div className="borBot"></div>

            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 table-responsive">
                <p>
                  Prestige City Ghaziabad is a well-planned residential project
                  located in the bustling city of Ghaziabad, Uttar Pradesh. It
                  aims to provide modern living spaces that cater to various
                  needs.
                </p>
                <p>
                  The project offers a variety of housing options, including
                  apartments and villas. Each unit is designed to maximise
                  comfort and luxury.
                </p>
                {/* <!--<P><b>Key features include:</b></P>--> */}
                <h3>Key features include:</h3>
                <ul>
                  <li>
                    Location: Easily accessible from major roads and public
                    transport.
                  </li>
                  <li>
                    Amenities: Includes parks, gyms, swimming pools, and
                    children's play areas.
                  </li>
                  <li>
                    Security: 24/7 security with surveillance systems for
                    resident safety.
                  </li>
                  <li>
                    Sustainability: Eco-friendly features to promote green
                    living.
                  </li>
                  <li>
                    With its strategic location, Prestige City connects
                    residents to schools, hospitals, and shopping centres. This
                    makes it an attractive choice for families and professionals
                    alike.
                  </li>
                </ul>
                <p>
                  The developer has a good reputation for delivering quality
                  projects. They focus on craftsmanship and customer
                  satisfaction. This commitment enhances the appeal of Prestige
                  City within the real estate market.
                </p>
                <p>
                  Overall, Prestige City Ghaziabad represents a blend of modern
                  amenities and convenient living. It meets the lifestyle needs
                  of its residents while promoting a strong sense of community.
                </p>
                {showMore && (
                  <div id="moreText">
                    <h2 className="fs-30">Amenities and Facilities</h2>
                    <p>
                      Prestige City Ghaziabad offers a range of amenities and
                      facilities designed to enhance the quality of life for its
                      residents. From recreational areas to essential services,
                      these features cater to various needs within the
                      community.
                    </p>
                    <h3>Recreational Centres</h3>
                    <p>
                      The recreational centres in Prestige City Ghaziabad
                      provide spaces for both relaxation and physical activity.
                      These centres include indoor gyms, swimming pools, and
                      sports courts for basketball, tennis, and badminton. With
                      organised events and clubs, residents can enjoy a vibrant
                      community atmosphere.
                    </p>
                    <p>
                      Children also have play areas designed for safety and fun,
                      allowing families to spend quality time together. Whether
                      it's engaging in group fitness classes or enjoying leisure
                      activities, these centres serve as excellent venues for
                      social interaction and personal wellness.
                    </p>
                    <h3>Educational Institutions</h3>
                    <p>
                      Educational institutions in and around Prestige City
                      Ghaziabad are well-regarded for their quality of
                      education. Schools offer a range of curricula, including
                      CBSE and ICSE, catering to different student needs.
                    </p>
                    <p>
                      Nearby institutions focus on holistic development and
                      provide modern facilities like science labs, libraries,
                      and smart classrooms. Many of these schools also have
                      extracurricular programmes, including sports and arts,
                      which help in nurturing diverse talents and skills among
                      students.
                    </p>
                    <h3>Healthcare Services</h3>
                    <p>
                      Residents of Prestige City Ghaziabad benefit from numerous
                      healthcare services nearby. They have access to
                      well-equipped hospitals, clinics, and pharmacies that
                      provide a range of medical care.
                    </p>
                    <p>
                      Emergency services are readily available, ensuring quick
                      response times in critical situations. Many healthcare
                      providers also offer specialisations in fields like
                      paediatrics, geriatrics, and orthopaedics. This array of
                      services helps to ensure that the health needs of the
                      community are well met.
                    </p>
                    <h3>Retail and Shopping</h3>
                    <p>
                      Prestige City Ghaziabad features various retail and
                      shopping options, from local markets to large shopping
                      centres. Residents can find essential goods, clothing, and
                      electronics, ensuring convenience for everyday needs.
                    </p>
                    <p>
                      Malls and shopping complexes also host a variety of
                      eateries and entertainment options, including cinemas and
                      gaming zones. This accessibility promotes a lively
                      shopping experience, allowing residents to enjoy leisure
                      time without travelling far from home.
                    </p>
                    <h3>Green Spaces and Parks</h3>
                    <p>
                      Green spaces and parks are a vital aspect of Prestige City
                      Ghaziabad. They include landscaped gardens, walking paths,
                      and open areas for recreation. These spaces promote a
                      healthy lifestyle, enabling residents to engage in outdoor
                      activities like jogging and picnicking.
                    </p>
                    <p>
                      Parks often host community events and activities that
                      foster neighbourly interaction. By providing a serene
                      environment, these green areas contribute to the overall
                      well-being and happiness of residents in the community.
                    </p>
                    <h2 className="fs-30">Investment Potential</h2>
                    <p>
                      Prestige City Ghaziabad offers various prospects for
                      investment, especially in real estate. Its growth factors
                      include market trends and future projections that attract
                      investors looking for valuable opportunities.
                    </p>
                    <h3>Real Estate Market Trends</h3>
                    <p>
                      The real estate market in Ghaziabad is gaining attention.
                      There has been a steady increase in property prices over
                      the past few years. Key areas are seeing significant
                      demand due to improved infrastructure and connectivity.
                    </p>
                    <p>
                      Many developers are launching new projects, catering to
                      different budgets. This variety presents options for
                      potential buyers. Additionally, investments in commercial
                      spaces are rising alongside residential developments.
                    </p>
                    <p>
                      The population growth in Ghaziabad also supports the
                      housing market. As more people move to the area, the need
                      for housing continues to rise. This trend makes it a
                      favourable environment for long-term investments in real
                      estate.
                    </p>
                    <h2 className="fs-30">Projected Growth</h2>
                    <p>
                      Experts predict strong growth in Ghaziabad's real estate
                      sector. Emerging trends indicate that property values may
                      continue to rise. This is due to ongoing infrastructure
                      projects, such as metro expansions and new highways.
                    </p>
                    <p>
                      The area’s strategic location near Delhi enhances its
                      appeal. With better transport links, more businesses are
                      likely to establish operations in Ghaziabad. This can lead
                      to job creation and increased demand for housing.
                    </p>
                    <p>
                      Investors should also note the government’s plans for
                      urban development. Specific initiatives aim to boost
                      connectivity and amenities. These factors contribute to an
                      optimistic outlook for investors considering Prestige City
                      Ghaziabad.
                    </p>
                  </div>
                )}
                <button
                  id="readMoreBtn"
                  className="btndesign"
                  type="button"
                  onClick={toggleText}
                >
                  {showMore ? "Read Less" : "Read More"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Amenities />

      <PriceList />

      <FloorPlans />

      <section className="amenities_wrap" id="location">
        <div className="container">
          <h2 className="section-title">
            Location and Connectivity From Prestige City
          </h2>
          <div className="borBot"></div>

          <div className="row">
            <div className="col-md-6 col-sm-12 col-xs-12 fulldevices">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112094.7670632081!2d77.27182608269997!3d28.600932656963202!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cf1001257ba59%3A0x549af4e6c48f067a!2sPrestige%20City%20Indirapuram!5e0!3m2!1sen!2sin!4v1715066401411!5m2!1sen!2sin"
                height="450"
                style={{ border: 0, width: "100%" }}
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="col-md-6 col-sm-12 col-xs-12 fulldevices">
              <p>
                The location of Prestige City Ghaziabad offers residents easy
                access to key areas and efficient public transport options. This
                makes it a desirable place for many.
              </p>
              <h3>Accessibility by Public Transport</h3>
              <p>
                Prestige City Ghaziabad is well-connected through various modes
                of public transport. Nearby metro stations, such as Vaishali and
                Anand Vihar, provide quick access to central Delhi and other
                parts of the National Capital Region.
              </p>
              <p>
                Buses frequently operate along major roads, ensuring convenient
                travel. Auto-rickshaws and cycle-rickshaws are also readily
                available, making short distances easy to cover. Residents can
                expect reduced commute times due to the efficient network of
                public transport options.
              </p>
            </div>
            <div className="col-12 col-lg-12 fulldevices">
              <h3>Proximity to Key Areas</h3>
              <p>
                Prestige City is close to important places that enhance daily
                living. It is just a few kilometres away from major shopping
                centres, hospitals, and educational institutions.
              </p>
              <p>
                Key areas like Indirapuram and Noida are within a short drive,
                providing additional amenities. The location is strategic for
                those who work in Delhi or neighbouring cities, making it
                perfect for families and professionals. Easy access to highways,
                like the Delhi-Meerut Expressway, further improves connectivity
                to surrounding regions.
              </p>
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 table-responsive">
              <table className="table table-bordered tbl">
                <tbody>
                  <tr>
                    <td width="50%">
                      <span>✔</span> City Centre 20 Min.
                    </td>
                    <td width="50%">
                      <span>✔</span> Amity University 19 Min.
                    </td>
                  </tr>
                  <tr>
                    <td width="50%">
                      <span>✔</span> Fortis Hospital 23 Min.
                    </td>
                    <td width="50%">
                      <span>✔</span> Mall Of India 24 Min.
                    </td>
                  </tr>
                  <tr>
                    <td width="50%">
                      <span>✔</span> Akshardham Temple 33 Min.
                    </td>
                    <td width="50%">
                      <span>✔</span> Indira Gandhi International Airport 63 Min.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <Gallery />

      <div className="price-list" id="highlights">
        <div className="container">
          <h3 className="section-title">ABOUT PRESTIGE GROUP</h3>
          <div className="borBot"></div>

          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 table-responsive">
              <p>
                Prestige Group is one of India's leading real estate developers,
                with a strong presence across major cities such as Bangalore,
                Hyderabad, Chennai, and Mumbai. Established in 1986, the group
                has developed a wide range of projects, including residential,
                commercial, retail, and hospitality spaces. Known for its
                high-quality construction and innovative designs, Prestige Group
                has consistently delivered premium projects that cater to modern
                urban lifestyles. Their commitment to customer satisfaction and
                adherence to international standards has earned them numerous
                awards and recognition in the real estate industry.
              </p>
              <p>
                With over 250 completed developments and many more in progress,
                Prestige Group continues to shape the urban landscape of India.
                The group focuses on creating sustainable and eco-friendly
                environments while integrating cutting-edge technology into
                their projects. Their developments feature a mix of luxurious
                amenities, green spaces, and smart infrastructure, providing
                residents and businesses with a well-rounded living and working
                experience. Through a blend of excellence, innovation, and
                reliability, Prestige Group has solidified its reputation as a
                trusted and visionary real estate brand in the country.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <h3 className="section-title text-center">
          Frequently Asked Questions
        </h3>
        <div className="borBot"></div>

        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 table-responsive">
            <p align="justify">
              <strong>
                Q1: What types of residential units are available in Prestige
                City Ghaziabad?
              </strong>
            </p>
            <p align="justify">
              <strong>A1:</strong> Prestige City offers a range of residential
              units, including luxurious 2 BHK, 3 BHK, and 4 BHK apartments.
            </p>
            <br />

            <p align="justify">
              <strong>Q2: What amenities are included in the project?</strong>
            </p>
            <p align="justify">
              <strong>A2:</strong> Residents of Prestige City, Siddharth Vihar,
              Ghaziabad, can enjoy amenities like parks, gyms, swimming pools,
              children's play areas, and 24/7 security for their safety and
              comfort.
            </p>
            <br />

            <p align="justify">
              <strong>Q3: What is the project's location?</strong>
            </p>
            <p align="justify">
              <strong>A3:</strong> Prestige City is strategically located in
              Siddharth Vihar, Ghaziabad, with easy access to major roads and
              public transport.
            </p>
            <br />

            <p align="justify">
              <strong>Q4: Is the project RERA registered?</strong>
            </p>
            <p align="justify">
              <strong>A4:</strong> Yes, Prestige City Ghaziabad is registered
              with RERA. The RERA details are expected to be available soon on
              the official UP RERA website at www.up-rera.in.
            </p>
            <br />

            <p align="justify">
              <strong>
                Q5: What is the expected completion date for the project?
              </strong>
            </p>
            <p align="justify">
              <strong>A5:</strong> The completion date for the project is
              expected to be announced soon. Stay tuned for more details.
            </p>
            <br />

            <p align="justify">
              <strong>
                Q6: How can I book a unit in Prestige City Ghaziabad?
              </strong>
            </p>
            <p align="justify">
              <strong>A6:</strong> To book a unit, you can submit your
              Expression of Interest (EOI) through our website or contact our
              sales team for assistance.
            </p>
            <br />
          </div>
        </div>
      </div>
      <Footer
        isFormVisible={isFormVisible}
        handlePopupClose={handlePopupClose}
        formData={formData}
        setFormData={setFormData}
        errors={errors}
        setErrors={setErrors}
        isSubmitting={isSubmitting}
        setIsSubmitting={setIsSubmitting}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default Content;
