/**
 * Skills Component - Mobile version
 * 
 * This component handles:
 * 1. Displaying the skills section with staggered animations
 * 2. Responsive text sizing based on screen size
 */

import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import gsap from 'gsap'; // GreenSock Animation Platform
import device from '../../Assets/Responsive/breakpoints';

const Container = styled.section`
    height: 100vh;
    width:100%;
    /* border: 1px solid blue; */
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    align-content: flex-start;
    @media ${device.mobileS} {
    padding-left:60px;
    }
    @media ${device.mobileM} {
    padding-left:60px;
    }
    @media ${device.mobileL} {
    padding-left:60px;
    }
    @media ${device.tablet} {
    padding-left:90px;
    }
    @media ${device.laptop} {
    padding-left:120px;
    }
`;

const SkillsTitle = styled.div`
  font-family: 'AvenirHeavy';
  color: #000;
  @media ${device.mobileS} {
    font-size: 40px;
  }
  @media ${device.mobileM} {
    font-size: 50px;
  }
  @media ${device.mobileL} {
    font-size: 60px;
  }
  @media ${device.tablet} {
    font-size: 90px;
  }
  @media ${device.laptop} {
    font-size: 95px;
  }
`;

const SkillsList = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 24px;
  font-family: 'AvenirRoman';
  text-align: left;
  z-index: 1;
  padding: 20px 0;
  
  @media ${device.mobileS} {
    margin-top: 15px;
    font-size: 14px;
    gap: 16px;
  }
  @media ${device.mobileM} {
    margin-top: 20px;
    font-size: 16px;
    gap: 18px;
  }
  @media ${device.mobileL} {
    margin-top: 20px;
    font-size: 18px;
    gap: 20px;
  }
  @media ${device.tablet} {
    margin-top: 35px;
    font-size: 26px;
    gap: 30px;
  }
`;

const SkillCategory = styled.div`
  display: flex;
  flex-flow: column nowrap;
  border-left: 3px solid #000;
  padding-left: 14px;
  
  .category-title {
    font-family: 'AvenirHeavy';
    color: #000;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    margin-bottom: 6px;
    font-size: 0.9em;
  }
  
  .category-skills {
    color: #555;
    line-height: 1.4;
    font-family: 'AvenirLight';
    font-size: 0.8em;
    letter-spacing: 1px;
  }
`;

const Skills = () => {
  // Create refs for animation targets
  const titleRef = useRef(null);
  const skillsListRef = useRef(null);
  const skillItems = useRef([]);
  
  // Set up animations when component mounts
  useEffect(() => {
    // Create a timeline for sequenced animations
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    // Get all skill categories for staggered animation
    const skillElements = skillsListRef.current.querySelectorAll('.category-item');
    skillItems.current = skillElements;
    
    // Animate the title with a slide in from left
    tl.fromTo(titleRef.current,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 0.8 }
    )
    // Animate each skill item with a staggered fade in
    .fromTo(skillItems.current,
      { opacity: 0, y: 20 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.5, 
        stagger: 0.1 // Stagger each item's animation
      },
      "-=0.4" // Start slightly before the title animation finishes
    );
    
    // Cleanup function
    return () => {
      tl.kill(); // Kill the timeline if component unmounts
    };
  }, []); // Empty dependency array means this runs once on mount
  
  return (
    <Container>
      <SkillsTitle ref={titleRef}>SKILLS</SkillsTitle>
      <SkillsList ref={skillsListRef}>
        <SkillCategory className="category-item">
          <div className="category-title">Languages</div>
          <div className="category-skills">PYTHON • SQL • JAVA • JAVASCRIPT</div>
        </SkillCategory>
        <SkillCategory className="category-item">
          <div className="category-title">ML / AI / GenAI</div>
          <div className="category-skills">PYTORCH • TRANSFORMERS • SHAP • RAG • VECTOR DBS • LANGCHAIN • LANGGRAPH</div>
        </SkillCategory>
        <SkillCategory className="category-item">
          <div className="category-title">Data & Infra</div>
          <div className="category-skills">PANDAS • NUMPY • GOOGLE CLOUD • AWS • APACHE BEAM • TERRAFORM • DOCKER</div>
        </SkillCategory>
        <SkillCategory className="category-item">
          <div className="category-title">Backend & Web</div>
          <div className="category-skills">FASTAPI • FLASK • REACT</div>
        </SkillCategory>
        <SkillCategory className="category-item">
          <div className="category-title">Tools</div>
          <div className="category-skills">GIT • GITHUB • POSTMAN</div>
        </SkillCategory>
      </SkillsList>
    </Container>
  );
}

export default Skills;
