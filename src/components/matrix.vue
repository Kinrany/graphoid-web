<template>
  <div>
    <label>
      <input type="checkbox" class="checkbox" v-model="as_text" />
      {{label_text}}
    </label>
    <text-editor v-if="as_text"></text-editor>
    <matrix-editor v-else></matrix-editor>
  </div>
</template>

<script lang="js">
module.exports = {
  data() {
    return {
      label_text: "как текст"
    }
  },
  computed: {
    label_text() {
      return this.as_text ? "текст" : "таблица";
    }
  },
  components: {
    "matrix-editor": httpVueLoader("./matrix-editor.vue"),
    "text-editor": httpVueLoader("./text-editor.vue")
  }
};
</script>