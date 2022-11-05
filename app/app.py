import torch
import os
import replicate
import openai
from dotenv import load_dotenv
import webbrowser
from flask import Flask, abort, request
from flask_cors import CORS
from tempfile import NamedTemporaryFile
import whisper
import gpt3



# model = replicate.models.get("stability-ai/stable-diffusion")
# output_url = model.predict(prompt="electric sheep, neon, synthwave")[0]
# print(output_url)
# webbrowser.open(output_url)

app = Flask(__name__)
CORS(app, supports_credentials=True)

load_dotenv()

replicate.api_key = os.getenv("REPLICATE_API_KEY")

# Check if NVIDIA GPU is available
torch.cuda.is_available()
DEVICE = "cuda" if torch.cuda.is_available() else "cpu"

# Load the Whisper model:
model = whisper.load_model("base", device=DEVICE)

# Load the Replicate model:
replicate = replicate.models.get("stability-ai/stable-diffusion")


@app.route('/whisper_mic', methods=['POST', 'GET'])
def generate_whisper_mp3():
    # print('Hello world!', file=sys.stderr)
    # if not request.files:
    #     # If the user didn't submit any files, return a 400 (Bad Request) error.
    #     abort(400)

    # For each file, let's store the results in a list of dictionaries.
    results = []

    # Loop over every file that the user submitted.
    for filename, handle in request.files.items():
        # Create a temporary file.
        # The location of the temporary file is available in `temp.name`.
        temp = NamedTemporaryFile()
        # Write the user's uploaded file to the temporary file.
        # The file will get deleted when it drops out of scope.
        handle.save(temp)
        # Let's get the transcript of the temporary file.
        result = model.transcribe(temp.name)
        
        text = result['text']
        
        # Replicate Image Generation
        # replicate = replicate.models.get("stability-ai/stable-diffusion")
        output_url = replicate.predict(prompt=text)[0]
        print(output_url)
        webbrowser.open(output_url)

        # # Let's get the summary of the sound file
        # summary = gpt3.gpt3complete(text)
        
        # # Let's make a summary of the first summary
        # secondSummary = codex.codexComplete(summary)
        # Now we can store the result object for this file.
        results.append({
            'filename': filename,
            'transcript': result['text'],
            'output_url': output_url,
            # 'summary': summary.strip(),
            # 'secondSummary': secondSummary.strip(),
        })

    # This will be automatically converted to JSON.
    return {'results': results}