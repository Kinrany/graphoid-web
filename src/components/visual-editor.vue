<template>
  <div>
    <div id="editor"
         class="editor"
         tabindex="-1" 
         @keydown="on_keydown"></div>
    <p>
      <button class="button"
              @click="delete_selected()">Удалить</button>
    </p>
    <p>
      <button class="button"
              @click="save_png()">Сохранить изображение</button>
    </p>
  </div>
</template>

<script lang="js">
module.exports = {
  data: function() {
    return {
      editor: null
    };
  },
  props: [ 'graph-style' ],
  computed: {
    graph: function() {
      return graph_store.state.graph;
    }
  },
  methods: {
    delete_selected: function delete_selected() {
      let selected = this.editor.$(":selected");
      if (selected.empty()) return;

      let edges = selected.filter("edge").map(ele => ele.id());
      let nodes = selected.filter("node").map(ele => ele.id());
      graph_store.commit("delete_edges", edges);
      graph_store.commit("delete_nodes", nodes);
    },
    save_png: function save_png() {
      let png = this.editor.png();
      download(png, "image.png", "image/png");
    },
    on_keydown: function on_keydown(event) {
      if (["Delete", "Backspace"].includes(event.key)) {
        this.delete_selected();
      }
    },
    load_elements() {
      const elements = CyGraphFormat.elements_from_graph(this.graph);

      this.editor.elements().remove();
      this.editor.add(elements);
      this.editor.layout({ name: "circle" }).run();
    }
  },
  mounted: function() {
    const editorDOM = this.$el.querySelector("#editor");

    // initialize cytoscape element
    this.editor = cytoscape({
      container: editorDOM,
      elements: [],
      style: this.graphStyle,
      layout: {
        name: "circle"
      },
      boxSelectionEnabled: true,
      selectionType: "additive",
      wheelSensitivity: 0.3
    });

    // when mouse is over the editor, focus
    this.editor.on("mouseover", () => editorDOM.focus());

    this.load_elements();
  },
  watch: {
    graph: {
      deep: true,
      handler: function() {
        this.load_elements();
      }
    },
    graphStyle: {
      deep: true,
      handler(style) {
        this.editor.style(style);
      }
    }
  }
};
</script>

<style scoped>
.editor {
  width: 600px;
  height: 300px;
  border: 1px solid lightgrey;
}
</style>