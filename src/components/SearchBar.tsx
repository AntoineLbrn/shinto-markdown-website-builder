import { useState, useMemo } from "react";
import type { MarkdownVaultFile } from "../lib/astroDataStore";

interface Props {
  resources: MarkdownVaultFile[];
}

export default function Search({ resources }: Props) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return [];

    return resources
      .filter(note =>
        note.name.toLowerCase().includes(q)
      )
      .slice(0, 10);
  }, [query, resources]);

  return (
    <div className="search-input-div">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        autoComplete="off"
        className="search-input"
      />

      {results.length > 0 && (
        <ul className="ul-search-result"
        >
          {results.map(note => {
            // Highlight query in result name
            const q = query.toLowerCase();
            const idx = note.name.toLowerCase().indexOf(q);
            let displayName = note.name;
            if (idx !== -1 && q) {
              displayName = (
                <span>
                  {note.name.slice(0, idx)}
                  <span className="span-search-result">{note.name.slice(idx, idx + q.length)}</span>
                  {note.name.slice(idx + q.length)}
                </span>
              );
            }
            return (
              <li
                className="li-search-result"
                key={note.slug}
                onMouseOver={e => (e.currentTarget.style.background = '#F2EDE3')}
                onMouseOut={e => (e.currentTarget.style.background = 'transparent')}
              >
                <a
                  href={`/resource/${note.slug}`}
                >
                  {displayName}
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}