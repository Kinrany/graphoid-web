<template>
<div class="pure-g">
  <div class="pure-u-1 pure-u-xl-1-2">
    <visual-editor></visual-editor>
  </div>
  <div class="pure-u-1 pure-u-xl-1-2">
    <p>
    <button @click="on_add_node"
            class="pure-button">Добавить вершину</button>
    </p>
    <matrix-editor></matrix-editor>
    <text-editor style="padding-top: 6px"></text-editor>
  </div>
</div>
</template>

<script>
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