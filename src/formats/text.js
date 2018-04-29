/*
  * `5
  * 0 0 1 0 1
  * 1 0 1 1 0
  * 1 1 1 0 1
  * 0 1 1 1 0
  * 1 0 0 1 0`
*/

var TextFormat = {

  from_graph(graph) {
    const n = graph.nodes.length;

    const id_to_index = new Map();
    for (let index = 0; index < graph.nodes.length; ++index) {
      let id = graph.nodes[index].id;
      id_to_index[id] = index;
    }

    // NxN matrix filled with zeroes
    const matrix = new Array(n).fill(null).map(a => new Array(n).fill(0));

    for (let { source, target } of graph.edges) {
      let source_id = id_to_index[source];
      let target_id = id_to_index[target];
      matrix[source_id][target_id] = 1;
    }

    return `${n}\n` + matrix.map(line => line.join(' ')).join('\n');
  },

  to_graph(text) {
    const rows = text.trim().split('\n').map(r => r.trim());
    const n = parseInt(rows[0]);
    const matrix = rows.slice(1)
      .map(r => r
        .split(' ')
        .map(x => parseInt(x)));

    if (matrix.length !== n) {
      throw "Invalid matrix size";
    }
    for (let row of matrix) {
      if (row.length !== n) {
        throw "Invalid matrix size";
      }
    }

    const index_to_id = (index) => index + 1;

    const nodes = [];
    for (let i = 0; i < n; ++i) {
      nodes.push(index_to_id(i));
    }

    const edges = [];
    for (let i_r = 0; i_r < n; ++i_r) {
      for (let i_c = 0; i_c < n; ++i_c) {
        if (matrix[i_r][i_c]) {
          let source_id = index_to_id(i_r);
          let target_id = index_to_id(i_c);
          edges.push([source_id, target_id]);
        }
      }
    }

    return GraphFormat.Graph(nodes, edges);
  }
}