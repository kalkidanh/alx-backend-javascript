export default function updateUniqueItems(map) {
  if (!(map instanceof Map)) throw Error('Cannot process');
  for (const list of map.keys()) {
    if (map.get(list) === 1) map.set(list, 100);
  }
  return map;
}
