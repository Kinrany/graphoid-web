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

const appComponent = httpVueLoader('./src/components/app.vue');

new Vue({
  el: '#app',
  render: (h) => h(appComponent)
});
