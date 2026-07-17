/**
 * NameReveal Component - Animated signature-style writing animation
 */

import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import gsap from 'gsap';

const FONT_SIZES = {
  desktop: 180,  // >= 2560px
  laptopL: 140,  // >= 1440px
  laptop: 130,   // >= 1024px
  tablet: 100    // < 1024px
};

const getFontSizeByBreakpoint = () => {
  const width = window.innerWidth;
  
  if (width >= 2560) return FONT_SIZES.desktop;
  if (width >= 1440) return FONT_SIZES.laptopL;
  if (width >= 1024) return FONT_SIZES.laptop;
  return FONT_SIZES.tablet;
};

const NameReveal = ({ text, fontFamily, timeDelay }) => {
  const containerRef = useRef(null);
  const [reveal, setReveal] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setReveal(true);
    }, timeDelay);
    
    return () => clearTimeout(timer);
  }, [timeDelay]);
  
  useEffect(() => {
    if (!reveal || !containerRef.current) return;
    
    const chars = containerRef.current.querySelectorAll('.char');
    
    gsap.fromTo(chars, 
      { 
        opacity: 0, 
        scale: 0.3, 
        y: 20, 
        rotate: -15 
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        rotate: 0,
        stagger: 0.08,
        duration: 0.8,
        ease: "back.out(1.5)"
      }
    );
  }, [reveal]);

  const fontSize = `${getFontSizeByBreakpoint()}px`;
  const characters = text.split("");

  return (
    <div 
      ref={containerRef}
      style={{
        fontFamily,
        textAlign: 'center',
        fontSize,
        whiteSpace: 'nowrap',
        color: '#333'
      }}
    >
      {characters.map((char, index) => (
        <span 
          key={index} 
          className="char" 
          style={{ 
            display: 'inline-block', 
            opacity: 0,
            transformOrigin: 'bottom center'
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </div>
  );
}

NameReveal.propTypes = {
  text: PropTypes.string.isRequired,
  fontFamily: PropTypes.string,
  timeDelay: PropTypes.number.isRequired,
};

NameReveal.defaultProps = {
  fontFamily: 'Valencia',
};

export default NameReveal;
