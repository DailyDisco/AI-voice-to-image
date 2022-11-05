import { FC, useState, useMemo } from 'react';
import styles from '../styles/Home.module.css';

const Microphone = ({
  isRecording,
  isBlocked,
  startRecording,
  stopRecording,
  blobURL,
  loading,
  micTranscript,
  handleSubmit,
  audio,
}) => {
  return (
    <div className='live-recording'>
      <p className={styles.description}>
        {' '}
        Use voice input to generate an image.{' '}
      </p>
      {isRecording ? (
        <p className={styles.warning}> Recording in progress... </p>
      ) : (
        <p className={styles.warning}>
          {' '}
          Requires browser microphone permission.{' '}
        </p>
      )}
      {isBlocked ? (
        <p className={styles.blocked}> Microphone access is blocked. </p>
      ) : null}
      <div className={styles.whispercontainer}>
        <div className={styles.allbuttons}>
          <button
            onClick={startRecording}
            disabled={isRecording}
            className={styles.recordbutton}
          >
            Record
          </button>
          <button
            onClick={stopRecording}
            disabled={!isRecording}
            className={styles.stopbutton}
          >
            Stop
          </button>
        </div>

        <div className={styles.audiopreview}>
          <audio src={blobURL} controls='controls' />
        </div>
        <div className={styles.loading}>
          {loading ? (
            <p>Loading... please wait.</p>
          ) : (
            <p>Results: {micTranscript}</p>
          )}
        </div>
        <div className={styles.generatebuttonroot}>
          <button
            type='submit'
            className={styles.generatebutton}
            onClick={handleSubmit}
            disabled={!audio}
          >
            Generate
          </button>
        </div>
      </div>
    </div>
  );
};

export default Microphone;
