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

const initial_nodes = [1, 2, 3, 4, 5];
const cy_nodes = initial_nodes.map(cy_node);

const initial_edges = [
    ['1', '2'],
    ['2', '3'],
    ['2', '3'],
    ['4', '1'],
    ['1', '5'],
    ['4', '4']
];
const cy_edges = initial_edges.map(cy_edge);

Vue.component('my-editor', {
    template: '#editor-template',
    props: ['nodes', 'edges'],
    data: function () {
        return {
            editor: null
        };
    },
    computed: {
        elements: function () {
            return Array.concat(this.nodes, this.edges);
        },
        undo_redo: function () {
            if (this.editor) {
                return this.editor.undoRedo({ undoableDrag: false });
            }
            else {
                console.log('editor not initialized');
                return null;
            }
        }
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
            if (selected.empty()) return;

            //let d = selected.connectedEdges().union(selected);
            //this.undo_redo.do('remove', d);
            //console.log(d.filter('node').map(ele => ele.id()));
            let edges = selected.filter('edge').map(ele => ele.id());
            let nodes = selected.filter('node').map(ele => ele.id());
            this.$emit('deleted-elements', { edges, nodes });
        },
        save_png: function save_png() {
            let png = this.editor.png();
            download(png, 'image.png', 'image/png');
        },
        on_keydown: function on_keydown(event) {
            if (['Delete', 'Backspace'].includes(event.key)) {
                this.delete_selected();
            }
        },
        initialize_editor: function initialize_editor() {
            const editorDOM = this.$el.querySelector('#editor');

            // initialize cytoscape element
            this.editor = cytoscape({
                container: editorDOM,
                elements: [],
                style: style,
                layout: {
                    name: 'circle'
                },
                boxSelectionEnabled: true,
                selectionType: 'additive',
                wheelSensitivity: 0.3
            });

            // when mouse is over the editor, focus
            this.editor.on('mouseover', () => editorDOM.focus());
        },
        load_elements() {
            this.editor.elements().remove();
            this.editor.add(this.elements);
            this.editor.layout({ name: 'circle' }).run();
        }
    },
    mounted: function () {
        this.initialize_editor();
        this.load_elements();
    },
    watch: {
        elements: function (newVal, oldVal) {
            this.load_elements();
        }
    }
});

Vue.component('my-text', {
    template: '#text-template',
    props: ['nodes', 'edges']
})

const app = new Vue({
    el: '#app',
    data: {
        nodes: cy_nodes,
        edges: cy_edges
    },
    methods: {
        on_add_node: function (event) {
            let id = this.nodes.length + 1;
            this.nodes.push(cy_node(id));
        },
        on_deleted_elements: function ({ nodes, edges }) {
            let new_nodes = this.nodes
                .filter(node => !nodes.includes(node.data.id));
            let new_edges = this.edges
                .filter(edge => !edges.includes(edge.data.id))
                .filter(edge => !nodes.includes(edge.data.source))
                .filter(edge => !nodes.includes(edge.data.target));
            this.nodes = new_nodes;
            this.edges = new_edges;
        }
    }
});

function cy_node(id) {
    return {
        data: { id: id },
        position: { x: -1000, y: -1000 }
    };
}

function cy_edge([s, t]) {
    return {
        data: {
            id: `(${s}, ${t})`,
            source: s,
            target: t
        }
    };
}