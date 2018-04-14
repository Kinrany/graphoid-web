/*
  * {
  *   nodes: [
  *     {
  *       data: {
  *         id: '1',
  *         label: '1'
  *       },
  *       position: {
  *         x: 123,
  *         y: 456
  *       }
  *     },
  *     {
  *       data: {
  *         id: '2',
  *         label: '23'
  *       },
  *       position: {
  *         x: 789,
  *         y: 102
  *       }
  *     }
  *   ],
  *   edges: [
  *     {
  *       data: {
  *         id: '(1, 2)',
  *         source: '1',
  *         target: '2'
  *       }
  *     }
  *   ],
  *   last_node_index: 2
  * }
*/

var CyGraphFormat = {

    // id: number || string
    Node(id) {
        return {
            data: {
                id: id.toString(),
                label: id.toString()
            },
            position: { x: -1000, y: -1000 }
        };
    },

    // s: number || string, t: number || string
    Edge([s, t]) {
        return {
            data: {
                id: `(${s}, ${t})`,
                source: s.toString(),
                target: t.toString()
            }
        };
    },

    // nodes: Array<number>, edges: Array<[number, number]>
    Graph(nodes, edges) {
        return {
            last_node_index: nodes.max(),
            nodes: nodes.map(CyGraphFormat.Node),
            edges: edges.map(CyGraphFormat.Edge),
        };
    },

    // this: CyGraphFormat.Graph
    add_node() {
        this.last_node_index += 1;
        let node = CyGraphFormat.Node(this.last_node_index);
        this.nodes.push(node);
    },

    // this: CyGraphFormat.Graph, node_id_list: string[]
    delete_nodes(node_id_list) {
        this.nodes = this.nodes
            .filter(node => !node_id_list.includes(node.data.id));

        this.edges = this.edges
            .filter(edge => !node_id_list.includes(edge.data.source))
            .filter(edge => !node_id_list.includes(edge.data.target));
    },

    // this: CyGraphFormat.Graph, edge_id_list: string[]
    delete_edges(edge_id_list) {
        this.edges = this.edges
            .filter(edge => !edge_id_list.includes(edge.data.id));
    },

    // this: CyGraphFormat.Graph
    get_elements() {
        return this.nodes.concat(this.edges);
    },

    // graph: GraphFormat.Graph
    from_graph(graph) {
        const nodes = graph.nodes.map(({id}) => id);
        const edges = graph.edges.map(({source, target}) => [source, target]);
        return CyGraphFormat.Graph(nodes, edges);
    }
};