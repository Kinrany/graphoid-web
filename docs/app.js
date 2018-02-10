const nodes = [
    'a',
    'b',
    'c',
    'd',
    'e'
];

const edges = [
    ['a', 'b'],
    ['b', 'c'],
    ['d', 'a'],
    ['a', 'e']
];

const style = [
    {
        selector: 'node',
        style: {
            'background-color': '#666',
            'label': 'data(id)'
        }
    },
    {
        selector: 'edge',
        style: {
            'width': 3,
            'line-color': '#ccc',
            'target-arrow-color': '#ccc',
            'target-arrow-shape': 'triangle'
        }
    }
];

const editor = cytoscape({
    container: document.getElementById('editor'),
    elements: elements(nodes, edges),
    style: style,
    layout: {
        name: 'circle'
    }
});

// converts nodes ['a', 'b', 'c']
// and edges [['a', 'b'], ['b', 'c']]
// to Cytoscape's element format
function elements(nodes, edges) {
    nodes = nodes.map(function (n) {
        return {
            data: { id: n }
        };
    });

    edges = edges.map(function ([from, to]) {
        return {
            data: {
                id: '' + from + to,
                source: from,
                target: to
            }
        }
    });

    return nodes.concat(edges);
}