<template>
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
</template>

<script lang="js">
// cytoscape presentation settings
const defaultStyle = () => [
  {
    selector: 'node',
    style: {
      'background-color': '#666',
      'label': 'data(id)'
    }
  },
  {
    selector: 'node:selected',
    style: {
      'border-width': '2',
      'border-color': '#000'
    }
  },
  {
    selector: 'edge',
    style: {
      'width': 3,
      'line-color': '#ccc',
      'target-arrow-color': '#ccc',
      'target-arrow-shape': 'triangle',
      'curve-style': 'bezier'
    }
  },
  {
    selector: 'edge:selected',
    style: {
      'line-color': '#000',
      'target-arrow-color': '#000'
    }
  }
];

module.exports = {
  data: () => ({ 
    graphStyle: defaultStyle()
  }),
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