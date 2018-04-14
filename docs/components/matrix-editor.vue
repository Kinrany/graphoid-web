<template>
    <div>
        <h3>Текстовое представление</h3>
        <p>
            <button @click="$emit('add-node')" class="pure-button">Добавить вершину</button>
        </p>
        <h4>Матрица смежности</h4>
        <table class="pure-table pure-table-striped">
            <thead>
                <th>из \ в</th>
                <th v-for="node in nodes" :key="node.id">
                    {{node.id}}
                </th>
            </thead>
            <tr v-for="(line, row) in matrix" :key="row">
                <td>
                    <b>{{nodes[row].id}}</b>
                </td>
                <td v-for="(cell, col) in line" :key="col" @click="toggle_edge(row, col)">
                    {{cell ? 'X' : ' '}}
                </td>
            </tr>
        </table>
        <slot></slot>
    </div>
</template>

<script>
module.exports = {
  props: ["graph"],
  computed: {
    nodes: function() {
      return this.graph.nodes;
    },
    edges: function() {
      return this.graph.edges;
    },
    id_to_index: function() {
      const n = this.nodes.length;

      const id_to_index = new Map();
      for (let col = 0; col < n; ++col) {
        let node = this.nodes[col];
        id_to_index[node.id] = col;
      }
      return id_to_index;
    },
    matrix: function() {
      try {
        const n = this.nodes.length;

        const m = [];
        for (let i = 0; i < n; ++i) {
          m[i] = new Array(n);
        }
        for (let edge of this.edges) {
          let { source, target, id } = edge;
          let sourceColumn = this.id_to_index[source];
          let targetColumn = this.id_to_index[target];
          m[sourceColumn][targetColumn] = id;
        }

        return m;
      } catch (e) {
        console.error("Failed to create a matrix");
        console.error(e);
        return [[]];
      }
    }
  },
  methods: {
    index_to_id(index) {
      return this.graph.nodes[index].id;
    },
    toggle_edge(row, col) {
      console.log("delete edge");
      let source = this.index_to_id(row);
      let target = this.index_to_id(col);
      if (this.matrix[row][col]) {
        let edge = this.graph.edges
          .filter(e => e.source == source)
          .find(e => e.target == target).id;
        console.assert(edge !== undefined);
        this.$emit("deleted-elements", { nodes: [], edges: [edge] });
      } else {
        this.$emit("add-edge", { source, target });
      }
    }
  }
};
</script>
