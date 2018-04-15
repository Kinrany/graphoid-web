<template>
  <div class="pure-g">
    <textarea v-model="text" class="pure-input-1" :rows="rows" :cols="cols"></textarea>
    <p class="pure-u-1">
        <button @click="save" class="pure-button">Загрузить</button>
    </p>
  </div>
</template>

<script>
module.exports = {
  data: function() {
    return {
      text: ""
    };
  },
  computed: {
    graph() {
      return graph_store.state.graph;
    },
    rows() {
      return this.graph.nodes.length + 1;
    },
    cols() {
      return this.graph.nodes.length;
    }
  },
  methods: {
    save() {
      try {
        let new_graph = TextFormat.to_graph(this.text);
        this.$emit("load", new_graph);
      } catch (e) {
        console.error(e);
      }
    },
    update_text() {
      this.text = TextFormat.from_graph(this.graph);
    }
  },
  mounted() {
    this.update_text();
  },
  watch: {
    graph: {
      handler: function(val, oldVal) {
        this.update_text();
      },
      deep: true
    }
  }
};
</script>
