declare module CyGraphFormat {

  function Node(id: number | string): NodeType
  function Edge(param0: [number | string, number | string]): EdgeType
  function Graph(nodes: Array<number | string>, edges: Array<number | string>): GraphType
  function elements_from_graph(graph: GraphFormat.GraphType): ElementsList

  type NodeType = {
    data: {
      id: string,
      label: string
    },
    position: {
      x: number,
      y: number
    }
  }

  type EdgeType = {
    data: {
      id: string,
      source: string,
      target: string
    }
  }

  type GraphType = {
    nodes: Array<NodeType>,
    edges: Array<EdgeType>
  }

  type ElementsList = Array<NodeType | EdgeType>
}