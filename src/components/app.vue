<template>
<div class="columns">
  <div class="column">
    <visual-editor></visual-editor>
  </div>
  <div class="column">
    <p>
    <button @click="on_add_node"
            class="button">Добавить вершину</button>
    </p>
    <matrix-container></matrix-container>
  </div>
</div>
</template>

<script lang="js">
module.exports = {
  methods: {
    on_add_node: function(event) {
      graph_store.commit("add_node");
    }
  },
  components: {
    "visual-editor": httpVueLoader("./visual-editor.vue"),
    "matrix-container": httpVueLoader("./matrix-container.vue")
  }
};
</script>