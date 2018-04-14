/*
  * {
  *   nodes: [
  *     {
  *       id: 1,
  *       label: '1'
  *     },
  *     {
  *       id: 2,
  *       label: '23'
  *     }
  *   ],
  *   edges: [
  *     {
  *       id: '1-2',
  *       source: 1,
  *       target: 2
  *     }
  *   ],
  *   last_node_index: 2
  * }
*/

var GraphFormat = {
    Node(id) {
        return {
            id: id,
            label: id.toString()
        };
    },

    Edge([s, t]) {
        return {
            data: {
                id: `(${s}-${t})`,
                source: s,
                target: t
            }
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

    delete_nodes(node_id_list) {
        this.nodes = this.nodes
            .filter(node => !node_id_list.includes(node.data.id));

        this.edges = this.edges
            .filter(edge => !node_id_list.includes(edge.data.source))
            .filter(edge => !node_id_list.includes(edge.data.target));
    },

    delete_edges(edge_id_list) {
        this.edges = this.edges
            .filter(edge => !edge_id_list.includes(edge.data.id));
    },

    get_elements() {
        return this.nodes.concat(this.edges);
    }
};