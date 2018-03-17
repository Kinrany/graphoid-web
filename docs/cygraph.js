function CyNode(id) {
    return {
        data: {
            id: id.toString(),
            label: id.toString()
        },
        position: { x: -1000, y: -1000 }
    };
}

function CyEdge([s, t]) {
    return {
        data: {
            id: `(${s}, ${t})`,
            source: s.toString(),
            target: t.toString()
        }
    };
}

function CyGraph(nodes, edges) {
    return {
        last_node_index: nodes.max(),
        nodes: nodes.map(CyNode),
        edges: edges.map(CyEdge),
    };
}

function add_node() {
    this.last_node_index += 1;
    let node = CyNode(this.last_node_index);
    this.nodes.push(node);
}

function delete_nodes(node_id_list) {
    let new_nodes = this.nodes
        .filter(node => !node_id_list.includes(node.data.id));
    
    let new_edges = this.edges
        .filter(edge => !node_id_list.includes(edge.data.source))
        .filter(edge => !node_id_list.includes(edge.data.target));
    
    this.nodes = new_nodes;
    this.edges = new_edges;
}

function delete_edges(edge_id_list) {
    this.edges = this.edges
        .filter(edge => !edge_id_list.includes(edge.data.id));
}

function get_elements() {
    return this.nodes.concat(this.edges);
}