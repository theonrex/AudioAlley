const PORT = 8000;
const axios = require("axios").default;
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
app.use(cors());

app.get("/news", (req, res) => {
  const options = {
    method: "GET",
    url: `https://cryptopanic.com/api/v1/posts/?auth_token=${process.env.NEXT_PUBLIC_API_KEY}&filter=important&kind=news`,

    headers: {
      accept: "application/json",
    },
  };
  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      res.json(response.data);

      // res.json(response.data.slice(0, 6));
    })
    .catch(function (error) {
      console.error(error);
    });
});

app.listen(PORT, () => console.log("running on PORT " + PORT));

// Export the Express API
module.exports = app;
