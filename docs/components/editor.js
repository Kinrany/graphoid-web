Vue.component('my-editor', {
    template: '#editor-template',
    props: ['graph'],
    data: function () {
        return {
            editor: null
        };
    },
    methods: {
        delete_selected: function delete_selected() {
            let selected = this.editor.$(':selected');
            if (selected.empty()) return;

            let edges = selected.filter('edge').map(ele => ele.id());
            let nodes = selected.filter('node').map(ele => ele.id());
            this.$emit('deleted-elements', { edges, nodes });
        },
        save_png: function save_png() {
            let png = this.editor.png();
            download(png, 'image.png', 'image/png');
        },
        on_keydown: function on_keydown(event) {
            if (['Delete', 'Backspace'].includes(event.key)) {
                this.delete_selected();
            }
        },
        load_elements() {
            let local_graph_copy = _.cloneDeep(this.graph);

            this.editor.elements().remove();
            this.editor.add(get_elements.apply(local_graph_copy));
            this.editor.layout({ name: 'circle' }).run();
        }
    },
    mounted: function () {
        const editorDOM = this.$el.querySelector('#editor');

        // initialize cytoscape element
        this.editor = cytoscape({
            container: editorDOM,
            elements: [],
            style: style,
            layout: {
                name: 'circle'
            },
            boxSelectionEnabled: true,
            selectionType: 'additive',
            wheelSensitivity: 0.3
        });

        // when mouse is over the editor, focus
        this.editor.on('mouseover', () => editorDOM.focus());

        this.load_elements();
    },
    watch: {
        graph: {
            deep: true,
            handler: function () {
                this.load_elements();
            },
        }
    }
});
