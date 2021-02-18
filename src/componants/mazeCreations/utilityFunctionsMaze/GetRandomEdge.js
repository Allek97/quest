export default function getRandomEdge(edgeList) {
  return [
    edgeList[Math.floor(Math.random() * edgeList.length)],
    ,
    Math.floor(Math.random() * edgeList.length),
  ];
}
