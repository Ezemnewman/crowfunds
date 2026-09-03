function RowLabel({ row }) {
  if (row.labelType === 'link') {

    return (
      <a className="infobox-label-link" href={row.labelHref} target="_blank" rel="noreferrer">
        {row.label}
      </a>
    );
  }
  return <span>{row.label}</span>;
}

function RowValue({ row }) {
  switch (row.type) {
    case 'link':
      return (
        <a
          className="infobox-link"
          href={row.value.href}
          target="_blank"
          rel="noreferrer"
        >
          {row.value.text}
          {row.value.external ? <span className="ext-icon" aria-hidden="true">↗</span> : null}
        </a>
      );

    case 'links':
      return (
        <div className="infobox-link-stack">
          {row.value.map((item) => (
            <a
              key={item.text}
              className="infobox-link"
              href={item.href}
              target="_blank"
              rel="noreferrer"
            >
              {item.text}
            </a>
          ))}
        </div>
      );

    case 'note':
      return (
        <span>
          {row.value}
          {row.note ? <sup className="infobox-note">[{row.note}]</sup> : null}
        </span>
      );

    case 'text':
    default:
      if (Array.isArray(row.value)) {
        // Mixed text/link segments, e.g. "Austin, Texas, U.S."
        return (
          <span>
            {row.value.map((seg, i) =>
              seg.isLink ? (
                <a key={i} className="infobox-link inline" href={seg.href} target="_blank" rel="noreferrer">
                  {seg.text}
                </a>
              ) : (
                <span key={i}>{seg.text}</span>
              )
            )}
          </span>
        );
      }
      return <span>{row.value}</span>;
  }
}

export default function InfoBox({ entry }) {
  if (!entry) return null;

  return (
    <div className="infobox" style={{ width: '100%', background: '#fff', border: '1px solid #a2a9b1', padding: '16px', boxSizing: 'border-box' }}>
      <div className="infobox-title">{entry.title}</div>
      <table className="infobox-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '1rem' }}>
        <tbody>
          {entry.rows.map((row, idx) => (
            <tr key={idx} className="infobox-row">
              <th className="infobox-th">
                <RowLabel row={row} />
              </th>
              <td className="infobox-td">
                <RowValue row={row} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
