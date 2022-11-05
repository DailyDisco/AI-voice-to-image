import { FC } from 'react';

interface WhisperProps {
  transcript: any;
  micTranscript: any;
  replicate: any;
}

const Whisper: FC<WhisperProps> = ({ transcript, micTranscript, replicate }) => {
  return (
    <div className='text-output'>
      <h3>Your generated Image</h3>
      <div className='large-box'>
        <iframe src={replicate} height={512} width={512}></iframe>
      </div>
    </div>
  );
};

export default Whisper;