// describe initial graph
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

// cytoscape presentation settings
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

// initialize cytoscape element
const editorDOM = document.getElementById('editor');
const editor = cytoscape({
    container: editorDOM,
    elements: elements(nodes, edges),
    style: style,
    layout: {
        name: 'circle'
    },
    boxSelectionEnabled: true,
    selectionType: 'additive',
    wheelSensitivity: 0.3
});

// initialize undo extension
let undo_redo = editor.undoRedo({undoableDrag: false});
undo_redo.action('delete', delete_eles, restore_eles);

// buttons
document.getElementById('button-delete').addEventListener('click', function () {
    delete_selected();
});
document.getElementById('button-undo').addEventListener('click', function () {
    undo_redo.undo();
});
document.getElementById('button-redo').addEventListener('click', function () {
    undo_redo.redo();
});

// when mouse is over the editor, focus
editor.on('mouseover', () => editorDOM.focus());
editorDOM.focus();

// delete selected on keypress
editorDOM.addEventListener('keydown', function onkeydown(event) {
    if (['Delete', 'Backspace'].includes(event.key)) {
        delete_selected();
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

function delete_selected() {
    let selected = editor.$(':selected');
    let d = selected.connectedEdges().union(selected);
    undo_redo.do('delete', d);
}

function delete_eles(eles) {
    eles.remove();
    return eles;
}

function restore_eles(eles) {
    eles.restore();
    return eles;
}