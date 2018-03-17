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
                <th v-for="node in nodes">
                    {{node.data.id}}
                </th>
            </thead>
            <tr v-for="(line, index) in matrix">
                <td>
                    <b>{{nodes[index].data.id}}</b>
                </td>
                <td v-for="cell in line">
                    {{cell ? 'X' : ' '}}
                </td>
            </tr>
        </table>
        <textarea v-model="text" class="pure-input-1"></textarea>
        <p>
            <button @click="on_load" class="pure-button">Загрузить</button>
        </p>
    </div>
</template>

<script>
module.exports = {
  props: ["graph"],
  data: function() {
    return { text: "" };
  },
  computed: {
    nodes: function() {
      return this.graph.nodes;
    },
    edges: function() {
      return this.graph.edges;
    },
    matrix: function() {
      try {
        const n = this.nodes.length;

        const id_to_column = new Map();
        for (let col = 0; col < n; ++col) {
          let node = this.nodes[col];
          id_to_column[node.data.id] = col;
        }

        const m = [];
        for (let i = 0; i < n; ++i) {
          m[i] = new Array(n);
        }
        for (let edge of this.edges) {
          let { source, target, id } = edge.data;
          let sourceColumn = id_to_column[source];
          let targetColumn = id_to_column[target];
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
    on_load: function() {
      this.$emit("load", this.text);
    }
  }
};
</script>
