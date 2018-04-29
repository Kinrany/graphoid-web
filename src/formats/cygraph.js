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
  *   ]
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
            nodes: nodes.map(CyGraphFormat.Node),
            edges: edges.map(CyGraphFormat.Edge),
        };
    },

    // graph: GraphFormat.Graph
    // returns: (CyGraphFormat.Node | CyGraphFormat.Edge)[]
    elements_from_graph(graph) {
        const nodes = graph.nodes.map(({ id }) => CyGraphFormat.Node(id));
        const edges = graph.edges.map(({ source, target }) => CyGraphFormat.Edge([source, target]));
        return nodes.concat(edges);
    },
};