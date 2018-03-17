Vue.component('my-text', {
    template: '#text-template',
    props: ['graph'],
    computed: {
        nodes: function () {
            return this.graph.nodes;
        },
        edges: function () {
            return this.graph.edges;
        },
        matrix: function () {
            try {
                const n = this.nodes.length;

                const id_to_column = new Map();
                for (let col = 0; col < n; ++col) {
                    let node = this.nodes[col];
                    id_to_column[node.data.id] = col;
                }

                const m = [];
                for (let i = 0; i < n; ++i) {
                    m[i] = new Array(n);
                }
                for (let edge of this.edges) {
                    let { source, target, id } = edge.data;
                    let sourceColumn = id_to_column[source];
                    let targetColumn = id_to_column[target];
                    m[sourceColumn][targetColumn] = id;
                }

                return m;
            }
            catch (e) {
                console.error('Failed to create a matrix');
                console.error(e);
                return [[]];
            }
        }
    }
});
