export default function compareAdjacencyList(map1, map2) {
    let array1 = [],
        array2 = [];
    if (map1.size !== map2.size) {
        return false;
    }

    map1.forEach((v, k) => {
        array1.push(v);
    });

    map2.forEach((v, k) => {
        array2.push(v);
    });

    for (let i = 0; i < array1.length; i++) {
        if (array1[i].totalDistance !== array2[i].totalDistance) {
            return false;
        }
    }

    return true;
}
