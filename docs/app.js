// network data
const nodes = new vis.DataSet([
    { id: 1, label: '1' },
    { id: 2, label: '2' },
    { id: 3, label: '3' },
    { id: 4, label: '4' },
]);

const edges = new vis.DataSet([
    { from: 1, to: 2 },
    { from: 1, to: 3 },
    { from: 3, to: 4 },
    { from: 4, to: 2 },
]);


// vis Network initialization
const container = document.getElementById('network');

const data = {
    nodes: nodes,
    edges: edges
};

const options = {};

const network = new vis.Network(container, data, options);