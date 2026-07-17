import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import FinSentinelImages from './ParallaxImages/FinSentinelImages';
import FraudDetectionImages from './ParallaxImages/FraudDetectionImages';
import MultilingualSentimentImages from './ParallaxImages/MultilingualSentimentImages';

const ImageContainer = styled.div`
  /** border: 10px dashed black; */
  margin-left: 50%;
  width: 50%;
  height: 505vh;
  display: flex;
  flex-flow: column nowrap;
`;

const ImageBox = styled.div`
  /** outline: 5px dashed green; */
  margin-top: 40vh;
  height: 100vh;
  position: relative;
`;

const ImageContent = ({ pageSplitTimes }) => {
  // State hooks
  const [viewportHeight, setViewportHeight] = useState(0);
  const [documentHeight, setDocumentHeight] = useState(0);
  const [scrollPercent, setScrollPercent] = useState(0);
  
  // Handle scroll event with useCallback for better performance
  const handleScroll = useCallback(() => {
    const { body, documentElement } = window.document;
    
    // Current scroll position (cross-browser compatible)
    const scrollPosition = Math.max(body.scrollTop, documentElement.scrollTop);
    
    // Calculate scroll percentage (0-100)
    const scrollableDistance = documentElement.scrollHeight - documentElement.clientHeight;
    const currentScrollPercent = (scrollPosition / scrollableDistance * 100);
    
    // Define valid scroll range for this component
    const minScrollLimit = (documentElement.clientHeight * 100) / documentElement.scrollHeight;
    const maxScrollLimit = (documentElement.clientHeight * 630) / documentElement.scrollHeight;
    
    // Only update state if scroll percentage is within our range of interest
    if (currentScrollPercent >= minScrollLimit && currentScrollPercent <= maxScrollLimit) {
      setScrollPercent(currentScrollPercent);
    }
  }, []);
  
  // Setup event listeners and calculate initial dimensions
  useEffect(() => {
    // Get document dimensions once on mount
    const documentHeight = Math.round(window.document.documentElement.scrollHeight);
    const viewportHeight = Math.round(window.document.documentElement.clientHeight);
    
    setDocumentHeight(documentHeight);
    setViewportHeight(viewportHeight);
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);
  
  // Calculate box height
  const boxHeight = pageSplitTimes * 100;
  
  // Project image components in order
  const projectImages = [
    { Component: FinSentinelImages, index: 1 },
    { Component: FraudDetectionImages, index: 2 },
    { Component: MultilingualSentimentImages, index: 3 }
  ];
  
  return (
    <ImageContainer>
      {projectImages.map(({ Component, index }) => (
        <ImageBox key={index} height={boxHeight}>
          <Component
            boxHeight={boxHeight}
            index={index}
            scrollPercent={scrollPercent}
            screenHeight={viewportHeight}
            scrollHeight={documentHeight}
          />
        </ImageBox>
      ))}
    </ImageContainer>
  );
}

ImageContent.propTypes = {
  pageSplitTimes: PropTypes.number.isRequired,
};

export default ImageContent;
