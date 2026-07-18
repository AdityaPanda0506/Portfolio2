import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { createGlobalStyle } from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import WideScreenHero from './Slides/WideScreen/HeroSlide/Hero';
import WideScreenWork from './Slides/WideScreen/WorkSlide/Work';
import WideScreenSkills from './Slides/WideScreen/Skills';
import WideScreenContact from './Slides/WideScreen/ContactSlide/Contact';
import WideScreenLetsBuild from './Slides/WideScreen/LetsBuildSlide/LetsBuild';
import MobileHero from './Slides/Mobile/HeroSlide/Hero';
import MobileWork from './Slides/Mobile/WorkSlide/Work';
import MobileSkills from './Slides/Mobile/Skills';
import MobileContact from './Slides/Mobile/ContactSlide/Contact';
import MobileLetsBuild from './Slides/Mobile/LetsBuildSlide/LetsBuild';
import './Assets/index.css';

const GlobalStyle = createGlobalStyle`
html, body { margin: 0; overflow-x: hidden; width: 100%; }
*, *:before, *:after { box-sizing: border-box; }
`;

const App = () => {
  // Use the useMediaQuery hook instead of MediaQuery component
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 1224 });
  const isMobile = useMediaQuery({ maxWidth: 1223 });

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  return (
    <>
      {isDesktopOrLaptop && (
        <>
          <WideScreenHero />
          <WideScreenWork />
          <WideScreenSkills />
          <WideScreenContact />
          <WideScreenLetsBuild />
        </>
      )}
      {isMobile && (
        <>
          <MobileHero />
          <MobileWork />
          <MobileSkills />
          <MobileContact />
          <MobileLetsBuild />
        </>
      )}
      <GlobalStyle />
    </>
  );
};

// React 18 way of rendering with createRoot API
const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
