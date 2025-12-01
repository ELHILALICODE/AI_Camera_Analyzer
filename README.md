# AI Camera Analyzer

This project is a simple web application that uses your computer's camera to capture an image and analyzes it using Google's Gemini AI. The application consists of a vanilla JavaScript frontend and a Node.js backend.

## Features

- **Real-time Camera Feed**: Displays a live video feed from the user's webcam.
- **Instant Analysis**: Captures a frame from the video feed and sends it for analysis.
- **AI-Powered**: Utilizes the Google Gemini model to generate descriptive text for the captured image.
- **Simple Interface**: Minimalist design for easy interaction.

## Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (uses `navigator.mediaDevices` API).
- **Backend**: Node.js, Express.js.
- **AI Integration**: `@google/generative-ai` library.

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- A Google Cloud API Key with access to Gemini (Generative AI). You can get one from [Google AI Studio](https://aistudio.google.com/).

## Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/ELHILALICODE/AI_Camera_Analyze
cd ai
```

### 2. Backend Setup

Navigate to the `backend` directory and install the dependencies:

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory to store your API key:

```bash
# inside backend/ directory
echo "GOOGLE_API_KEY=your_actual_api_key_here" > .env
```
*Note: Replace `your_actual_api_key_here` with your actual Google API key.*

Start the backend server:

```bash
node server.js
```
The server will start running on `http://localhost:3000`.

### 3. Frontend Setup

The frontend does not require a build process. You can simply open the `index.html` file in your browser.

1. Navigate to the `frontend` folder.
2. Open `index.html` in your preferred web browser (Chrome, Edge, Firefox, etc.).

*Note: For the camera permission to work correctly, you might need to serve the frontend files via a local server (like `http-server` or Live Server extension in VS Code) instead of opening the file directly, although modern browsers usually handle local file camera access with permission prompts.*

## Usage

1. Ensure the backend server is running (`node server.js`).
2. Open the frontend in your browser.
3. Allow the browser to access your camera when prompted.
4. Point your camera at an object or scene.
5. Click the **"Analyze Frame"** button.
6. Wait for a few seconds; the AI's description of the image will appear in the text area below the button.

## Project Structure

```
ai/
├── backend/            # Node.js server
│   ├── .env            # Environment variables (create this)
│   ├── server.js       # Main server file
│   └── package.json    # Backend dependencies
└── frontend/           # Client-side application
    ├── index.html      # Main entry point
    ├── script.js       # Frontend logic (camera & API calls)
    └── styles.css      # Styles
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
