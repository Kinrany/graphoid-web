<template>
  <div>
    <div class="tabs">
      <ul>
        <li :class="textTabCss">
          <a @click.prevent="selectText">
            Текст
          </a>
        </li>
        <li :class="tableTabCss">
          <a @click.prevent="selectTable">
            Taблица
          </a>
        </li>
      </ul>
    </div>
    <text-editor v-if="asText"></text-editor>
    <matrix-editor v-else></matrix-editor>
  </div>
</template>

<script lang="js">
module.exports = {
  components: {
    "matrix-editor": httpVueLoader("./matrix-editor.vue"),
    "text-editor": httpVueLoader("./text-editor.vue")
  },
  data() {
    return {
      asText: false
    }
  },
  computed: {
    textTabCss() {
      return { 'is-active': this.asText };
    },
    tableTabCss() {
      return { 'is-active': !this.asText };
    },
  },
  methods: {
    selectText() {
      this.asText = true;
    },
    selectTable() {
      this.asText = false;
    }
  }
};
</script>