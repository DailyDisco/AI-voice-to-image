## What is this?

This is an app that allows you to create an AI image of anything using your voice.

## How to run

### Backend

Make sure that your docker is running and cd into the backend
Run "docker build -t backend ."
Run docker run -p 5000:5000 backend

### Frontend

Open a new terminal and cd into the frontend
run "npm install"
run "npm run dev"

It should now be running, feel free to raise an issue so we can fix it if you run into problems.

## Tools

Python
Next.js
Whisper OpenAI
Stable Diffusion
voice-to-mp3-recorder package
Docker
Flask

## Future Plans

I plan to incorporate img2vid using AI to create voice2vid generations!
The frontend styling will also be improved and maybe start giving it a SASS format

### Add a YouTube2text transcription app using Whisper
