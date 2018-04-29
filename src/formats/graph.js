var GraphFormat = {

  Node(id) {
    return {
      id: id.toString(),
      label: id.toString()
    };
  },

  Edge([s, t]) {
    return {
      id: `(${s}, ${t})`,
      source: s.toString(),
      target: t.toString()
    };
  },

  Graph(nodes, edges) {
    return {
      last_node_index: nodes.max(),
      nodes: nodes.map(GraphFormat.Node),
      edges: edges.map(GraphFormat.Edge),
    };
  },

  add_node() {
    this.last_node_index += 1;
    let node = GraphFormat.Node(this.last_node_index);
    this.nodes.push(node);
  },

  add_edge(source, target) {
    let edge = GraphFormat.Edge([source, target]);
    this.edges.push(edge);
  },

  delete_nodes(node_id_list) {
    this.nodes = this.nodes
      .filter(node => !node_id_list.includes(node.id));

    this.edges = this.edges
      .filter(edge => !node_id_list.includes(edge.source))
      .filter(edge => !node_id_list.includes(edge.target));
  },

  delete_edges(edge_id_list) {
    this.edges = this.edges
      .filter(edge => !edge_id_list.includes(edge.id));
  }
};