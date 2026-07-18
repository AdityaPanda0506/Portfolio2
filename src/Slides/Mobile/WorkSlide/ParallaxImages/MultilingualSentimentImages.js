import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Card = styled.div`
  transition: transform 0.2s ease-out;
  position: absolute;
  width: 150px;
  height: 110px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.3);
  color: #333;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  font-family: 'AvenirMedium';
  padding: 10px;
  text-align: center;
  
  h4 {
    margin: 0 0 4px 0;
    font-family: 'AvenirHeavy';
    color: #000;
    font-size: 11px;
  }
  
  span {
    font-size: 9px;
    color: #555;
    line-height: 1.2;
  }
  
  .star {
    font-size: 16px;
    color: #000;
    margin-bottom: 2px;
  }
`;

const Layer1 = styled(Card).attrs(({ $scroll }) => ({
  style: {
    transform: `translate(0px,-${($scroll) * 15}%) scale(0.7)`,
  },
}))`
  transition: transform 0.2s ease-out;
  position: absolute;
  bottom: -120vh;
  transform-origin: left center;
  left: 2vw;
  z-index: 4;
`;

const Layer2 = styled(Card).attrs(({ $scroll }) => ({
  style: {
    transform: `translate(0px,-${($scroll) * 8.5}%) scale(0.62)`,
  },
}))`
  transition: transform 0.2s ease-out;
  position: absolute;
  bottom: -90vh;
  right: 2vw;
  transform-origin: right center;
  filter: blur(0.6px);
  z-index: 3;
`;

const Layer3 = styled(Card).attrs(({ $scroll }) => ({
  style: {
    transform: `translate(0px,-${($scroll) * 3.5}%) scale(0.5)`,
  },
}))`
  transition: transform 0.2s ease-out;
  bottom: -75vh;
  left: 10vw;
  transform-origin: left center;
  position: absolute;
  filter: blur(0.8px);
  z-index: 2;
`;

const Layer4 = styled(Card).attrs(({ $scroll }) => ({
  style: {
    transform: `translate(0px,-${($scroll) * 2}%) scale(0.45)`,
  },
}))`
  transition: transform 0.2s ease-out;
  bottom: -70vh;
  right: 10vw;
  transform-origin: right center;
  position: absolute;
  filter: blur(1.2px);
  z-index: 1;
`;

const MultilingualSentimentImages = ({ scrollPercent, boxHeight, index, scrollHeight, screenHeight }) => {
  let adjustedScrollPercent = scrollPercent;
  const heighttoBeReducedinVH = ((boxHeight * index) - 100);
  const scrollOffset = (screenHeight * heighttoBeReducedinVH) / 100;
  const scrollOffsetInPercent = (scrollOffset * 100 / scrollHeight) + index - 1;
  
  adjustedScrollPercent -= scrollOffsetInPercent;

  return (
    <>
      <Layer4 $scroll={adjustedScrollPercent}>
        <div className="star">*</div>
        <h4>Contrastive</h4>
        <span>Supervised Learning</span>
      </Layer4>
      <Layer3 $scroll={adjustedScrollPercent}>
        <div className="star">*</div>
        <h4>Transformers</h4>
        <span>Multilingual Sentiment</span>
      </Layer3>
      <Layer2 $scroll={adjustedScrollPercent}>
        <div className="star">*</div>
        <h4>Geometry</h4>
        <span>Emotional Vector Embed</span>
      </Layer2>
      <Layer1 $scroll={adjustedScrollPercent}>
        <div className="star">*</div>
        <h4>F1 Metrics</h4>
        <span>0.699 Cluster-level F1</span>
      </Layer1>
    </>
  );
};

MultilingualSentimentImages.propTypes = {
  boxHeight: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  screenHeight: PropTypes.number.isRequired,
  scrollHeight: PropTypes.number.isRequired,
  scrollPercent: PropTypes.number.isRequired,
};

export default MultilingualSentimentImages;
