import React from "react";

const Features = () => {
  return (
    <div>
      <div className="rowx container-xxl">
        <header className="features_header purple_text">Why Choose Us</header>
        <div className="features_mg rowx ">
          <div className="col30 ">
            <div className="features_img  features_col30">
              <img
                src="https://img.icons8.com/external-flaticons-flat-flat-icons/300/000000/external-trading-investing-flaticons-flat-flat-icons.png"
                alt="prices"
              />
            </div>
            <section className="features_text features_col30">
              <h1>Live Price</h1>
              <p>
                With our website, you can easily check the latest prices of your
                favorite cryptocurrencies, such as Bitcoin, Ethereum, and
                Litecoin.
              </p>
            </section>
          </div>
          <div className="col30 features_col30_rowx">
            <div className="features_img features_col30 features_middle">
              <img
                src="https://img.icons8.com/external-flaticons-flat-flat-icons/300/000000/external-privacy-privacy-flaticons-flat-flat-icons.png"
                alt="crypto"
              />
            </div>
            <section className="features_text features_col30">
              <h1>Data Privacy</h1>
              <p>
                We also offer a selection of the best crypto wallets available,
                so you can securely store your digital currencies.
              </p>
            </section>
          </div>

          <div className="col30">
            <div className="features_img features_col30">
              <img
                src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/300/000000/external-news-politics-flaticons-lineal-color-flat-icons.png"
                alt="news"
              />
            </div>
            <section className="features_text features_col30">
              <h1>Latest News</h1>
              <p>
                We provide comprehensive coverage of the world of
                cryptocurrencies, from real-time price updates to the latest
                news and articles.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
