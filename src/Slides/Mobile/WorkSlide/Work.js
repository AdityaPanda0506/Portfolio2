/**
 * Work Component - Mobile version
 * 
 * This component handles:
 * 1. Scroll-based slide navigation
 * 2. Triggering animations when slides change
 * 3. Rendering the appropriate content for each slide
 */

import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import vhCheck from 'vh-check';
import TextContent from './TextContent';
import ImageContent from './ImageContent';

const Container = styled.div`
    display: flex;
    flex-flow: row nowrap;
    /* border: 1px dashed red; */
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
  },
];

const Work = () => {
  // State hooks
  const [slideHeight, setSlideHeight] = useState(0);
  const [slideNumber, setSlideNumber] = useState(0);
  const [lastScrollPosition, setLastScrollPosition] = useState(0);
  const [scrollDirectionDown, setScrollDirectionDown] = useState(true);
  const [refreshToggle, setRefreshToggle] = useState(false); // For triggering animations
  
  // Constants
  const slideHeightMultiplier = 1.3; // Each slide is 130% of viewport height
  
  // Handle scroll event with useCallback for better performance
  const handleScroll = useCallback((event) => {
    // Safety check for event.srcElement
    if (!event || !event.srcElement) {
      console.error('Invalid scroll event or missing srcElement');
      return;
    }
    
    const { body, documentElement } = event.srcElement;
    
    // Get scroll position (cross-browser compatible)
    const currentScrollPosition = Math.max(
      body?.scrollTop || 0, 
      documentElement?.scrollTop || 0
    );
    
    // Track scroll direction
    if (currentScrollPosition > lastScrollPosition) {
      setScrollDirectionDown(true);
    } else {
      setScrollDirectionDown(false);
    }
    
    // Store current scroll position for next comparison
    setLastScrollPosition(currentScrollPosition);
    
    // Calculate current slide index based on scroll position
    // Ensure slideHeight is not zero to avoid division by zero
    const newSlideIndex = slideHeight > 0 ? 
      Math.floor(currentScrollPosition / slideHeight) : 0;
    
    // Ensure newSlideIndex is within valid bounds
    const validSlideIndex = Math.min(
      Math.max(0, newSlideIndex),
      workDetails.length - 1
    );
    
    // Update slide if we're moving to a different valid slide
    const isNewSlide = validSlideIndex !== slideNumber;
    const isValidForward = slideNumber < workDetails.length - 1;
    const isValidBackward = slideNumber > 0;
    
    if (isNewSlide && (isValidForward || isValidBackward)) {
      setSlideNumber(validSlideIndex);
    }
  }, [slideHeight, slideNumber, lastScrollPosition]);
  
  // Setup event listeners and calculate initial slide height
  useEffect(() => {
    // Calculate slide height (130% of viewport height) with vh-check for mobile browsers
    const vhDiff = vhCheck().offset;
    const calculatedHeight = Math.round(
      (window.document.documentElement.clientHeight + vhDiff) * slideHeightMultiplier
    );
    setSlideHeight(calculatedHeight);
    
    // Add scroll event listener with passive option for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial scroll handling to set the correct slide
    handleScroll({ srcElement: document });
    
    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);
  
  // Add effect to trigger animations when slide changes
  useEffect(() => {
    // Make sure slideNumber is valid before triggering animations
    if (slideNumber >= 0 && slideNumber < workDetails.length) {
      // Toggle the refreshToggle state to trigger animations in TextContent
      setRefreshToggle(prev => !prev);
    }
  }, [slideNumber]); // Only run when slideNumber changes
  
  // Render the current slide content
  const renderCurrentSlide = () => {
    // Make sure slideNumber is valid and within bounds
    const safeSlideNumber = Math.min(Math.max(0, slideNumber), workDetails.length - 1);
    const currentProject = workDetails[safeSlideNumber];
    
    // Safety check to ensure currentProject is defined
    if (!currentProject) {
      console.error(`Project at index ${safeSlideNumber} is undefined`);
      return null;
    }
    
    // Pass refreshToggle to trigger animations when slide changes
    return (
      <TextContent
        number={currentProject.number || ''}
        projectName={currentProject.projectName || ''}
        projectDesc={currentProject.projectDesc || ''}
        projectType={currentProject.projectType || ''}
        roles={currentProject.roles || ['']}
        githubLink={currentProject.githubLink || ''}
        liveLink={currentProject.liveLink || ''}
        refreshToggle={refreshToggle} // Pass refreshToggle to trigger GSAP animations
      />
    );
  };
  
  return (
    <Container>
      {renderCurrentSlide()}
      <ImageContent pageSplitTimes={slideHeightMultiplier} />
    </Container>
  );
};

export default Work;
