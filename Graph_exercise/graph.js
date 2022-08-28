class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for (let i = 0; i < vertexArray.length; i++) {
      this.addVertex(vertexArray[i]);
    }
    return this;
  }

  // addVertices(vertexArray) {
  //   for (let i in vertexArray) {
  //     this.addVertex(vertexArray[i]);
  //   }
  //   return this;
  // }

  // addVertices(vertexArray) {
  //   vertexArray.forEach(vertex => this.addVertex(vertex));
  // }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    for (let node of this.nodes) {
      node.adjacent.delete(vertex);
    }
    this.nodes.delete(vertex);
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start, seen = new Set(), result = []) {
    seen.add(start); // add the start node to the seen set
    result.push(start.value); // add the start node to the result array
    for (let neighbor of start.adjacent) { // for each neighbor of the start node
      if (!seen.has(neighbor)) { // if the neighbor is not in the seen set
        this.depthFirstSearch(neighbor, seen, result);
      }
    }
    return result;
  }


  // this function returns an array of Node values using BFS

  //https://www.techiedelight.com/breadth-first-search/
  breadthFirstSearch(start, seen = new Set(), result = []) {
    let queue = [start]; // create a queue to hold the nodes to visit
    while (queue.length) { // while the queue has items in it
      let nodes = queue.shift(); // pop the last item off the queue
      if (!seen.has(nodes)) { // if the nodes is not in the seen set
        seen.add(nodes); // add the nodes to the seen set
        result.push(nodes.value); // add nodes to the result array
        for (let neighbor of nodes.adjacent) { // for each neighbor of the nodes in the adjacency list
          if (!seen.has(neighbor)) { // if the neighbor is not in the seen set
            queue.push(neighbor); // add the neighbor to the queue
          }
        }
      }
    }
    return result;
  }
}


module.exports = {
  Graph,
  Node
}