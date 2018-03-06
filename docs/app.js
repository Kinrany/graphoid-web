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

const initial_nodes = [
    '1',
    '2',
    '3',
    '4',
    '5'
];

const initial_edges = [
    ['1', '2'],
    ['2', '3'],
    ['2', '3'],
    ['4', '1'],
    ['1', '5'],
    ['4', '4']
];

Vue.component('my-editor', {
    template: '#editor-template',
    props: ['elements'],
    data: function () {
        return {
            editor: null,
            undo_redo: null
        };
    },
    methods: {
        undo: function undo() {
            this.undo_redo.undo();
        },
        redo: function redo() {
            this.undo_redo.redo();
        },
        delete_selected: function delete_selected() {
            let selected = this.editor.$(':selected');
            if (!selected.empty()) {
                let d = selected.connectedEdges().union(selected);
                this.undo_redo.do('delete', d);
            }
        },
        save_png: function save_png() {
            let png = this.editor.png();
            download(png, 'image.png', 'image/png');
        }
    },
    mounted: function () {
        const editorDOM = this.$el.querySelector('#editor');

        // initialize cytoscape element
        this.editor = cytoscape({
            container: editorDOM,
            elements: this.elements,
            style: style,
            layout: {
                name: 'circle'
            },
            boxSelectionEnabled: true,
            selectionType: 'additive',
            wheelSensitivity: 0.3
        });

        // initialize undo extension
        this.undo_redo = this.editor.undoRedo({ undoableDrag: false });
        this.undo_redo.action('delete', delete_eles, restore_eles);

        // when mouse is over the editor, focus
        this.editor.on('mouseover', () => editorDOM.focus());
        editorDOM.focus();

        // delete selected on keypress
        editorDOM.addEventListener('keydown', (event) => {
            if (['Delete', 'Backspace'].includes(event.key)) {
                this.delete_selected();
            }
        });

        function delete_eles(eles) {
            eles.remove();
            return eles;
        }

        function restore_eles(eles) {
            eles.restore();
            return eles;
        }
    }
});

const app = new Vue({
    el: '#app',
    data: {
        nodes: initial_nodes,
        edges: initial_edges
    },
    computed: {
        cytoscape_elements: function () {
            let nodes = this.nodes.map(function (n) {
                return {
                    data: { id: n }
                };
            });

            let edges = this.edges.map(function ([from, to]) {
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
    }
});
