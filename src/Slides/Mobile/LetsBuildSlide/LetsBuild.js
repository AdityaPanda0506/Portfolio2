import React from 'react';
import styled from 'styled-components';
import device from '../../../Assets/Responsive/breakpoints';
import adityaProfileImg from '../../../Assets/Images/aditya_profile.png';
import adityaResume from '../../../Aditya Panda Resume.pdf';

const Container = styled.section`
  min-height: 100vh;
  width: 100%;
  background-color: #ffffff;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
  align-items: center;
  padding: 40px 20px;
  position: relative;
  overflow: hidden;
  border-top: 1px solid #eaeaea;
`;

const SectionTitle = styled.h2`
  font-family: 'AvenirHeavy';
  font-size: 28px;
  color: #000;
  letter-spacing: 2px;
  line-height: 1.2;
  margin: 0;
  text-transform: uppercase;
  text-align: center;
  
  @media ${device.mobileS} {
    font-size: 24px;
  }
  @media ${device.mobileM} {
    font-size: 28px;
  }
  @media ${device.mobileL} {
    font-size: 32px;
  }
`;

const ProfileFrame = styled.div`
  position: relative;
  width: 180px;
  height: 240px;
  border: 1px solid #000;
  padding: 10px;
  background: #fff;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);

  &::before {
    content: '';
    position: absolute;
    top: 6px;
    left: 6px;
    right: 6px;
    bottom: 6px;
    border: 1px solid #eaeaea;
    pointer-events: none;
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(100%);
  border: 1px solid #eaeaea;
`;

const ResumeCard = styled.a`
  position: relative;
  width: 260px;
  height: 160px;
  border: 1px solid #000;
  background: #ffffff;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  padding: 20px;
  text-decoration: none;
  color: #000;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:active {
    background: #000;
    color: #fff;
    
    .resume-border {
      border-color: #333;
    }
  }
`;

const ResumeBorder = styled.div`
  position: absolute;
  top: 6px;
  left: 6px;
  right: 6px;
  bottom: 6px;
  border: 1px solid #eaeaea;
  pointer-events: none;
`;

const ResumeHeader = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;

const ResumeLabel = styled.span`
  font-family: 'AvenirLight';
  font-size: 10px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: #888;
`;

const ResumeTitle = styled.h3`
  font-family: 'AvenirHeavy';
  font-size: 20px;
  margin: 2px 0 0 0;
  letter-spacing: 1px;
  text-transform: uppercase;
`;

const ResumeFooter = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const ActionText = styled.span`
  font-family: 'AvenirMedium';
  font-size: 12px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`;

const ArrowIcon = styled.span`
  font-size: 16px;
`;

const LetsBuild = () => {
  return (
    <Container>
      <SectionTitle>Let's build<br />together!</SectionTitle>

      <ProfileFrame>
        <ProfileImage src={adityaProfileImg} alt="Aditya Panda" />
      </ProfileFrame>

      <ResumeCard href={adityaResume} target="_blank" rel="noopener noreferrer">
        <ResumeBorder className="resume-border" />
        <ResumeHeader>
          <ResumeLabel>Curriculum Vitae</ResumeLabel>
          <ResumeTitle>Resume</ResumeTitle>
        </ResumeHeader>
        <ResumeFooter>
          <ActionText>View & Download</ActionText>
          <ArrowIcon>→</ArrowIcon>
        </ResumeFooter>
      </ResumeCard>
    </Container>
  );
};

export default LetsBuild;
