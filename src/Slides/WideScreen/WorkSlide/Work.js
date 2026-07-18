/**
 * Work Component - Displays work projects with scroll-based navigation
 * 
 * This component handles:
 * 1. Scroll-based navigation between work projects
 * 2. Animation triggers for project content
 * 3. Rendering the appropriate project details based on scroll position
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled from 'styled-components';

// Components
import TextContent from './TextContent';
import ImageContent from './ImageContent';

const Container = styled.div`
    display: flex;
    flex-flow: row nowrap;
    /* border: 10px dashed red;*/
`;

// Project data array - extracted outside the component for cleaner code
const workDetails = [
  {
    number: '',
    projectName: '',
    projectDesc: '',
    projectType: '',
    roles: [''],
    githubLink: '',
    liveLink: ''
  },
  {
    number: '01',
    projectName: 'FinSentinel',
    projectDesc: 'End-to-end ML pipeline analyzing 3M+ news articles using FinBERT for sentiment scoring and XGBoost + LightGBM ensemble. Featuring SHAP explainability and interactive Streamlit backtesting.',
    projectType: 'ML PIPELINE',
    roles: ['ML Pipeline Engineer', 'Sentiment Analyst'],
    githubLink: 'https://github.com/AdityaPanda0506/FinSentinel-RAG-',
    liveLink: 'https://github.com/AdityaPanda0506/FinSentinel-RAG-'
  },
  {
    number: '02',
    projectName: 'CloudGuard',
    projectDesc: 'Serverless data quality platform where S3 uploads trigger AWS Lambda to score datasets in real time, automatically alerting via SNS when quality drops below threshold — cutting manual review time by 40%.',
    projectType: 'CLOUD INFRASTRUCTURE',
    roles: ['Cloud Engineer', 'Backend Developer'],
    githubLink: 'https://github.com/AdityaPanda0506/aws-project',
    liveLink: 'https://github.com/AdityaPanda0506/aws-project'
  },
  {
    number: '03',
    projectName: 'DimABSA',
    projectDesc: 'Novel multilingual aspect-based sentiment architecture preserving emotional geometry in embedding space using contrastive supervision, achieving cluster-level F1 of 0.699.',
    projectType: 'DEEP LEARNING RESEARCH',
    roles: ['ML Researcher', 'PyTorch Developer'],
    githubLink: 'https://github.com/AdityaPanda0506/DimABSA',
    liveLink: 'https://github.com/AdityaPanda0506/DimABSA'
  },
  {
    number: '04',
    projectName: 'SDS Generator',
    projectDesc: 'Full-stack web app that generates Safety Data Sheets from chemical names or SMILES notation, pulling live data from PubChem and ChemSpider APIs to build structured hazard and handling reports in real time.',
    projectType: 'FULL-STACK APP',
    roles: ['Full-Stack Developer', 'API Integration Engineer'],
    githubLink: 'https://msds-frontend.vercel.app/',
    liveLink: 'https://msds-frontend.vercel.app/'
  },
  {
    number: '',
    projectName: '',
    projectDesc: '',
    projectType: '',
    roles: [''],
    githubLink: '',
    liveLink: ''
  }
];

/**
 * Work component - Displays work projects with scroll-based navigation
 */
const Work = () => {
  // Refs for animation elements
  const containerRef = useRef(null);
  
  // State hooks
  const [slideHeight, setSlideHeight] = useState(0);
  const [slideNumber, setSlideNumber] = useState(0);
  const [refreshToggle, setRefreshToggle] = useState(false);
  
  // Constants
  const slideHeightMultiplier = 1.4; // Each slide is 140% of viewport height
  
  /**
   * Handle scroll event with useCallback for better performance
   * Uses GSAP for smoother animation transitions
   */
  const handleScroll = useCallback(() => {
    // Get scroll information
    const { scrollTop, clientHeight } = document.documentElement;
    
    // Calculate current slide index based on scroll position
    const newSlideIndex = Math.floor(scrollTop / slideHeight);
    
    // Update slide if we're moving to a different valid slide
    const isNewSlide = newSlideIndex !== slideNumber;
    const isValidForward = slideNumber < workDetails.length - 1;
    const isValidBackward = slideNumber === workDetails.length - 1 && newSlideIndex < slideNumber;
    
    if (isNewSlide && (isValidForward || isValidBackward)) {
      // Update slide number state
      setSlideNumber(newSlideIndex);
    }
  }, [slideHeight, slideNumber]);
  
  /**
   * Setup event listeners and calculate initial slide height
   */
  useEffect(() => {
    // Calculate slide height (140% of viewport height)
    const calculatedHeight = Math.round(
      window.document.documentElement.clientHeight * slideHeightMultiplier
    );
    setSlideHeight(calculatedHeight);
    
    // Add scroll event listener with passive flag for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener('scroll', handleScroll, { passive: true });
    };
  }, [handleScroll]); // Only re-run if handleScroll changes
  
  /**
   * Effect to trigger animation only when slideNumber changes
   * This toggles the refreshToggle state which is passed to TextContent
   * to trigger animations when the slide changes
   */
  useEffect(() => {
    // Only toggle refreshToggle when slideNumber changes (not on initial mount)
    if (slideNumber > 0) {
      setRefreshToggle(prevState => !prevState);
    }
  }, [slideNumber]); // Only run when slideNumber changes
  
  /**
   * Render the current slide content with animation triggers
   * Uses GSAP animations for smooth transitions between slides
   */
  const renderCurrentSlide = () => {
    const currentProject = workDetails[slideNumber];
    
    // Pass refreshToggle to trigger animations only when slide changes
    return (
      <TextContent
        number={currentProject.number}
        projectName={currentProject.projectName}
        projectDesc={currentProject.projectDesc}
        projectType={currentProject.projectType}
        roles={currentProject.roles}
        githubLink={currentProject.githubLink}
        liveLink={currentProject.liveLink}
        refreshToggle={refreshToggle} // Triggers animations only when slide changes
      />
    );
  };
  
  return (
    <Container ref={containerRef}>
      {renderCurrentSlide()}
      <ImageContent pageSplitTimes={slideHeightMultiplier} />
    </Container>
  );
}

export default Work;
