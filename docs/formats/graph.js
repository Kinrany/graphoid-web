/*
  * {
  *   nodes: [
  *     {
  *       id: '1',
  *       label: '1'
  *     },
  *     {
  *       id: '2',
  *       label: '23'
  *     }
  *   ],
  *   edges: [
  *     {
  *       id: '1-2',
  *       source: '1',
  *       target: '2'
  *     }
  *   ],
  *   last_node_index: 2
  * }
*/

var GraphFormat = {

    // id: number || string
    Node(id) {
        return {
            id: id.toString(),
            label: id.toString()
        };
    },

    // s: number || string, t: number || string
    Edge([s, t]) {
        return {
            id: `(${s}, ${t})`,
            source: s.toString(),
            target: t.toString()
        };
    },

    // nodes: Array<number>, edges: Array<[number, number]>
    Graph(nodes, edges) {
        return {
            last_node_index: nodes.max(),
            nodes: nodes.map(GraphFormat.Node),
            edges: edges.map(GraphFormat.Edge),
        };
    },

    // this: GraphFormat.Graph
    add_node() {
        this.last_node_index += 1;
        let node = GraphFormat.Node(this.last_node_index);
        this.nodes.push(node);
    },

    // this: GraphFormat.Graph, node_id_list: string[]
    delete_nodes(node_id_list) {
        this.nodes = this.nodes
            .filter(node => !node_id_list.includes(node.id));

        this.edges = this.edges
            .filter(edge => !node_id_list.includes(edge.source))
            .filter(edge => !node_id_list.includes(edge.target));
    },

    // this: GraphFormat.Graph, edge_id_list: string[]
    delete_edges(edge_id_list) {
        console.log(edge_id_list);
        this.edges = this.edges
            .filter(edge => !edge_id_list.includes(edge.id));
    },

    get_elements() {
        return this.nodes.concat(this.edges);
    }
};