export default function animateShortestPath(shortPath, speed) {
    let i = 1;
    shortPath.forEach((node) => {
        i++;
        const htmlLink = document.getElementById(node.id).className;
        //console.log("short path : " + htmlLink);
        setTimeout(() => {
            if (htmlLink.includes("weight")) {
                document.getElementById(node.id).className =
                    "item-short-path weight";
            } else if (htmlLink.includes("start")) {
                document.getElementById(node.id).className =
                    "item-short-path start";
            } else if (htmlLink.includes("end")) {
                document.getElementById(node.id).className =
                    "item-short-path end";
            } else if (htmlLink.includes("shortcut")) {
                document.getElementById(node.id).className =
                    "item-short-path shortcut";
            } else {
                document.getElementById(node.id).className = "item-short-path";
            }
        }, speed * i);
    });
    return i;
}
