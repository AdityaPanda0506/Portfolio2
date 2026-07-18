import React from 'react';
import styled from 'styled-components';
import device from '../../../Assets/Responsive/breakpoints';
import adityaProfileImg from '../../../Assets/Images/aditya_profile.png';
import adityaResume from '../../../Aditya Panda Resume.pdf';

const Container = styled.section`
  height: 100vh;
  width: 100%;
  background-color: #ffffff;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  padding: 0 10%;
  position: relative;
  overflow: hidden;
  border-top: 1px solid #eaeaea;
`;

const ColumnLeft = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  z-index: 2;
`;

const ProfileFrame = styled.div`
  position: relative;
  width: 280px;
  height: 380px;
  border: 1px solid #000;
  padding: 15px;
  background: #fff;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.08);
  transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1);

  &:hover {
    transform: translateY(-10px) rotate(-1deg);
  }

  &::before {
    content: '';
    position: absolute;
    top: 10px;
    left: 10px;
    right: 10px;
    bottom: 10px;
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

const ColumnCenter = styled.div`
  flex: 1.5;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  text-align: center;
  z-index: 2;
`;

const BuildText = styled.h2`
  font-family: 'AvenirHeavy';
  font-size: 46px;
  color: #000;
  letter-spacing: 4px;
  line-height: 1.2;
  margin: 0;
  text-transform: uppercase;

  @media ${device.laptop} {
    font-size: 36px;
    letter-spacing: 3px;
  }
  @media ${device.laptopL} {
    font-size: 46px;
    letter-spacing: 4px;
  }
  @media ${device.desktop} {
    font-size: 72px;
    letter-spacing: 6px;
  }
`;

const BuildSubtext = styled.span`
  font-family: 'AvenirLight';
  font-size: 14px;
  color: #888;
  letter-spacing: 2px;
  margin-top: 15px;
  text-transform: uppercase;

  @media ${device.laptop} {
    font-size: 12px;
  }
  @media ${device.laptopL} {
    font-size: 14px;
  }
  @media ${device.desktop} {
    font-size: 20px;
  }
`;

const ColumnRight = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  z-index: 2;
`;

const ResumeCard = styled.a`
  position: relative;
  width: 280px;
  height: 380px;
  border: 1px solid #000;
  background: #ffffff;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  padding: 30px;
  text-decoration: none;
  color: #000;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.08);
  transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);

  &:hover {
    transform: translateY(-10px) rotate(1deg);
    background: #000;
    color: #fff;
    
    .resume-border {
      border-color: #333;
    }
    
    .resume-arrow {
      transform: translateX(5px);
      color: #fff;
    }

    .resume-stamp {
      border-color: #fff;
      color: #fff;
    }
  }
`;

const ResumeBorder = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  bottom: 10px;
  border: 1px solid #eaeaea;
  pointer-events: none;
  transition: border-color 0.5s ease;
`;

const ResumeHeader = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;

const ResumeLabel = styled.span`
  font-family: 'AvenirLight';
  font-size: 12px;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #888;
`;

const ResumeTitle = styled.h3`
  font-family: 'AvenirHeavy';
  font-size: 28px;
  margin: 5px 0 0 0;
  letter-spacing: 1.5px;
  text-transform: uppercase;
`;

const ResumeStamp = styled.div`
  align-self: flex-start;
  border: 2px dashed #000;
  font-family: 'AvenirHeavy';
  font-size: 11px;
  padding: 6px 12px;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-top: 20px;
  transition: all 0.5s ease;
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
  font-size: 14px;
  letter-spacing: 1px;
  text-transform: uppercase;
`;

const ArrowIcon = styled.span`
  font-size: 20px;
  transition: transform 0.3s ease;
`;

const LetsBuild = () => {
  return (
    <Container>
      <ColumnLeft>
        <ProfileFrame>
          <ProfileImage src={adityaProfileImg} alt="Aditya Panda" />
        </ProfileFrame>
      </ColumnLeft>

      <ColumnCenter>
        <BuildText>Let's build<br />together!</BuildText>
        <BuildSubtext>Available for collaboration</BuildSubtext>
      </ColumnCenter>

      <ColumnRight>
        <ResumeCard href={adityaResume} target="_blank" rel="noopener noreferrer">
          <ResumeBorder className="resume-border" />
          <ResumeHeader>
            <ResumeLabel>Curriculum Vitae</ResumeLabel>
            <ResumeTitle>Resume</ResumeTitle>
            <ResumeStamp className="resume-stamp">AI / ML / GENAI</ResumeStamp>
          </ResumeHeader>
          <ResumeFooter>
            <ActionText>View & Download</ActionText>
            <ArrowIcon className="resume-arrow">→</ArrowIcon>
          </ResumeFooter>
        </ResumeCard>
      </ColumnRight>
    </Container>
  );
};

export default LetsBuild;
