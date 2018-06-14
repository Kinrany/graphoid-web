<template>
  <div>
    <a :class="buttonCss(true)" 
       @click.prevent="selectText">
      Текст
    </a>
    <a :class="buttonCss(false)" 
       @click.prevent="selectTable">
      Taблица
    </a>
    <text-editor v-if="asText"></text-editor>
    <matrix-editor v-else></matrix-editor>
  </div>
</template>

<script lang="js">
module.exports = {
  data() {
    return {
      asText: false
    }
  },
  components: {
    "matrix-editor": httpVueLoader("./matrix-editor.vue"),
    "text-editor": httpVueLoader("./text-editor.vue")
  },
  methods: {
    selectText() {
      this.asText = true;
    },
    selectTable() {
      this.asText = false;
    },
    buttonCss(isForText) {
      return [
        'button', 
        'is-small',
        isForText === this.asText ? 'is-focused': ''
      ];
    }
  }
};
</script>