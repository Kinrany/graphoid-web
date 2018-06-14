<template>
  <div>
    <a v-if="show" @click="setShow(false)" class="button is-small">Скрыть</a>
    <a v-if="!show" @click="setShow(true)" class="button is-small">Изменить стиль</a>
    <div v-if="show" class="columns">
      <div class="column is-narrow">
        <textarea v-model="styleJson" rows="40" cols="30"></textarea>
      </div>
      <div class="column is-narrow">
        <a @click="onUpdateStyle" class="button">Обновить стиль</a> <br/>
        <a @click="onResetStyle" class="button">Отменить изменения</a>
      </div>
    </div>
  </div>
</template>

<script lang="js">
module.exports = {
  props: [ 'value' ],
  data: () => ({
    savedStyle: null,
    show: false
  }),
  computed: {
    currentStyle() {
      return { root: this.savedStyle || this.value };
    },
    styleJson: {
      get() {
        return JSON.stringify(this.currentStyle, null, '  ');
      },
      set(json) {
        this.savedStyle = JSON.parse(json).root;
      }
    }
  },
  methods: {
    onUpdateStyle() {
      this.$emit('input', this.currentStyle.root);
      this.savedStyle = null;
    },
    onResetStyle() {
      this.savedStyle = defaultStyle();
      this.onUpdateStyle();
    },
    setShow(show) {
      this.show = show;
    }
  }
};
</script>
