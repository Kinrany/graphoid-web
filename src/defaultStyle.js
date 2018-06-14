// cytoscape presentation style
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