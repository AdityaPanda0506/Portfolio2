import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Card = styled.div`
  transition: transform 0.2s ease-out;
  position: absolute;
  width: 320px;
  height: 200px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  box-shadow: 0 10px 30px 0 rgba(0, 0, 0, 0.3);
  color: #333;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  font-family: 'AvenirMedium';
  padding: 20px;
  text-align: center;
  
  h4 {
    margin: 0 0 8px 0;
    font-family: 'AvenirHeavy';
    color: #ea4335;
    font-size: 18px;
  }
  
  span {
    font-size: 14px;
    color: #555;
  }
  
  .star {
    font-size: 28px;
    color: #4285f4;
    margin-bottom: 5px;
  }
`;

const Layer1 = styled(Card).attrs(({ $scroll }) => ({
  style: {
    transform: `translate(0px,-${($scroll) * 15}%)`,
  },
}))`
  bottom: -90vh;
  left: 2vw;
  z-index: 4;
`;

const Layer2 = styled(Card).attrs(({ $scroll }) => ({
  style: {
    transform: `translate(0px,-${($scroll) * 8}%) scale(0.9)`,
  },
}))`
  bottom: -45vh;
  right: 2vw;
  filter: blur(0.6px);
  z-index: 3;
`;

const Layer3 = styled(Card).attrs(({ $scroll }) => ({
  style: {
    transform: `translate(0px,-${($scroll) * 5}%) scale(0.75)`,
  },
}))`
  bottom: -75vh;
  left: 4vw;
  filter: blur(0.8px);
  z-index: 2;
`;

const Layer4 = styled(Card).attrs(({ $scroll }) => ({
  style: {
    transform: `translate(0px,-${($scroll) * 2}%) scale(0.65)`,
  },
}))`
  bottom: -55vh;
  right: 4vw;
  filter: blur(1.2px);
  z-index: 1;
`;

const MultilingualSentimentImages = ({ scrollPercent: initialScrollPercent, boxHeight, index, scrollHeight, screenHeight }) => {
  // Calculate adjusted scroll percentage
  const heighttoBeReducedinVH = ((boxHeight * index) - 100);
  const scrollOffset = (screenHeight * heighttoBeReducedinVH) / 100;
  const scrollOffsetInPercent = (scrollOffset * 100 / scrollHeight) + index - 1;
  const scrollPercent = initialScrollPercent - scrollOffsetInPercent;

  return (
    <>
      <Layer4 $scroll={scrollPercent}>
        <div className="star">*</div>
        <h4>Contrastive Loss</h4>
        <span>Supervised Geometry Alignment</span>
      </Layer4>
      <Layer3 $scroll={scrollPercent}>
        <div className="star">*</div>
        <h4>PyTorch & Transformers</h4>
        <span>Multilingual Sentiment Models</span>
      </Layer3>
      <Layer2 $scroll={scrollPercent}>
        <div className="star">*</div>
        <h4>Embedding Space</h4>
        <span>Emotional Geometry Preservation</span>
      </Layer2>
      <Layer1 $scroll={scrollPercent}>
        <div className="star">*</div>
        <h4>F1 Metric Evaluation</h4>
        <span>0.699 F1 Aspect-Sentiment Cluster</span>
      </Layer1>
    </>
  );
}

MultilingualSentimentImages.propTypes = {
  boxHeight: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  screenHeight: PropTypes.number.isRequired,
  scrollHeight: PropTypes.number.isRequired,
  scrollPercent: PropTypes.number.isRequired,
};

export default MultilingualSentimentImages;
