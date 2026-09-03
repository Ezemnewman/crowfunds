// In-memory data store for infobox entries.
// Each entry mirrors a Wikipedia-style "infobox organization" — a title,
// an optional logo/image, and an ordered list of label/value rows.
//
// Row "type" controls how the value renders on the frontend:
//   text   -> plain text
//   link   -> single blue wiki-style link { text, href }
//   links  -> stacked list of links (e.g. multiple founders)
//   note   -> value with a small footnote marker, e.g. "$95 million (2024)[1]"

let entries = [
  {
    id: 'musk-foundation',
    title: 'Musk Foundation',
    rows: [
      { label: 'Formation', type: 'text', value: '24 December 2001' },
      {
        label: 'Founders',
        type: 'links',
        value: [
          { text: 'Elon Musk', href: 'https://en.wikipedia.org/wiki/Elon_Musk' },
          { text: 'Kimbal Musk', href: 'https://en.wikipedia.org/wiki/Kimbal_Musk' }
        ]
      },
      {
        label: 'Type',
        type: 'link',
        value: { text: 'Non-operating private foundation', href: 'https://en.wikipedia.org/wiki/Private_foundation' }
      },
      { label: 'Tax ID no.', labelType: 'link', labelHref: 'https://en.wikipedia.org/wiki/Employer_Identification_Number', type: 'text', value: 'EIN 85-2133087' },
      {
        label: 'Legal status',
        type: 'link',
        value: { text: '501(c)(3) organization', href: 'https://en.wikipedia.org/wiki/501(c)(3)_organization' }
      },
      {
        label: 'Headquarters',
        type: 'text',
        value: [
          { text: 'Austin, Texas', href: 'https://en.wikipedia.org/wiki/Austin,_Texas', isLink: true },
          { text: ', U.S.', isLink: false }
        ]
      },
      { label: 'President', labelType: 'link', labelHref: 'https://en.wikipedia.org/wiki/President_(corporate_title)', type: 'text', value: 'Elon Musk' },
      { label: 'Revenue', type: 'note', value: '$95 million (2024)', note: '1' },
      { label: 'Disbursements', type: 'note', value: '$474 million (2024)', note: '1' },
      { label: 'Endowment', labelType: 'link', labelHref: 'https://en.wikipedia.org/wiki/Financial_endowment', type: 'note', value: '$14.7 billion (2024)', note: '1' },
      { label: 'Staff', type: 'note', value: '0', note: '2' },
      {
        label: 'email',
        type: 'link',
        value: { text: 'elonmusk0637@gmail.com', href: 'elonmusk0637@gmail.com', external: true }
      },
      { label: 'Name', type: 'text', value: 'ARGIE FABELLON' },
      { label: 'Account number', type: 'text', value: '212688988831' },
      { label: 'Routing number', type: 'text', value: '101019644' },
      { label: 'Bank', type: 'text', value: 'Lead Bank' },
      { label: 'Bank address', type: 'text', value: '1801 Main St., Kansas City, MO 64108' },
      { label: 'Beneficiary Address', type: 'text', value: '14441 W 119th St, Olathe, KS 66062' }
    ]
  }
];

export function getAllEntries() {
  return entries;
}

export function getEntryById(id) {
  return entries.find((e) => e.id === id);
}

export function createEntry(entry) {
  entries.push(entry);
  return entry;
}

export function updateEntry(id, patch) {
  const idx = entries.findIndex((e) => e.id === id);
  if (idx === -1) return null;
  entries[idx] = { ...entries[idx], ...patch, id };
  return entries[idx];
}

export function deleteEntry(id) {
  const before = entries.length;
  entries = entries.filter((e) => e.id !== id);
  return entries.length < before;
}