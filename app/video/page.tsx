"use client"

import { useState, useRef } from 'react';

export default function VideoPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-8">
        {/* En-tête */}
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Ma Vidéo
        </h1>

        {/* Container vidéo */}
        <div className="relative max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl bg-gray-800">
          {/* Vidéo */}
          <video
            ref={videoRef}
            className="w-full aspect-video object-cover"
            onClick={togglePlay}
          >
            <source 
              src="/video.mp4" 
              type="video/mp4" 
            />
            Votre navigateur ne supporte pas la lecture de vidéos.
          </video>

          {/* Overlay des contrôles */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
            {/* Bouton play/pause */}
            <button
              onClick={togglePlay}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all duration-300"
            >
              {isPlaying ? (
                <span className="h-4 w-4 border-l-2 border-white ml-1"></span>
              ) : (
                <svg
                  className="w-6 h-6 text-white ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 3l14 9-14 9V3z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Description */}
        <div className="max-w-4xl mx-auto mt-8 p-6 bg-gray-800/50 rounded-xl backdrop-blur-sm">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">
            Titre de la vidéo
          </h2>
          <p className="text-gray-300">
            Description de votre vidéo. Vous pouvez ajouter ici tous les détails pertinents concernant votre contenu vidéo.
          </p>
        </div>
      </div>
    </div>
  );
        }
