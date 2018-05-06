<template>
  <div>
    <matrix-editor></matrix-editor>
    <text-editor style="padding-top: 6px"></text-editor>
  </div>
</template>

<script lang="js">
module.exports = {
  components: {
    "matrix-editor": httpVueLoader("./matrix-editor.vue"),
    "text-editor": httpVueLoader("./text-editor.vue")
  }
};
</script>