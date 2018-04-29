declare module GraphFormat {

  function Node(id: number | string): NodeType
  function Edge(param0: [number | string, number | string]): EdgeType
  function Graph(nodes: Array<number | string>, edges: Array<number | string>): GraphType

  function add_node(this: GraphType): void
  function add_edge(this: GraphType, source: string, target: string): void
  function delete_nodes(this: GraphType, node_id_list: string[]): void
  function delete_edges(this: GraphType, edge_id_list: string[]): void
  function get_elements(this: GraphType): Array<NodeType | EdgeType>

  type NodeType = {
    id: string,
    label: string
  }

  type EdgeType = {
    id: string,
    source: string,
    target: string
  }

  type GraphType = {
    nodes: Array<NodeType>,
    edges: Array<EdgeType>,
    last_node_index: number
  }
}