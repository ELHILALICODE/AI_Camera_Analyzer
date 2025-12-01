document.addEventListener('DOMContentLoaded', () => {
    const cameraFeed = document.getElementById('camera-feed');

    const analyzeBtn = document.getElementById('analyze-btn');
    const descriptionTextarea = document.getElementById('feed-description');
    const backendUrl = 'http://localhost:3000/api/generate';

    // Access the camera
    async function setupCamera() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            cameraFeed.srcObject = stream;
        } catch (err) {
            console.error("Error accessing the camera: ", err);
            alert("Could not access the camera. Please ensure you have a camera connected and have granted permission.");
        }
    }



    // --- New Functionality ---
    async function analyzeFrame() {
        descriptionTextarea.value = 'Analyzing...';
        analyzeBtn.disabled = true;

        try {
            // Create a canvas to capture a frame
            const canvas = document.createElement('canvas');
            canvas.width = cameraFeed.videoWidth;
            canvas.height = cameraFeed.videoHeight;
            const context = canvas.getContext('2d');
            context.drawImage(cameraFeed, 0, 0, canvas.width, canvas.height);

            // Get the image data as a base64 string
            const imageData = canvas.toDataURL('image/jpeg');

            // Send the image to the backend
            const response = await fetch(backendUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ image: imageData }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            descriptionTextarea.value = result.description;

        } catch (error) {
            console.error("Error analyzing frame:", error);
            descriptionTextarea.value = "Failed to analyze frame. See console for details.";
        } finally {
            analyzeBtn.disabled = false;
        }
    }

    // Event Listeners
    analyzeBtn.addEventListener('click', analyzeFrame);

    // Initial setup
    setupCamera();

});
