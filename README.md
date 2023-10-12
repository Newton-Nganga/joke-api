
## Joke API Documentation

The Joke API provides a way to fetch jokes based on specified parameters.

### Base URL

```
http://localhost:3000
```

### Endpoints

#### Fetch Jokes

```
GET /jokes
```

Fetch jokes based on optional query parameters.

##### Query Parameters

- `keyword` (optional, string): Filter jokes based on a keyword.
- `amount` (optional, integer): Number of jokes to fetch. Should be between 1 and 3 (defaults to 1 if not provided).

##### Response

- Status: 200 OK
- Body: JSON object containing joke(s) data.
  - `message` (string): A message about the success of the request.
  - `data` (object or array): Joke data based on the number of jokes requested.
    - For a single joke request:
      - `category` (string): The category of the joke.
      - `type` (string): The type of the joke.
      - `setup` (string): The setup line of the joke.
      - `delivery` (string): The delivery line of the joke.
    - For multiple jokes request:
      - `jokes` (array): An array of joke objects, each following the same structure as a single joke response.

- Example:

```json
{
  "message": "Successfully fetched joke(s)",
  "data": {
    "category": "General",
    "type": "twopart",
    "setup": "Why did the chicken cross the road?",
    "delivery": "To get to the other side!"
  }
}
```

##### Error Responses

- Status: 404 Not Found
- Body: JSON object indicating no jokes found.
  - Example:

  ```json
  {
    "message": "No jokes found"
  }
  ```

- Status: 500 Internal Server Error
- Body: JSON object indicating an error occurred while fetching the jokes.
  - `message` (string): A message about the error.
  - `error` (string): The error message or additional error details.
  - Example:

  ```json
  {
    "message": "An error occurred while fetching the jokes",
    "error": "Invalid API response"
  }
  ```

### Usage

To fetch a single joke, make a GET request to `/jokes`. To fetch multiple jokes, provide the `amount` parameter with a value between 1 and 3. To filter jokes based on a keyword, provide the `keyword` parameter.

Examples:

- Fetch a single joke:

  ```
  GET /jokes
  ```

- Fetch three jokes:

  ```
  GET /jokes?amount=3
  ```

- Filter jokes based on a keyword:

  ```
  GET /jokes?keyword=chicken
  ```

### Response Codes

- 200 OK: Successful request.
- 404 Not Found: No jokes found for the provided parameters.
- 500 Internal Server Error: Error occurred while processing the request.


