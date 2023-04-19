import Toaster from "./Toaster";
const Home = ({ setFlag }) => {
  return (
    <>
      <link href="style.scss" rel="stylesheet/scss" type="text/css" />
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0-alpha.6/css/bootstrap.min.css"
        rel="stylesheet"
        type="text/css"
      />
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        rel="stylesheet"
        type="text/css"
      />
      <div style={{ width: "100%", padding: "0" }} className="wrapper">
        <section style={{ width: "100%" }} className="hero">
          <header style={{ backgroundColor: "#025aa5" }}>
            <div className="container">
              <nav className="navbar navbar-light navbar-toggleable-sm">
                <a
                  style={{ color: " aliceblue" }}
                  href="#"
                  className="navbar-brand mb-0">
                  Glitch Hunt
                </a>
                <button
                  className="navbar-toggler navbar-toggler-right"
                  type="button"
                  data-toggle="collapse"
                  data-target="#headerNav"
                  aria-controls="headerNav"
                  aria-expanded="false"
                  aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon" />
                </button>
                <div
                  id="headerNav"
                  className="collapse navbar-collapse justify-content-end">
                  <ul style={{ color: " aliceblue" }} className="navbar-nav">
                    <li className="nav-item">
                      <a
                        style={{ color: " aliceblue" }}
                        className="nav-link"
                        href="#sec-about">
                        About
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        style={{ color: " aliceblue" }}
                        className="nav-link"
                        href="#sec-features">
                        Features
                      </a>
                    </li>

                    <li className="nav-item">
                      <a
                        style={{ color: " aliceblue" }}
                        className="nav-link"
                        href="#sec-testimonials">
                        Testimonials
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        style={{ color: " aliceblue" }}
                        className="nav-link"
                        href="#sec-contact">
                        Contact
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        style={{ color: " aliceblue" }}
                        className="nav-link"
                        href="#sec-contact"
                        onClick={() => {
                          setFlag(1);
                        }}>
                        Adminstration
                      </a>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </header>
          <div className="jumbotron jumbotron-fluid mb-0">
            <div className="container">
              <div className="row justify-content-center text-center">
                <div className="col-md-10 col-lg-6">
                  <h1 className="display-5">
                    The palce where you can play with code!
                  </h1>
                  <p className="lead">A debugging website</p>
                  <p className="lead">
                    <span
                      className="btn btn-primary btn-lg"
                      onClick={() => {
                        setFlag(1);
                      }}
                      role="button">
                      Enter Contest
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          style={{ width: "100%" }}
          id="sec-about"
          className="sec-about pt-5 pb-5">
          <div className="container">
            <div className="row justify-content-center text-center">
              <div className="col-md-10 col-lg-8">
                <h1 className="h4">About us</h1>
                <p className="mt-4 mb-4">
                  Co-working spaces are brilliant for smaller companies of up to
                  4 people who want a regular workspace. Cost effective,
                  flexible and full of a vibrant energy that comes from hundreds
                  of like-minded people going it alone.
                </p>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-sm-4">
                <h4>350</h4>
                <hr />
                <h5>members</h5>
              </div>
              <div className="col-sm-4">
                <h4>60</h4>
                <hr />
                <h5>co-working spaces </h5>
              </div>
              <div className="col-sm-4">
                <h4>3</h4>
                <hr />
                <h5>members' bars</h5>
              </div>
            </div>
          </div>
        </section>
        <section
          style={{ width: "100%" }}
          id="sec-features"
          className="sec-features pt-5 pb-5">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6">
                <h3 className="h4">Lockers</h3>
                <hr />
                <p>
                  Lockers come in all different shapes and sizes and can be
                  hired in any building, even if it’s not your home building.
                </p>
              </div>
              <div className="col-md-6 text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 512"
                  style={{ width: 80, height: 80 }}>
                  {/*! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
                  <path d="M384 96V320H64L64 96H384zM64 32C28.7 32 0 60.7 0 96V320c0 35.3 28.7 64 64 64H181.3l-10.7 32H96c-17.7 0-32 14.3-32 32s14.3 32 32 32H352c17.7 0 32-14.3 32-32s-14.3-32-32-32H277.3l-10.7-32H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm464 0c-26.5 0-48 21.5-48 48V432c0 26.5 21.5 48 48 48h64c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48H528zm16 64h32c8.8 0 16 7.2 16 16s-7.2 16-16 16H544c-8.8 0-16-7.2-16-16s7.2-16 16-16zm-16 80c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16s-7.2 16-16 16H544c-8.8 0-16-7.2-16-16zm32 160a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
                </svg>
              </div>
            </div>
            <footer className="footer">
              <div className="container">
                <ul className="list-inline mb-0 text-center">
                  <li className="list-inline-item">
                    <a href="">
                      <span className="fa fa-twitter" />
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="">
                      <span className="fa fa-google-plus" />
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="">
                      <span className="fa fa-instagram" />
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="">
                      <span className="fa fa-envelope-o" />
                    </a>
                  </li>
                </ul>
              </div>
            </footer>
          </div>
        </section>
      </div>
    </>
  );
};
export default Home;
