import os
from typing import List
import openai
import argparse # if __name__ == "__main__": let's us run the script from the command line
from dotenv import load_dotenv
import re


MAX_INPUT_LENGTH = 128

load_dotenv()

import openai

def gpt3complete(speech):
    # Completion function call engine: text-davinci-002

    Platformresponse = openai.Completion.create(
        engine="text-davinci-002",
        prompt="Create a Python script from the idea of this text: {}".format(speech),
        temperature=0.7,
        max_tokens=1500,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0,
        )

    return Platformresponse.choices[0].text