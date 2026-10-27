export const placeCategories = [
  { id: 'all', label: 'All categories' },
  { id: 'academics', label: 'Academics' },
  { id: 'housing', label: 'Housing' },
  { id: 'athletics', label: 'Athletics' },
  { id: 'arts', label: 'Arts & culture' },
  { id: 'campus', label: 'Campus life' },
];

// Some campus-map tags describe a venue rather than its main use. Keep these
// browsing groups separate from the credited story categories.
const housing = new Set(['harvey', 'robart', 'stegner', 'sherwood-house']);
const academics = new Set(['maxey', 'olin']);
const arts = new Set(['dance-studio', 'fouts']);

export function placeCategory(stop) {
  if (housing.has(stop.id) || ['Campus life', 'Residence Halls', 'Interest Houses', 'Sorority & Fraternity Life'].includes(stop.category)) return 'housing';
  if (academics.has(stop.id) || ['Learning & discovery', 'Observatories'].includes(stop.category)) return 'academics';
  if (arts.has(stop.id) || ['Art & campus life', 'Auditoriums'].includes(stop.category)) return 'arts';
  if (['Athletics', 'Sport & everyday sounds'].includes(stop.category)) return 'athletics';
  if (stop.category === 'Academics' && stop.id !== 'glover-alston') return 'academics';
  return 'campus';
}

const normalize = (text) => text.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim();

export function matchesPlace(stop, query = '', category = 'all') {
  const name = normalize(stop.name);
  return (category === 'all' || placeCategory(stop) === category) &&
    normalize(query).split(/\s+/).every((word) => name.includes(word));
}
