function walk(node) {

    let children = {};

    if (node.children) {
        for (const child of node.children) {
            children[child.name] = walk(child);
        }
    }
    else {
        children = node;
        delete children.name;
    }

    return children;
}

module.exports = function (data) {
    return {
        [data.name]: walk(data),
    };
}