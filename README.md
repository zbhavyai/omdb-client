# Movie Search using OMDb API

A frontend for searching for movies using the [OMDb API](https://www.omdbapi.com/). Check it online at [https://omdb-web-react.netlify.app](https://omdb-web-react.netlify.app).

## How to build and run

1. Clone the repository on your machine, or download the zip file

   ```bash
   $ git clone git@github.com:zbhavyai/movie-search-omdb.git
   ```

2. Add API key to [`.env`](.env) file like below, or in a new file `.env.development`. You can get the API key from [here](http://www.omdbapi.com/apikey.aspx).

   ```
   REACT_APP_OMDB_API_KEY=<YOUR API KEY>
   ```

3. Install the dependencies

   ```bash
   $ pnpm install --frozen-lockfile
   ```

4. To run the development build using the below command. You can launch your browser and visit the default URL `http://localhost:3005`

   ```
   $ pnpm run dev
   ```

## Attribution

Movie logo downloaded from [Clapperboard Prosymbols](https://www.flaticon.com/free-icons/clapperboard).
