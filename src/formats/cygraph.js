var CyGraphFormat = {

  Node(id) {
    return {
      data: {
        id: id.toString(),
        label: id.toString()
      },
      position: { x: -1000, y: -1000 }
    };
  },

  Edge([s, t]) {
    return {
      data: {
        id: `(${s}, ${t})`,
        source: s.toString(),
        target: t.toString()
      }
    };
  },

  Graph(nodes, edges) {
    return {
      nodes: nodes.map(CyGraphFormat.Node),
      edges: edges.map(CyGraphFormat.Edge),
    };
  },

  elements_from_graph(graph) {
    const nodes = graph.nodes.map(({ id }) => CyGraphFormat.Node(id));
    const edges = graph.edges.map(({ source, target }) => CyGraphFormat.Edge([source, target]));
    return nodes.concat(edges);
  },
};