export default function getRandomKey(collection) {
  let keys = Array.from(collection.keys());
  return keys[Math.floor(Math.random() * keys.length)];
}
