const app = require("express")();
const axios = require("axios");

const PORT = 3000 || process.env.PORT;

app.get("/jokes", async (req, res) => {
  try {
    const { keyword, amount } = req.query;

    const jokeCount = amount && amount > 0 && amount <= 3 ? amount : 1;

    const searchKeyword =
      typeof keyword === "string" && keyword.length > 0 ? keyword : null;

    const queryString = searchKeyword
      ? `contains=${keyword}&amount=${jokeCount}`
      : `amount=${jokeCount}`;

    const url = `https://v2.jokeapi.dev/joke/Any?format=json&${queryString}`;

    const response = await axios.get(url);
    console.log(response)
    if (!response.data) {
      return res.status(404).json({ message: "ERROR: No jokes Found" });
    }

    if (response.data.error) {
      res.status(500).json({
        message: "ERROR: An error caught while fetching the jokes",
        error: res.data.error,
      });
    }

    let jokesResponse;

    if ("jokes" in response.data) {
      jokesResponse = response.data.jokes;
    } else {
      const { error, flags, ...joke } = response.data;
      jokesResponse = joke;
    }

    return res.status(200).json({
      message: "SUCCESS: successfully fetched joke(s)",
      data: jokesResponse,
    });
  } catch (error) {
    res.status(500).json({
      message: "ERROR:Error caught while trying to get joke(s)",
    });
  }
});

app.listen(PORT, () =>
  console.log(`[server]:Server listening on port ${PORT}`)
);
