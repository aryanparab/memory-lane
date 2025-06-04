'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import {themes} from '../components/themes';
import JourneyContent from '../components/JourneyContent';
import Story from './Story';

export default function JourneyViewer() {
  const { id } = useParams();
  const [journey, setJourney] = useState(null);
  const [page, setPage] = useState(0);
  const [musicMuted, setMusicMuted] = useState(false);
  const [selectedMusic, setSelectedMusic] = useState('romantic');
  const [isStoryMode, setIsStoryMode] = useState(true);
  const audioRef = useRef(null);
  const hasInteracted = useRef(false);

  const toggleMute = () => {
  if (audioRef.current) {
    if (musicMuted) {
      audioRef.current.play().catch(err => console.error('Audio play failed', err));
    } else {
      audioRef.current.pause();
    }
    setMusicMuted(!musicMuted);
  }
};

  useEffect(() => {
    if (!id) return;
    const fetchJourney = async () => {
      try {
        const res = await fetch(`/api/journeys/${id}`);
        if (!res.ok) {
          console.error('Failed to fetch journey', res.status);
          setJourney({ error: 'Journey not found' });
          return;
        }
        const data = await res.json();
        setJourney(data);
        setSelectedMusic(data.theme || 'romantic');
        setPage(0);
      } catch (error) {
        console.error('Error fetching journey:', error);
        setJourney({ error: 'Error fetching journey' });
      }
    };
    fetchJourney();
  }, [id]);

  useEffect(() => {
    if (journey && audioRef.current) {
      const audio = audioRef.current;
      audio.volume = 0.5;
      audio.muted = musicMuted;

      const tryPlay = () => {
        audio
          .play()
          .then(() => (hasInteracted.current = true))
          .catch(() => {
            const resumeAudio = () => {
              if (!hasInteracted.current) {
                audio.play().catch(err => console.error('Failed to resume audio', err));
                hasInteracted.current = true;
              }
              window.removeEventListener('click', resumeAudio);
              window.removeEventListener('keydown', resumeAudio);
              window.removeEventListener('scroll', resumeAudio);
            };
            window.addEventListener('click', resumeAudio);
            window.addEventListener('keydown', resumeAudio);
            window.addEventListener('scroll', resumeAudio);
          });
      };

      tryPlay();
    }
  }, [journey]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = musicMuted;
    }
  }, [musicMuted]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  if (journey === null) return <div>Loading Journey...</div>;
  if (journey.error) return <div className="text-center text-red-600 mt-8">{journey.error}</div>;

  const theme = themes[journey.theme] || themes.romantic;

  return (
    <div>
      <audio ref={audioRef} loop preload="auto" src={`/music/${selectedMusic}.mp3`} />

      {/* <div style={{ textAlign: 'right', margin: '20px' }}>
        <button onClick={() => setIsStoryMode(!isStoryMode)}>
          {isStoryMode ? 'Exit Story Mode' : 'Enter Story Mode'}
        </button>
      </div> */}

      {isStoryMode ? (
        <Story 
        
        journey={journey}
          theme={theme}
          page={page}
          setPage={setPage}
          musicMuted={musicMuted}
          toggleMute={toggleMute}
          audioRef={audioRef}
          selectedMusic={selectedMusic}
        
        onEnd={() => setIsStoryMode(false)} />
      ) : (
        <JourneyContent
          journey={journey}
          theme={theme}
          page={page}
          setPage={setPage}
          musicMuted={musicMuted}
          toggleMute={toggleMute}
          audioRef={audioRef}
          selectedMusic={selectedMusic}
        />
      )}
    </div>
  );
}
