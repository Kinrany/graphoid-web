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
    <matrix-editor></matrix-editor>
    <text-editor style="padding-top: 6px"></text-editor>
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
    "matrix-editor": httpVueLoader("./matrix-editor.vue"),
    "text-editor": httpVueLoader("./text-editor.vue")
  }
};
</script>