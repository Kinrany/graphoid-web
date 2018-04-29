declare module TextFormat {
  
  function from_graph(graph: GraphFormat.GraphType): string
  function to_graph(text: string): GraphFormat.GraphType
}