import React, { useState, useEffect, useRef } from 'react';
import YouTube from 'react-youtube';

interface DramaticVideoPreviewProps {
  thumbnailSrc: string;
  youtubeVideoId: string;
  previewText: string;
}

export default function DramaticVideoPreview({
  thumbnailSrc,
  youtubeVideoId,
  previewText,
}: DramaticVideoPreviewProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDateReached, setIsDateReached] = useState(false);
  const [youtubeLink, setYoutubeLink] = useState('');
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { days, hours, minutes, seconds } = useCountdown(new Date('2025-01-10'));

  useEffect(() => {
    // Load dramatic sound and video
    audioRef.current = new Audio('public/dramatic-sound1.mp3');

    // Check if the target date has been reached
    if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
      setIsDateReached(true);
    }
  }, [days, hours, minutes, seconds]);

  const handlePlay = () => {
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.play().catch((err) => console.log('Error playing audio:', err));
    }
    if (videoRef.current) {
      videoRef.current.play().catch((err) => console.log('Error playing video:', err));
    }
  };

  const handlePause = () => {
    setIsPlaying(false);
    if (audioRef.current) {
      console.log('Pausing audio...');
      audioRef.current.pause(); // Pause the audio
      audioRef.current.currentTime = 0; // Reset audio time (optional)
    } else {
      console.error('Audio reference not found');
    }
    if (videoRef.current) {
      console.log('Pausing video...');
      videoRef.current.pause(); // Pause the video
    } else {
      console.error('Video reference not found');
    }
  };
  

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYoutubeLink(e.target.value);
  };

  const handleSubmitLink = () => {
    const videoId = youtubeLink.split('v=')[1]?.split('&')[0];
    if (videoId) {
      setYoutubeLink(videoId);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto relative overflow-hidden p-4 md:p-6 lg:p-8">
      <div className="relative aspect-video">
        {/* Local Video */}
        {!isDateReached && !youtubeLink && (
          <video
            ref={videoRef}
            src="public/rythem.mp4"
            muted
            className="w-full h-full object-cover rounded-t-lg"
            poster={thumbnailSrc}
          />
        )}

        {/* Display Thumbnail before play */}
        {!isPlaying && !isDateReached && !youtubeLink && (
          <button
            onClick={handlePlay}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white text-2xl font-semibold py-3 px-5 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110 hover:rotate-12 ring-2 ring-red-400"
          >
            ▶️
          </button>
        )}

        {/* Play/Pause Button for Local Video */}
        {isPlaying && !isDateReached && !youtubeLink && (
          <button
            onClick={handlePause}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white text-2xl font-semibold py-3 px-5 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110 hover:rotate-12 ring-2 ring-red-400"
          >
            ❚❚
          </button>
        )}
      </div>

      {/* YouTube Video Link */}
      {isDateReached && !youtubeLink && (
        <div className="text-center p-4 space-y-4">
          <input
            type="text"
            placeholder="Paste YouTube video URL"
            className="border border-gray-300 p-2 rounded-md w-full max-w-xs"
            value={youtubeLink}
            onChange={handleLinkChange}
          />
          <button
            onClick={handleSubmitLink}
            className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 rounded-full"
          >
            Submit YouTube Link
          </button>
        </div>
      )}

      {/* Play YouTube Video after deadline */}
      {youtubeLink && !isPlaying && (
        <YouTube
          videoId={youtubeLink || youtubeVideoId}
          opts={{
            width: '100%',
            height: '100%',
            playerVars: {
              autoplay: 1,
            },
          }}
        />
      )}

      <div className="p-4 space-y-4">
        <div className="text-2xl font-bold text-center text-gray-800">
          Previews in: {days}d {hours}h {minutes}m {seconds}s
        </div>
        <p className="text-gray-600 line-clamp-3">{previewText}</p>
      </div>
    </div>
  );
}

function useCountdown(targetDate: Date) {
  const calculateTimeLeft = () => {
    const difference = +targetDate - +new Date();
    let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return timeLeft;
}
