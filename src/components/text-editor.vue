<template>
  <div class="pure-g">
    <textarea v-model="text" 
              :rows="rows" 
              :cols="cols"
              :class="[{'red-background': error}, 'pure-input-1']">
    </textarea>
    <p class="pure-u-1">
        <!-- TODO: grey out if parsing failed -->
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
    },
    parsed() {
      try {
        return TextFormat.to_graph(this.text);
      } catch {
        return null;
      }
    },
    error() {
      return this.parsed === null;
    }
  },
  methods: {
    save() {
      if (!this.error) {
        graph_store.commit("load", this.parsed);
      } else {
        console.error("Can't save invalid graph.");
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

<style scoped>
.red-background {
  background-color: lightpink;
}
</style>