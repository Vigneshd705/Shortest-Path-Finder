document.getElementById('pathForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const start = document.getElementById('start').value;
    const destination = document.getElementById('destination').value;

    // Make an AJAX request to the backend to calculate the shortest path
    fetch('/calculatePath', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ start, destination })
    })
    .then(response => response.json())
    .then(data => {
        // Display the shortest path and distance returned by the backend
        document.getElementById('result').textContent = `Shortest path from ${start} to ${destination} is ${data.path} with distance ${data.distance}`;
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
