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

const graph_store = new Vuex.Store({
    state: {
        graph: GraphFormat.Graph(initial_nodes, initial_edges)
    },
    mutations: {
        add_node(state) {
            GraphFormat.add_node.call(state.graph);
        },
        add_edge(state, { source, target }) {
            GraphFormat.add_edge.call(state.graph, source, target);
        },
        delete_nodes(state, nodes) {
            GraphFormat.delete_nodes.call(state.graph, nodes);
        },
        delete_edges(state, edges) {
            GraphFormat.delete_edges.call(state.graph, edges);
        },
        load(state, new_graph) {
            state.graph = new_graph;
        }
    }
});

const app = new Vue({
    el: '#app',
    methods: {
        on_add_node: function (event) {
            graph_store.commit('add_node');
        }
    },
    components: {
        'visual-editor': httpVueLoader('./src/components/visual-editor.vue'),
        'matrix-editor': httpVueLoader('./src/components/matrix-editor.vue'),
        'text-editor': httpVueLoader('./src/components/text-editor.vue')
    }
});
