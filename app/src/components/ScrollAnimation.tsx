import React, { useEffect, useState, useRef } from 'react';
interface ScrollAnimationProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  animation?: 'fade-up' | 'fade-left' | 'fade-right' | 'fade-in' | 'slide-up' | 'zoom-in';
}
export function ScrollAnimation({
  children,
  className = '',
  delay = 0,
  animation = 'fade-up'
}: ScrollAnimationProps) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          setIsVisible(true);
        }, delay);
      }
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [delay]);
  return <div ref={elementRef} className={`transition-all duration-800 ease-out ${isVisible ? `opacity-100 ${getVisibleClasses(animation)}` : `opacity-0 ${getHiddenClasses(animation)}`} ${className}`}>
      {children}
    </div>;
}
function getHiddenClasses(animation: string): string {
  switch (animation) {
    case 'fade-up':
      return 'translate-y-8';
    case 'fade-left':
      return 'translate-x-8';
    case 'fade-right':
      return '-translate-x-8';
    case 'slide-up':
      return 'translate-y-12';
    case 'zoom-in':
      return 'scale-95';
    default:
      return 'translate-y-8';
  }
}
function getVisibleClasses(animation: string): string {
  switch (animation) {
    case 'fade-up':
    case 'fade-left':
    case 'fade-right':
    case 'slide-up':
      return 'translate-x-0 translate-y-0';
    case 'zoom-in':
      return 'scale-100';
    default:
      return 'translate-x-0 translate-y-0';
  }
}