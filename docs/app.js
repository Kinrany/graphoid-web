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
        // TODO: use GraphFormat in app and props
        graph: GraphFormat.Graph(initial_nodes, initial_edges)
    },
    methods: {
        on_add_node: function (event) {
            GraphFormat.add_node.call(this.graph);
        },
        on_deleted_elements: function ({ nodes, edges }) {
            GraphFormat.delete_edges.call(this.graph, edges);
            GraphFormat.delete_nodes.call(this.graph, nodes);
        },
        on_load: function (text) {
            try {
                this.graph = TextFormat.to_graph(text);
            }
            catch (e) {
                console.error(e);
            }
        }
    },
    components: {
        'my-editor': httpVueLoader('components/editor.vue'),
        'my-text-editor': httpVueLoader('components/text-editor.vue'),
        'my-text': httpVueLoader('components/text.vue')
    }
});
