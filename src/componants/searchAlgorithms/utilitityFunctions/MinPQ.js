export default function minPQ(priorityQ) {
  // Fonction qui retourne la plus petite distance encontré dans la hashMap
  // priorityQ hashMap

  let min = Infinity;
  let minNode = [];

  priorityQ.forEach((value, key) => {
    if (value < min) {
      min = value;
      minNode.push(key);
    }
  });

  return minNode.pop();
}
