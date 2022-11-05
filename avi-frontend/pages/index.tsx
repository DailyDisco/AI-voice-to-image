import React, { useState, useEffect, useMemo } from 'react';
import styles from '../styles/Home.module.css';
import Head from 'next/head';
import Image from 'next/image';
import Microphone from '../components/Microphone';
import MicRecorder from 'mic-recorder-to-mp3';
import Header from '../components/Header';
import AImage from '../components/AImage';

export default function Home() {
  const [micTranscript, setMicTranscript] = useState(null);
  // const [loading, setLoading] = useState(false);
  const [audio, setAudio] = useState();
  const [isRecording, setIsRecording] = useState(false);
  const [blobURL, setBlobURL] = useState('');
  const [isBlocked, setIsBlocked] = useState(false);
  const [replicate, setReplicate] = useState(null);

  const recorder = useMemo(() => new MicRecorder({ bitRate: 128 }), []);

  const startRecording = () => {
    if (isBlocked) {
      console.log('Permission Denied');
      setIsBlocked(true);
    } else {
      recorder
        .start()
        .then(() => {
          setIsRecording(true);
          console.log('recording');
        })
        .catch((e) => console.error(e));
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    console.log('stopped recording');
    recorder
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const file = new File(buffer, 'test.mp3', {
          type: blob.type,
          lastModified: Date.now(),
        });
        setBlobURL(URL.createObjectURL(file));
        // Convert to base64
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
          setAudio(file);
          console.log('audio', audio);
        };
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsRecording(false);
    // setLoading(true);

    const formData = new FormData();
    formData.append('audioUpload', audio);

    console.log('using this file', audio);
    const audioFile = audio;
    console.log('audioFile', audioFile);
    console.log('requesting api');

    fetch('http://127.0.0.1:5000/whisper_mic', {
      method: 'POST',
      headers: {
        // 'Content-Type': 'application/json',
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        return data;
      })
      .then((data) => {
        // loop through the data to turn it into an array
        const arr = Object.keys(data).map((key) => data[key]);
        console.log(arr);
        setMicTranscript(arr[0][0].transcript);
        console.log(micTranscript);
        setReplicate(arr[0][0].output_url);
        console.log(arr[0][0].output_url);
        console.log(replicate);
        // setSummary(arr[0][0].summary);
        // setSecondSummary(arr[0][0].secondSummary);
        // console.log(summary);
        // console.log(secondSummary);
      })
      .then((result) => {
        console.log('Success:', result);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Voice to Image AI Generator' />
      </Head>

      <main className={styles.main}>
        <Header />
        <Microphone
          isRecording={isRecording}
          isBlocked={isBlocked}
          startRecording={startRecording}
          stopRecording={stopRecording}
          blobURL={blobURL}
          micTranscript={micTranscript}
          handleSubmit={handleSubmit}
          audio={audio}
        />
        <AImage replicate={replicate} />
      </main>
    </div>
  );
}
