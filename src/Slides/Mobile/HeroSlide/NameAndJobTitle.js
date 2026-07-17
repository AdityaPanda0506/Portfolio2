/**
 * NameAndJobTitle Component - Mobile version
 * 
 * This component handles:
 * 1. Displaying the name and job title with animations similar to WideScreen
 * 2. Responsive text sizing based on screen size
 */

import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import gsap from 'gsap'; // GreenSock Animation Platform
import device from '../../../Assets/Responsive/breakpoints';

const Container = styled.section`
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    height: 50vh;
    width: 100%;
    background-color: white;
    overflow: hidden; /* Prevent any overflow issues */
`;

// Name reveal section
const NameStage = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  text-align: center;
  overflow: hidden;
`;

// Title reveal section
const TitleStage = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  text-align: center;
  overflow: hidden;
  margin-top: 10px;
`;

// Name text element
const NameText = styled.div`
  font-family: 'Valencia';
  text-align: center;
  color: #333;
  position: relative;
  @media ${device.mobileS} {
    font-size: 70px;
  }
  @media ${device.mobileM} {
    font-size: 80px;
  }
  @media ${device.mobileL} {
    font-size: 90px;
  }
  @media ${device.tablet} {
    font-size: 150px;
  }
  @media ${device.laptop} {
    font-size: 160px;
  }
`;

// Title text element
const TitleText = styled.div`
  font-family: 'AvenirRoman';
  text-align: center;
  color: #333;
  position: relative;
  @media ${device.mobileS} {
    font-size: 20px;
  }
  @media ${device.mobileM} {
    font-size: 25px;
  }
  @media ${device.mobileL} {
    font-size: 32px;
  }
  @media ${device.tablet} {
    font-size: 30px;
  }
  @media ${device.laptop} {
    font-size: 35px;
  }
`;


const NameAndJobTitle = () => {
  const nameTextRef = useRef(null);
  const titleTextRef = useRef(null);
  
  const nameText = "Aditya Panda";
  const nameCharacters = nameText.split("");

  useEffect(() => {
    const titleText = titleTextRef.current;
    if (!nameTextRef.current || !titleText) return;
    
    const nameChars = nameTextRef.current.querySelectorAll('.char');
    
    gsap.set(titleText, { y: 30, autoAlpha: 1 });
   
    const masterTl = gsap.timeline();
    
    const nameTl = gsap.timeline();
    nameTl.fromTo(nameChars, 
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
    
    const titleTl = gsap.timeline();
    titleTl.to(titleText, {
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      immediateRender: false
    });
    
    masterTl.add(nameTl)
            .add(titleTl, ">-0.3");
    
    masterTl.delay(0.2);
    
    return () => {
      masterTl.kill();
    };
  }, []);
  
  return (
    <Container>
      <NameStage>
        <NameText ref={nameTextRef}>
          {nameCharacters.map((char, index) => (
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
        </NameText>
      </NameStage>
      
      <TitleStage>
        <TitleText ref={titleTextRef}>Machine Learning Engineer</TitleText>
      </TitleStage>
    </Container>
  );
}

export default NameAndJobTitle;
