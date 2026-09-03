import { useEffect, useState } from 'react';

import InfoBox from './components/InfoBox.jsx';



export default function App() {

  const [entries, setEntries] = useState([]);

  const [selectedId, setSelectedId] = useState(null);

  const [entry, setEntry] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);



  // Load the index of available entries on mount

  useEffect(() => {

    fetch('/api/entries')

      .then((res) => {

        if (!res.ok) throw new Error(`API error: ${res.status}`);

        return res.json();

      })

      .then((list) => {

        setEntries(list);

        if (list.length > 0) setSelectedId(list[0].id);

      })

      .catch((err) => setError(err.message))

      .finally(() => setLoading(false));

  }, []);



  // Load the full infobox data whenever the selection changes

  useEffect(() => {

    if (!selectedId) return;

    setEntry(null);

    fetch(`/api/entries/${selectedId}`)

      .then((res) => {

        if (!res.ok) throw new Error(`API error: ${res.status}`);

        return res.json();

      })

      .then(setEntry)

      .catch((err) => setError(err.message));

  }, [selectedId]);



  return (

    <div className="page">

      <header className="page-header">

        <h1>Musk Foundation</h1>

        <p className="subtitle">

           .

        </p>

      </header>



      {entries.length > 1 && (

        <nav className="entry-picker">

          {entries.map((e) => (

            <button

              key={e.id}

              className={e.id === selectedId ? 'active' : ''}

              onClick={() => setSelectedId(e.id)}

            >

              {e.title}

            </button>

          ))}

        </nav>

      )}



      <main className="content">

        {loading && <p className="status">Loading…</p>}

        {error && <p className="status error">Couldn't reach the API: {error}</p>}

        {!loading && !error && entry && (

          <div className="article-mock">

            <InfoBox entry={entry} />

            <div className="article-text">

              <p>

               

              </p>

            </div>

          </div>

        )}

      </main>

    </div>

  );

}