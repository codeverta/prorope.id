"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const slides = [
  {
    image: "/images/hero/facade-rope-access.webp",
    label: "Perawatan fasad gedung dengan rope access",
  },
  {
    image: "/images/hero/industrial-inspection.webp",
    label: "Inspeksi struktur industri di ketinggian",
  },
  {
    image: "/images/hero/rescue-training.webp",
    label: "Pelatihan rope access dan vertical rescue",
  },
] as const;

const AUTOPLAY_DELAY = 7000;

export function HeroCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isAutoplayStopped, setIsAutoplayStopped] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(true);
  const touchStartX = useRef<number | null>(null);

  const showSlide = useCallback((index: number) => {
    setActiveSlide((index + slides.length) % slides.length);
  }, []);

  const showNext = useCallback(() => {
    setActiveSlide((current) => (current + 1) % slides.length);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setReduceMotion(media.matches);
    const updateVisibility = () => setIsPageVisible(!document.hidden);

    updateMotionPreference();
    updateVisibility();
    media.addEventListener("change", updateMotionPreference);
    document.addEventListener("visibilitychange", updateVisibility);
    return () => {
      media.removeEventListener("change", updateMotionPreference);
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  useEffect(() => {
    if (isPaused || isAutoplayStopped || reduceMotion || !isPageVisible) return;

    const timer = window.setInterval(showNext, AUTOPLAY_DELAY);
    return () => window.clearInterval(timer);
  }, [isAutoplayStopped, isPageVisible, isPaused, reduceMotion, showNext]);

  return (
    <div
      className="hero-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="Layanan Pro Rope Services"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsPaused(false);
      }}
      onTouchStart={(event) => {
        touchStartX.current = event.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        if (touchStartX.current === null) return;
        const distance = event.changedTouches[0].clientX - touchStartX.current;
        touchStartX.current = null;
        if (Math.abs(distance) < 45) return;
        showSlide(activeSlide + (distance < 0 ? 1 : -1));
      }}
    >
      <div className="hero-carousel__viewport" aria-live="off">
        {slides.map((slide, index) => (
          <div
            className={`hero-carousel__slide${index === activeSlide ? " is-active" : ""}`}
            style={{ backgroundImage: `url(${slide.image})` }}
            aria-hidden={index !== activeSlide}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} dari ${slides.length}: ${slide.label}`}
            key={slide.image}
          />
        ))}
      </div>

      <div className="hero-carousel__controls">
        <button type="button" onClick={() => showSlide(activeSlide - 1)} aria-label="Gambar sebelumnya">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
        </button>
        <div className="hero-carousel__dots" aria-label="Pilih gambar">
          {slides.map((slide, index) => (
            <button
              type="button"
              className={index === activeSlide ? "is-active" : ""}
              onClick={() => showSlide(index)}
              aria-label={`Tampilkan gambar ${index + 1}: ${slide.label}`}
              aria-current={index === activeSlide ? "true" : undefined}
              key={slide.image}
            />
          ))}
        </div>
        <span className="hero-carousel__count" aria-hidden="true">0{activeSlide + 1} / 0{slides.length}</span>
        <button
          type="button"
          onClick={() => setIsAutoplayStopped((stopped) => !stopped)}
          aria-label={reduceMotion ? "Autoplay dinonaktifkan oleh preferensi reduced motion" : isAutoplayStopped ? "Putar carousel otomatis" : "Jeda carousel otomatis"}
          aria-pressed={isAutoplayStopped || reduceMotion}
          disabled={reduceMotion}
        >
          {isAutoplayStopped || reduceMotion ? (
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 6 9 6-9 6Z" /></svg>
          ) : (
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6v12M15 6v12" /></svg>
          )}
        </button>
        <button type="button" onClick={() => showSlide(activeSlide + 1)} aria-label="Gambar berikutnya">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>
        </button>
      </div>
    </div>
  );
}
