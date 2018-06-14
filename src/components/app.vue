<template>
  <div>
    <div class="columns">
      <div class="column">
        <visual-editor :graph-style="graphStyle"></visual-editor>
      </div>
      <div class="column">
        <p>
        <button @click="on_add_node"
                class="button">Добавить вершину</button>
        </p>
        <matrix-container></matrix-container>
      </div>
    </div>
    <graph-style v-model="graphStyle"></graph-style>
  </div>
</template>

<script lang="js">
module.exports = {
  components: {
    "visual-editor": httpVueLoader("./visual-editor.vue"),
    "matrix-container": httpVueLoader("./matrix-container.vue"),
    "graph-style": httpVueLoader("./graph-style.vue")
  },
  data: () => ({ 
    graphStyle: defaultStyle()
  }),
  methods: {
    on_add_node: function(event) {
      graph_store.commit("add_node");
    }
  }
};
</script>