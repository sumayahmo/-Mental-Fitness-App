// Function to handle form submission
document.getElementById("moodForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    
    const mood = document.getElementById("mood").value;
    
    // Send mood data to the backend
    const response = await fetch('http://127.0.0.1:5000/track_mood', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ mood: mood })
    });
    
    if (response.ok) {
        alert('مرحبًا [Your Name]، تم تتبع المزاج بنجاح!');
        fetchMoodHistory();  // Refresh the mood history
    } else {
        alert('فشل في تتبع المزاج.');
    }
});

// Function to fetch and display mood history
async function fetchMoodHistory() {
    const response = await fetch('http://127.0.0.1:5000/get_mood_history');
    const moodHistory = await response.json();
    
    const historyList = document.getElementById("moodHistory");
    historyList.innerHTML = '';  // Clear previous list
    
    moodHistory.forEach(item => {
        const listItem = document.createElement("li");
        listItem.textContent = `${item.timestamp}: ${item.mood}`;
        historyList.appendChild(listItem);
    });
}

// Load mood history on page load
window.onload = fetchMoodHistory;
