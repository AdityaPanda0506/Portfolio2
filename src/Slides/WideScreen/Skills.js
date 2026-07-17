/**
 * Skills Component - Displays the Skills section with scroll-based animations
 * 
 * This component creates a parallax-like effect where:
 * 1. The "SKILLS" title moves based on scroll position
 * 2. The skills list remains fixed in position
 */

import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import gsap from 'gsap'; // GreenSock Animation Platform
import device from '../../Assets/Responsive/breakpoints';

const Container = styled.div`
    height: 120vh;/* Since pageSplitTime is 1.4 */
    width:100%;
    /* border: 1px solid blue; */
    position: relative;
    overflow: hidden;
`;

/**
 * Font size configuration for SkillsTitle based on screen sizes
 */
const TITLE_FONT_SIZES = {
  desktop: 350, // >= 2560px
  laptopL: 200, // >= 1440px
  laptop: 180,  // >= 1024px
  tablet: 150   // < 1024px
};

/**
 * Get font size for SkillsTitle based on screen width
 * @returns {string} Font size with px unit
 */
const getTitleFontSize = () => {
  const width = window.innerWidth;
  
  if (width >= 2560) return `${TITLE_FONT_SIZES.desktop}px`;
  if (width >= 1440) return `${TITLE_FONT_SIZES.laptopL}px`;
  if (width >= 1024) return `${TITLE_FONT_SIZES.laptop}px`;
  return `${TITLE_FONT_SIZES.tablet}px`;
};

/**
 * SkillsTitle component - Large title that moves with scroll
 */
const SkillsTitle = styled.div`
  font-family: 'AvenirHeavy';
  position: absolute;
  color: #EEE;
  top: 30%;
  right: -50%;
  font-size: ${getTitleFontSize};
  /* GSAP will handle the transform instead of CSS */
`;

/**
 * Font size configuration for SkillsList based on screen sizes
 */
const LIST_FONT_SIZES = {
  desktop: 65, // >= 2560px
  laptopL: 35, // >= 1440px
  laptop: 30,  // >= 1024px
  tablet: 24   // < 1024px
};

/**
 * Get font size for SkillsList based on screen width
 * @returns {string} Font size with px unit
 */
const getListFontSize = () => {
  const width = window.innerWidth;
  
  if (width >= 2560) return `${LIST_FONT_SIZES.desktop}px`;
  if (width >= 1440) return `${LIST_FONT_SIZES.laptopL}px`;
  if (width >= 1024) return `${LIST_FONT_SIZES.laptop}px`;
  return `${LIST_FONT_SIZES.tablet}px`;
};

/**
 * SkillsList component - List of skills displayed in two columns
 */
const SkillsList = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  font-family: 'AvenirRoman';
  text-align: left;
  margin-left: 15%;
  margin-right: 10%;
  z-index: 1;
  transform: translateY(30%);
  font-size: ${getListFontSize};
`;

/**
 * Skills Component - Displays the Skills section with scroll-based animations
 */
const Skills = () => {
  // Create ref for the title element we'll animate with GSAP
  const titleRef = useRef(null);
  
  /**
   * Scroll multiplier - controls how fast the title moves relative to scroll
   * Higher value = faster movement
   */
  const SCROLL_MULTIPLIER = 10;
  
  /**
   * Handle scroll event - animates the title based on scroll position
   * Uses GSAP for smoother animation with less jank
   */
  const handleScroll = () => {
    // Get scroll information
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    
    // Calculate scroll percentage (0-100)
    let scrollPercent = (scrollTop / (scrollHeight - clientHeight) * 100);
    
    // Calculate scroll limits for this section
    const minLimit = (clientHeight * 530) / scrollHeight;
    const maxLimit = (clientHeight * 760) / scrollHeight;
    
    // Only apply animation within our desired scroll range
    if (scrollPercent >= minLimit && scrollPercent <= maxLimit + 3 && titleRef.current) {
      // Adjust scroll percentage to start from 0 at the min limit
      scrollPercent -= minLimit;
      
      // Use GSAP to animate the title position
      gsap.to(titleRef.current, {
        x: `-${scrollPercent * SCROLL_MULTIPLIER}%`,
        duration: 0.5, // Smooth animation duration
        ease: 'power1.out', // Smooth easing function
        overwrite: 'auto' // Prevents animation queue buildup during rapid scrolling
      });
    }
  };

  // Set up scroll listener when component mounts
  useEffect(() => {
    // Add passive flag for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial position setup
    handleScroll();
    
    // Clean up event listener when component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll, { passive: true });
    };
  }, []);

  return (
    <Container>
      <SkillsTitle ref={titleRef}>SKILLS</SkillsTitle>
      <SkillsList>
        <div>
          <span style={{ color: '#1a73e8', fontWeight: 'bold' }}>Languages & Databases</span>
          <br />
          Python • SQL • Java • C++
          <br />
          MySQL • MongoDB
          <br />
          <br />
          <span style={{ color: '#1a73e8', fontWeight: 'bold' }}>ML & Time Series</span>
          <br />
          XGBoost • LightGBM • Random Forest
          <br />
          Auto ARIMA • TBATS • Forecasting • Feature Engineering
        </div>
        <div>
          <span style={{ color: '#1a73e8', fontWeight: 'bold' }}>Deep Learning & NLP</span>
          <br />
          PyTorch • TensorFlow • HuggingFace
          <br />
          BERT • FinBERT • LLMs • Contrastive Learning
          <br />
          <br />
          <span style={{ color: '#1a73e8', fontWeight: 'bold' }}>Data, Cloud & Tools</span>
          <br />
          GCP (Dataflow, Pub/Sub, BigQuery) • ETL Pipelines
          <br />
          Terraform • GitHub Actions • Streamlit • Flask
        </div>
      </SkillsList>
    </Container>
  );
}

export default Skills;
