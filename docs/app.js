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
    ['a', 'e'],
    ['d', 'd']
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
        selector: 'node:selected',
        style: {
            'border-width': '2',
            'border-color': '#000'
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
    },
    {
        selector: 'edge:selected',
        style: {
            'line-color': '#000'
        }
    }
];

const editor = cytoscape({
    container: document.getElementById('editor'),
    elements: elements(nodes, edges),
    style: style,
    layout: {
        name: 'circle'
    },
    boxSelectionEnabled: true,
    selectionType: 'additive'
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