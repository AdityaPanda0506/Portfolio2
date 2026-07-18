/* eslint-disable react/no-unescaped-entities */
/**
 * AboutMe Component - Mobile version
 * 
 * This component handles:
 * 1. Displaying the about me text with animations
 * 2. Responsive text sizing based on screen size
 */

import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import gsap from 'gsap'; // GreenSock Animation Platform
import device from '../../../Assets/Responsive/breakpoints';

const Container = styled.section`
    height: 50vh;/* Since pageSplitTime is 1.4 */
    width:100%;
    /* border: 1px solid blue; */
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
`;

const AboutMeDescription = styled.span`
  font-family: 'AvenirRoman';
  text-align: center;
  line-height: 1.5;
  @media ${device.mobileS} {
    padding: 20px;
    font-size: 14px;
  }
  @media ${device.mobileM} {
    padding: 20px;
    font-size: 15px;
  }
  @media ${device.mobileL} {
    padding: 20px;
    font-size: 16px;
  }
  @media ${device.tablet} {
    padding: 40px;
    font-size: 22px;
  }
  @media ${device.laptop} {
    padding: 50px;
    font-size: 26px;
  }
`;

const AboutMe = () => {
  // Create ref for animation target
  const textRef = useRef(null);
  
  // Set up animations when component mounts
  useEffect(() => {
    // Animate the about me text with a fade in and slight scale
    gsap.fromTo(textRef.current,
      { opacity: 0, scale: 0.9 },
      { 
        opacity: 1, 
        scale: 1, 
        duration: 1, 
        ease: "power4.out",
        delay: 1.5 // Delay to start after the name and title animations
      }
    );
    
    // Cleanup function
    return () => {
      // Kill any active animations on unmount
      gsap.killTweensOf(textRef.current);
    };
  }, []); // Empty dependency array means this runs once on mount
  
  return (
    <Container>
      <AboutMeDescription ref={textRef}>
        I love diving into new tech and chewing on problems I haven't solved before — but I'm not all screens and code, I game just as hard as I build. Building isn't my profession, it's just my favorite way to spend time.
      </AboutMeDescription>
    </Container>
  );
}

export default AboutMe;
