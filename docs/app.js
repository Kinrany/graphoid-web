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

const initial_edges = [
    [1, 2],
    [2, 3],
    [2, 3],
    [4, 1],
    [1, 5],
    [4, 4]
];

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
            return this.nodes.concat(this.edges);
        }
    },
    methods: {
        delete_selected: function delete_selected() {
            let selected = this.editor.$(':selected');
            if (selected.empty()) return;

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
        load_elements() {
            this.editor.elements().remove();
            this.editor.add(this.elements);
            this.editor.layout({ name: 'circle' }).run();
        }
    },
    mounted: function () {
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
    props: ['nodes', 'edges'],
    computed: {
        matrix: function () {
            try {
                const n = this.nodes.length;

                const id_to_index = new Map();
                for (let i in this.nodes) {
                    id_to_index[this.nodes[i].data.id] = i;
                }

                const m = [];
                for (let i = 0; i < n; ++i) {
                    m[i] = new Array(n);
                }
                for (let edge of this.edges) {
                    let { source, target, id } = edge.data;
                    sourceIndex = id_to_index[parseInt(source)];
                    targetIndex = id_to_index[parseInt(target)];
                    m[sourceIndex][targetIndex] = id;
                }
                return m;
            }
            catch (e) {
                console.error('Failed to create a matrix');
                console.error(e);
                return [[]];
            }
        }
    }
})

const app = new Vue({
    el: '#app',
    data: {
        nodes: initial_nodes.map(cy_node),
        edges: initial_edges.map(cy_edge)
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
        data: { id: id.toString() },
        position: { x: -1000, y: -1000 }
    };
}

function cy_edge([s, t]) {
    return {
        data: {
            id: `(${s}, ${t})`,
            source: s.toString(),
            target: t.toString()
        }
    };
}