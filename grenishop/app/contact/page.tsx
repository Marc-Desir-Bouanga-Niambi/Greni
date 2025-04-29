'use client';

import React, { useState, useRef, useEffect } from 'react';
import Footer from '../components/fin';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Message envoyé :', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center">
      {/* Vidéo de fond */}
      <div className="fixed inset-0 -z-10 bg-transparent">
        <video
          ref={videoRef}
          src="/videos/panda.mp4"
          autoPlay
          muted
          loop
          className="w-full h-full object-cover"
        />
      </div>

      {/* Cadre de formulaire avec style uniformisé */}
      <div className="w-full max-w-xl mx-auto bg-white/70 backdrop-blur-md p-8 rounded-xl shadow-md z-10">
        <h1 className="text-3xl font-bold mb-6 text-center text-black">Nous contacter 📬</h1>

        {submitted ? (
          <p className="text-green-700 font-medium text-center">
            Merci pour votre message ! Nous vous répondrons rapidement.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nom</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                name="message"
                rows={5}
                required
                value={formData.message}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-md p-2"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded"
            >
              Envoyer
            </button>
          </form>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
