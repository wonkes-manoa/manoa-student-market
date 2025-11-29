'use client';

import React, { useEffect, useRef, type ReactNode } from 'react';

type RevealOnScrollProps = {
  children: ReactNode;
  className: string | undefined;
  delay: string | undefined;
};

export default function RevealOnScroll({
  children,
  className = '',
  delay = '0s',
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            node.style.setProperty('--delay', delay);
            node.classList.add('visible');

            // 🔥 FIX: Make sure the card becomes visible immediately
            node.style.opacity = '1';

            observer.unobserve(node);
          }
        });
      },
      { threshold: 0.1 }, // LOWER threshold = actually fires
    );

    observer.observe(node);

    const cleanup = () => {
      observer.disconnect();
    };

    return cleanup;
  }, [delay]);

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}
