import React from "react";
import TheonLogo from "../public/theonblock.png";

function Footer() {
  return (
    <div>
      {" "}
      <div className="footer-container">
        <div>
          {/* <Subscribe /> */}

          <div className="deneb_footer">
            {/* <BackToTop/> */}
            <div className="widget_wrapper">
              <div className="container">
                <div className="row">
                  <div className="col-lg-3 col-md-6 col-12">
                    <div className="widget widegt_about">
                      <div className="widget_title">
                        <img
                          src={TheonLogo.src}
                          alt="logo"
                          className="footer-logo"
                        />
                        <p>
                          We're excited to have you here, and we look forward to
                          providing you with the information and insights you
                          need to navigate the rapidly-evolving world of digital
                          currencies.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-12">
                    <div className="widget widget_link">
                      <div className="widget_title">
                        <h4>Quick Link</h4>
                      </div>
                      <ul>
                        <li>
                          <a href="/"> Home </a>
                        </li>
                        <li>
                          <a href="/nft"> NFTs</a>
                        </li>
                        <li>
                          <a href="/about"> About </a>
                        </li>
                        <li>
                          <a href="/contact"> Contact </a>
                        </li>{" "}
                      </ul>
                    </div>
                  </div>{" "}
                  <div className="col-lg-3 col-md-6 col-sm-12">
                    <div className="widget widget_link">
                      <div className="widget_title">
                        <h4>Resources</h4>
                      </div>
                      <ul>
                        <li>
                          <a href="#"> Terms & Conditions </a>
                        </li>
                        <li>
                          <a href="#"> FAQs</a>
                        </li>
                        <li>
                          <a href="#"> Blockchain Explores </a>
                        </li>
                        <li>
                          <a href="#"> Crypto Api</a>
                        </li>{" "}
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-12">
                    <div className="widget widget_link">
                      <div className="widget_title">
                        <h4> Top Resources</h4>
                      </div>
                      <div className="widget widegt_about">
                        <ul>
                          <li>
                            <a href="#"> Ethereum </a>
                          </li>
                          <li>
                            <a href="#">Binance</a>
                          </li>
                          <li>
                            <a href="#"> Polygon </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="copyright_area">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12 copyright_text_bg ">
                    <div className="copyright_text">
                      <p>©2021 Theon. All rights reserved</p>
                    </div>{" "}
                    {/* <div className="copyright_text_icons ">
											<i className="bi bi-facebook"></i>
											<i className="bi bi-instagram"></i>
											<i className="bi bi-youtube"></i>
											<i className="bi bi-twitter"></i>
											<i className="bi bi-linkedin"></i>
										</div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
