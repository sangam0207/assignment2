const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/fetchData", async (req, res) => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/fetchSearchData", async (req, res) => {
  const idInput = parseInt(req.body.idInput, 10);
  const nameInput = req.body.nameInput;

  if ((isNaN(idInput) || idInput < 1 || idInput > 10) && !nameInput) {
    res.status(400).json({ error: "Invalid ID or Name input" });
    return;
  }

  try {
    let response;
    if (idInput) {
      response = await axios.get(`https://jsonplaceholder.typicode.com/users/${idInput}`);
    } else {
      response = await axios.get(`https://jsonplaceholder.typicode.com/users?name=${nameInput}`);
    }

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
