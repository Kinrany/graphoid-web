const nodes = [
    '1',
    '2',
    '3',
    '4',
    '5'
];

const edges = [
    ['1', '2'],
    ['2', '3'],
    ['2', '3'],
    ['4', '1'],
    ['1', '5'],
    ['4', '4']
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
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier'
        }
    },
    {
        selector: 'edge:selected',
        style: {
            'line-color': '#000',
            'target-arrow-color': '#000'
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
    selectionType: 'additive',
    wheelSensitivity: 0.3
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