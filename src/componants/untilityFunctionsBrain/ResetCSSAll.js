export default function resetCSSAll(nodes) {
  nodes.map((node, nodeIdx) => {
    let htmlLink = document.getElementById(node.id).className;
    if (!htmlLink.includes("start") && !htmlLink.includes("end")) {
      document.getElementById(node.id).className = "item";
    } else if (htmlLink.includes("start")) {
      document.getElementById(node.id).className = "item-start";
    } else if (htmlLink.includes("end")) {
      document.getElementById(node.id).className = "item-end";
    }
  });
}
