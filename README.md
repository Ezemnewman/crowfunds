# Infobox App

A small full-stack app that renders a Wikipedia-style "infobox" — like the
Musk Foundation panel in your screenshot — using a **Node.js/Express** API
and a **React (Vite)** frontend.

```
infobox-app/
├── server/          Express API — serves infobox data as JSON
│   ├── index.js
│   └── data/entries.js
└── client/          React app (Vite) — fetches data and renders <InfoBox />
    └── src/
        ├── App.jsx
        ├── components/InfoBox.jsx
        └── index.css
```

## Requirements

- Node.js 18+ and npm (this was built/tested against Node 22)

## 1. Run the API server

```bash
cd server
npm install
npm run dev        # or: npm start
```

This starts Express on **http://localhost:4000**. Check it's up:

```bash
curl http://localhost:4000/api/entries
curl http://localhost:4000/api/entries/musk-foundation
```

## 2. Run the React app

In a second terminal:

```bash
cd client
npm install
npm run dev
```

This starts Vite on **http://localhost:5173**. Open that in your browser —
the page fetches from the API (proxied through Vite, see
`client/vite.config.js`) and renders the infobox.

## How the data flows

1. `server/data/entries.js` holds the infobox content as plain JS objects
   (label/value rows, with support for links, stacked links, and footnoted
   values like `$95 million (2024)[1]`).
2. `server/index.js` exposes a small REST API over that data:
   - `GET /api/entries` — list of `{ id, title }`
   - `GET /api/entries/:id` — full infobox for one entry
   - `POST /api/entries` — add a new infobox `{ id, title, rows }`
   - `PUT /api/entries/:id` — update an entry
   - `DELETE /api/entries/:id` — remove an entry
3. `client/src/App.jsx` fetches from that API and passes the result to
   `client/src/components/InfoBox.jsx`, which renders the label/value table.

## Adding another infobox

POST a new entry to the API, e.g.:

```bash
curl -X POST http://localhost:4000/api/entries \
  -H "Content-Type: application/json" \
  -d '{
    "id": "example-org",
    "title": "Example Org",
    "rows": [
      { "label": "Formation", "type": "text", "value": "1 January 2020" },
      { "label": "Website", "type": "link", "value": { "text": "example.org", "href": "https://example.org", "external": true } }
    ]
  }'
```

Reload the app and it'll appear in the picker at the top (this app keeps
data in memory, so entries reset when the server restarts — swap
`server/data/entries.js` for a real database if you need persistence).

## Production build

```bash
cd client
npm run build      # outputs static files to client/dist
```

Serve `client/dist` with any static host, and point it at a deployed copy
of the `server` (update the API base URL / proxy target accordingly).
