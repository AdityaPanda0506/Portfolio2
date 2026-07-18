/**
 * TextContent Component - Displays project details with reveal animations
 * 
 * This component handles:
 * 1. Displaying project information (name, description, roles, etc.)
 * 2. Animating text reveals using GSAP
 * 3. Responsive text sizing based on screen size
 */

import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import gsap from 'gsap'; // GreenSock Animation Platform
import device from '../../../Assets/Responsive/breakpoints';

const TextContainer = styled.section`
position: fixed;
top:0;
left:0;
display: flex;
flex-flow: column nowrap;
/* border: 1px dashed black; */
height:100vh;
width: 100%;
`;

const ProjectName = styled.div`
  font-family: 'AvenirHeavy';
  @media ${device.mobileS} {
    font-size: 24px;
  }
  @media ${device.mobileM} {
    font-size: 28px;
  }
  @media ${device.mobileL} {
    font-size: 32px;
  }
  @media ${device.tablet} {
    font-size: 44px;
  }
  @media ${device.laptop} {
    font-size: 60px;
  }
  /* border: 1px dashed black; */
`;

const ProjectDesc = styled.div`
  padding-top: 2%;
  font-family: 'AvenirBook';
  line-height: 1.4;
  @media ${device.mobileS} {
    font-size: 12px;
  }
  @media ${device.mobileM} {
    font-size: 13px;
  }
  @media ${device.mobileL} {
    font-size: 14px;
  }
  @media ${device.tablet} {
    font-size: 18px;
  }
  @media ${device.laptop} {
    font-size: 22px;
  }
  @media ${device.laptopL} {
    font-size: 26px;
  }
  @media ${device.desktop} {
    font-size: 40px;
  }
  /* border: 1px dashed black; */
`;

const MyRole = styled.div`
  padding-top: 5%;
  font-family: 'AvenirMedium';
  @media ${device.mobileS} {
    font-size: 12px;
  }
  @media ${device.mobileM} {
    font-size: 13px;
  }
  @media ${device.mobileL} {
    font-size: 14px;
  }
  @media ${device.tablet} {
    font-size: 18px;
  }
  @media ${device.laptop} {
    font-size: 22px;
  }
  @media ${device.laptopL} {
    font-size: 26px;
  }
  @media ${device.desktop} {
    font-size: 40px;
  }
  /* border: 1px dashed black; */
`;

const ProjectID = styled.div`
  font-family: 'AvenirHeavy';
  padding: 5%;
  @media ${device.mobileS} {
    font-size: 14px;
  }
  @media ${device.mobileM} {
    font-size: 15px;
  }
  @media ${device.mobileL} {
    font-size: 16px;
  }
  @media ${device.tablet} {
    font-size: 20px;
  }
  @media ${device.laptopL} {
    font-size: 26px;
  }
  @media ${device.desktop} {
    font-size: 48px;
  }
`;

const ProjectType = styled.div`
  font-family: 'AvenirHeavy';
  padding: 5%;
  @media ${device.mobileS} {
    font-size: 14px;
  }
  @media ${device.mobileM} {
    font-size: 15px;
  }
  @media ${device.mobileL} {
    font-size: 16px;
  }
  @media ${device.tablet} {
    font-size: 20px;
  }
  @media ${device.laptopL} {
    font-size: 26px;
  }
  @media ${device.desktop} {
    font-size: 48px;
  }
`;

const ProjectDetails = styled.div`
display: flex;
flex-flow: column nowrap;
/* border: 1px dashed black; */
width: 100%;
padding: 5%;
`;


const ProjectDetailsContainer = styled.div`
display: flex;
flex-flow: column nowrap;
align-items: center;
/* border: 2px solid black; */
padding-top:5%;
height: 100%;
`;

const TitleLink = styled.a`
  color: inherit;
  text-decoration: none;
  position: relative;
  cursor: pointer;
  display: inline-block;
  
  &:hover {
    color: #1a73e8; /* elegant tech blue */
    transition: color 0.3s ease;
  }
  
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 3px;
    bottom: -4px;
    left: 0;
    background-color: #1a73e8;
    transform-origin: bottom right;
    transition: transform 0.25s cubic-bezier(0.25, 0.8, 0.25, 1);
  }
  
  &:hover::after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  gap: 15px;
  margin-top: 20px;
  z-index: 10;
  
  @media ${device.mobileS} {
    gap: 10px;
    margin-top: 15px;
  }
  @media ${device.tablet} {
    gap: 15px;
    margin-top: 20px;
  }
`;

const ActionButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 18px;
  border-radius: 20px;
  font-family: 'AvenirMedium';
  font-size: 13px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  
  @media ${device.mobileS} {
    padding: 6px 12px;
    font-size: 11px;
  }
  @media ${device.tablet} {
    padding: 8px 16px;
    font-size: 13px;
  }
  
  &.primary {
    background: #1a73e8;
    color: white;
    border: 2px solid transparent;
    
    &:hover {
      background: #1557b0;
      transform: translateY(-2px);
      box-shadow: 0 6px 12px rgba(26, 115, 232, 0.3);
    }
  }
  
  &.secondary {
    background: transparent;
    color: #333;
    border: 2px solid #333;
    
    &:hover {
      background: #333;
      color: white;
      transform: translateY(-2px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    }
  }
`;

/**
 * TextReveal component - Handles the text reveal animation using GSAP
 * This replaces the previous CSS keyframes approach with GSAP for better performance
 */
const TextReveal = ({ children, inline, refreshToggle }) => {
  // Create refs for the text and overlay elements
  const textRef = useRef(null);
  const overlayRef = useRef(null);
  
  // Set up animations when the component mounts or refreshToggle changes
  useEffect(() => {
    if (!textRef.current || !overlayRef.current) return;
    
    // Reset the animation state with a gentle slide-up for smoother transition
    gsap.set(textRef.current, { color: '#FFF', opacity: 0, y: 15 });
    gsap.set(overlayRef.current, { 
      left: 0,
      width: '0%',
      opacity: 1
    });
    
    // Create a timeline for better control of animation sequence
    const tl = gsap.timeline();
    
    // Add the overlay reveal animation
    tl.to(overlayRef.current, {
      width: '100%',
      duration: 0.45,
      ease: 'power3.inOut'
    })
    .to(textRef.current, {
      color: '#333',
      opacity: 1,
      y: 0,
      duration: 0.45,
      ease: 'power3.out'
    }, '-=0.15')
    .to(overlayRef.current, {
      left: '100%',
      width: '0%',
      duration: 0.45,
      ease: 'power3.inOut'
    }, '-=0.3');
    
    // Cleanup function
    return () => {
      tl.kill(); // Kill the timeline if component unmounts during animation
    };
  }, [refreshToggle]); // Re-run when refreshToggle changes
  
  return (
    <span 
      ref={textRef}
      style={{
        display: inline ? 'inline-block' : 'block',
        color: '#FFF',
        position: 'relative'
      }}
    >
      {children}
      <span 
        ref={overlayRef}
        style={{
          content: '',
          top: 0,
          left: 0,
          position: 'absolute',
          width: '0%',
          height: '100%',
          background: '#222',
          zIndex: 1,
          pointerEvents: 'none'
        }}
      />
    </span>
  );
};

/**
 * TextContent Component - Displays project details with animated text reveals
 */
const TextContent = ({ number, projectName, projectDesc, roles, projectType, githubLink, liveLink, refreshToggle = false }) => {
  // Helper function to render roles with bullet separators
  const renderRoles = (roleList) => {
    return roleList.map((role, index, arr) => {
      return index === arr.length - 1 ? (
        <span key={role}>{role}</span>
      ) : (
        <span key={role}>
          {role}
          &nbsp; • &nbsp;
        </span>
      );
    });
  };
  
  const hasContent = projectName && projectName.trim() !== '';
  
  return (
    <TextContainer>
      <ProjectID>
        <TextReveal refreshToggle={refreshToggle} inline>
          {number}
        </TextReveal>
      </ProjectID>
      <ProjectDetailsContainer>
        <ProjectDetails style={{ opacity: hasContent ? 1 : 0 }}>
          <ProjectName>
            <TextReveal refreshToggle={refreshToggle} inline>
              {hasContent ? (
                <TitleLink href={liveLink} target="_blank" rel="noopener noreferrer">
                  {projectName}
                </TitleLink>
              ) : (
                projectName
              )}
            </TextReveal>
          </ProjectName>
          <MyRole>
            <TextReveal refreshToggle={refreshToggle} inline>
              {renderRoles(roles)}
            </TextReveal>
          </MyRole>
          <ProjectDesc>
            <TextReveal refreshToggle={refreshToggle} inline={false}>
              {projectDesc}
            </TextReveal>
          </ProjectDesc>
        </ProjectDetails>
      </ProjectDetailsContainer>
      
      <ProjectType>
        <TextReveal refreshToggle={refreshToggle} inline>
          {projectType}
        </TextReveal>
      </ProjectType>
    </TextContainer>
  );
};

/**
 * PropTypes for TextContent component
 */
TextContent.propTypes = {
  number: PropTypes.string.isRequired,
  projectName: PropTypes.string.isRequired,
  projectDesc: PropTypes.string.isRequired,
  roles: PropTypes.array.isRequired,
  projectType: PropTypes.string.isRequired,
  githubLink: PropTypes.string,
  liveLink: PropTypes.string,
  refreshToggle: PropTypes.bool,
};

/**
 * PropTypes for TextReveal component
 */
TextReveal.propTypes = {
  children: PropTypes.node.isRequired,
  inline: PropTypes.bool,
  refreshToggle: PropTypes.bool,
};

export default TextContent;
