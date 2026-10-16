# Movie Search

A React and TypeScript app for searching movies with the OMDb API. Type a title
to see suggestions, then select a movie to view its details.

## Requirements

- Node.js and npm
- An OMDb API key from [omdbapi.com](https://www.omdbapi.com/)

## Setup

1. Open a terminal in the project folder.
2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a file named `.env` in the project root, next to `package.json`.
4. Add your OMDb key to that file:

   ```env
   VITE_OMDB_API_KEY=your_actual_api_key
   ```

   Replace `your_actual_api_key` with your key. Do not add quotes, share the
   key, or commit `.env`; it is ignored by Git.

## Run locally

Start the development server:

```bash
npm run dev
```

Open the local URL printed in the terminal (usually `http://localhost:5173`).
If you add or change the API key while the server is running, stop and restart
the server.

