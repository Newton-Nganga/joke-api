const app = require("express")();
const axios = require("axios");

const PORT = 3000 || process.env.PORT;
const JOKE_API_BASE_URL = "https://v2.jokeapi.dev/joke/Any";

app.get("/jokes", async (req, res) => {
  try {
    const { keyword, amount } = req.query;

    // Ensure jokeCount is within 1 to 3 range
    const jokeCount = Math.min(Math.max(parseInt(amount, 10) || 1, 1), 3); 
   
    const queryParams = {
      format: "json",
      amount: jokeCount,
    };
  
    if (keyword && typeof keyword === "string" && keyword.length > 0) {
      queryParams.contains = keyword; // Add keyword query parameter if provided
    }
    
    // Make a request to Joke API
    const response = await axios.get(JOKE_API_BASE_URL, { params: queryParams }); 

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
