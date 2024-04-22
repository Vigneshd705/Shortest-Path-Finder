
        function findShortestPath() {
            const graphInput = document.getElementById('graph').value;
            const graph = JSON.parse(graphInput);

            fetch('/shortest-path', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(graph)
            })
            .then(response => response.json())
            .then(result => {
                document.getElementById('result').innerHTML = '<h3>Shortest Path: ' + result.join(' -> ') + '</h3>';
            })
            .catch(error => console.error('Error:', error));
        }
