export default function resetCSS(nodes) {
    nodes.map((node, nodeIdx) => {
        let htmlLink = document.getElementById(node.id).className;
        if (
            htmlLink.includes("item-short-path") ||
            htmlLink.includes("item-visited") ||
            htmlLink.includes("revisited")
        ) {
            if (htmlLink.includes("weight")) {
                document.getElementById(node.id).className = "item-weight";
            } else if (htmlLink.includes("start")) {
                document.getElementById(node.id).className = "item-start";
            } else if (htmlLink.includes("end")) {
                document.getElementById(node.id).className = "item-end";
            } else if (htmlLink.includes("shortcut")) {
                document.getElementById(node.id).className = "item-shortcut";
            } else {
                document.getElementById(node.id).className = "item";
            }
        }
    });
}
