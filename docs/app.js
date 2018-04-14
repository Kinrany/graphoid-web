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

const app = new Vue({
    el: '#app',
    data: {
        graph: GraphFormat.Graph(initial_nodes, initial_edges)
    },
    methods: {
        on_add_node: function (event) {
            GraphFormat.add_node.call(this.graph);
        },
        on_add_edge: function ({source, target}) {
            GraphFormat.add_edge.call(this.graph, source, target);
        },
        on_deleted_elements: function ({ nodes, edges }) {
            GraphFormat.delete_edges.call(this.graph, edges);
            GraphFormat.delete_nodes.call(this.graph, nodes);
        },
        on_load: function (new_graph) {
            this.graph = new_graph;
        }
    },
    components: {
        'visual-editor': httpVueLoader('components/visual-editor.vue'),
        'matrix-editor': httpVueLoader('components/matrix-editor.vue'),
        'text-editor': httpVueLoader('components/text-editor.vue')
    }
});
