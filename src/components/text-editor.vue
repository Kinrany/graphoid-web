<template>
  <div>
    <textarea v-model="text" 
              :rows="rows" 
              :cols="cols"
              :class="[{'red-background': error}, 'textarea']">
    </textarea>
    <p>
        <button @click="save" class="button" :disabled="error">Загрузить</button>
    </p>
  </div>
</template>

<script lang="js">
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