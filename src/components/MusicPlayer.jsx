import { useEffect, useRef, useState } from "react";

export default function MusicPlayer({ audioSrc, available, shouldPlay }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [message, setMessage] = useState(available ? "" : "Lagu belum ditambahkan.");

  async function play() {
    if (!audioRef.current) return;
    try {
      await audioRef.current.play();
      setMessage("");
      setIsPlaying(true);
    } catch {
      setMessage("Sentuh tombol putar untuk mencoba lagi.");
    }
  }

  useEffect(() => {
    if (shouldPlay && available) play();
  }, [shouldPlay, available]);

  function togglePlayback() {
    if (!available || !audioRef.current) return;
    if (audioRef.current.paused) play();
    else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }

  return (
    <aside className={`music-player${shouldPlay ? " music-player--visible" : ""}`} aria-label="Pemutar musik">
      {available && (
        <audio
          ref={audioRef}
          src={audioSrc}
          loop
          preload="none"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onError={() => setMessage("File lagu belum ditemukan. Letakkan file di folder audio undangan.")}
        />
      )}
      <button
        className="music-player__button"
        type="button"
        onClick={togglePlayback}
        disabled={!available}
        aria-pressed={isPlaying}
        aria-label={available ? (isPlaying ? "Jeda musik" : "Putar musik") : "Musik belum tersedia"}
      >
        <span aria-hidden="true">{isPlaying ? "Ⅱ" : "♪"}</span>
      </button>
      <span className="music-player__label">{isPlaying ? "Musik menyertai" : "Musik undangan"}</span>
      {message && <span className="music-player__message" role="status">{message}</span>}
    </aside>
  );
}
