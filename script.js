// Function to fetch a random joke from the API
async function getJoke() {
    const jokeText = document.getElementById('jokeText');
    const btn = event.target;
    
    // Show loading state
    jokeText.innerHTML = '<span class="loading"></span> Loading joke...';
    btn.disabled = true;
    
    try {
        // Using JokeAPI - a free API for jokes
        const response = await fetch('https://v2.jokeapi.dev/joke/Any?type=single');
        
        if (!response.ok) {
            throw new Error('Failed to fetch joke');
        }
        
        const data = await response.json();
        
        // Display the joke
        if (data.type === 'single') {
            jokeText.textContent = data.joke;
        } else if (data.type === 'twopart') {
            jokeText.textContent = `${data.setup}\n\n${data.delivery}`;
        }
        
    } catch (error) {
        console.error('Error:', error);
        jokeText.textContent = '😅 Oops! Could not load a joke. Please try again!';
    } finally {
        btn.disabled = false;
    }
}

// Function to copy the joke to clipboard
function copyJoke() {
    const jokeText = document.getElementById('jokeText').textContent;
    
    if (jokeText === 'Click the button to load a joke...') {
        alert('Please get a joke first!');
        return;
    }
    
    // Copy to clipboard
    navigator.clipboard.writeText(jokeText).then(() => {
        // Show feedback
        const btn = event.target;
        const originalText = btn.textContent;
        btn.textContent = '✓ Copied!';
        
        setTimeout(() => {
            btn.textContent = originalText;
        }, 2000);
    }).catch(err => {
        alert('Failed to copy joke');
        console.error('Error:', err);
    });
}

// Load a joke when the page loads
window.addEventListener('load', () => {
    getJoke();
});
