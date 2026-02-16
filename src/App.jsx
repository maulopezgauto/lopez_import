import React, { useEffect } from 'react'
import LandingPageHeader from "./components/landingPageHeader.jsx";
import Content from './components/landingPageContent.jsx'
import Footer from "./components/footer.jsx";


function App() {
  useEffect(() => {
    document.documentElement.classList.remove("nav-open");
  }, []);

  return (
      <>
      <LandingPageHeader />
      <Content/>
      <Footer />
    </>
    )
}

export default App
