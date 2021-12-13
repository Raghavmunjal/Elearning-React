import React from "react";
import t3 from "../images/t3.svg";

const HomeScreen = () => {
  return (
    <div>
      <section
        id="hero"
        className="d-flex justify-content-center align-items-center banner"
      >
        <div className="container position-relative">
          <h1>
            Learning Today,
            <br />
            Leading Tomorrow
          </h1>

          <button href="/" className="btn-get-started">
            Get Started
          </button>
        </div>
      </section>

      <div className="row mt-5 programs">
        <div className="col text-center">
          <h2>
            <strong>Our Programs</strong>
          </h2>
          <div className="underline"></div>
          <p>
            Get unlimited access to 6,000+ of Kakshaa top courses for your team.
            Learn and improve skills across business, tech, design, and more.
          </p>
        </div>
      </div>

      <div className="container education">
        <div className="row">
          <div className="col-md-6">
            <img src={t3} alt="" />
          </div>
          <div className="edu col-md-4 offset-md-1 my-auto">
            <div>
              <h3>We Are Excellent In</h3>
              <h3>
                <b>Education.</b>
              </h3>
              <p className="mt-3">
                Learners around the world are launching new careers, advancing
                in their fields, and enriching their lives.
              </p>
              <h6 className="mt-3">
                <i className="fas fa-graduation-cap education-icon1"></i> 22,931
                Yearly Graduates
              </h6>
              <h6 className="mt-3">
                <i className="fas fa-university education-icon2"></i> 150
                Universities Worldwide
              </h6>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-5 programs">
        <div className="col text-center">
          <h2>
            <strong>Our Instructors</strong>
          </h2>
          <div className="underline"></div>
          <p>
            Instructors from around the world teach millions of students on
            Udemy. We provide the tools and skills to teach what you love.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
