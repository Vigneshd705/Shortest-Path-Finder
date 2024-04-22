const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Parse JSON bodies
app.use(bodyParser.json());

// Route to handle AJAX request
app.post('/calculatePath', (req, res) => {
    const { start, destination } = req.body;

    // Calculate the shortest path
    const result = calculateShortestPath(start, destination);

    // Return the result
    res.json(result);
});

// Placeholder function for calculating the shortest path using Dijkstra's algorithm
function calculateShortestPath(start, destination) {
    // Graph representing connections between different locations
    const graph = {
        'A': { 'B': 7, 'C': 9, 'F': 14 },
        'B': { 'A': 7, 'C': 10, 'D': 15 },
        'C': { 'A': 9, 'B': 10, 'D': 11, 'F': 2 },
        'D': { 'B': 15, 'C': 11, 'E': 6 },
        'E': { 'D': 6, 'F': 9 },
        'F': { 'A': 14, 'C': 2, 'E': 9 }
    };

    // Initialize distances to all nodes as Infinity, except start node as 0
    const distances = {};
    for (const node in graph) {
        distances[node] = node === start ? 0 : Infinity;
    }

    // Initialize priority queue with start node and its distance
    const queue = [{ node: start, distance: 0 }];

    // Keep track of the previous node for each node in the shortest path
    const previous = {};

    // Dijkstra's algorithm
    while (queue.length > 0) {
        // Extract node with minimum distance from the priority queue
        const { node, distance } = queue.shift();

        // Iterate over neighbors of the current node
        for (const neighbor in graph[node]) {
            // Calculate the distance to the neighbor through the current node
            const newDistance = distance + graph[node][neighbor];

            // Update the distance if it's shorter than the current distance
            if (newDistance < distances[neighbor]) {
                distances[neighbor] = newDistance;
                previous[neighbor] = node; // Update the previous node
                // Add the neighbor to the priority queue
                queue.push({ node: neighbor, distance: newDistance });
            }
        }
    }

    // Build the shortest path from start to destination
    const shortestPath = [destination];
    let node = destination;
    while (node !== start) {
        node = previous[node];
        shortestPath.unshift(node);
    }

    // Return the shortest distance and path
    return { distance: distances[destination], path: shortestPath.join(' -> ') };
}

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
