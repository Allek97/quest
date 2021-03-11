export default function resetWeights(nodes) {
    nodes.map((node, nodeIdx) => {
        let htmlLink = document.getElementById(node.id).className;
        if (htmlLink.includes("weight") || htmlLink.includes("shortcut")) {
            document.getElementById(node.id).className = "item";
        }
    });
}
