import Feed from "./Feed";
import React from "react";
// import RightBar from "./RightBar";
// import SideBar from "./SideBar";
import NavegationBar from "./NavegationBar";
// import ScrollButton from "./ScrollButton";
import { createTheme, ThemeProvider, Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";

function LandingPage() {
  const [mode, setMode] = useState("light");

  // const [pageScroll, setPageScroll] = useState('page1')

  const page1 = useRef(null);
  const page2 = useRef(null);
  const page3 = useRef(null);
  const page4 = useRef(null);
  const page5 = useRef(null);
  const page6 = useRef(null);

  const [currentPage, setCurrentPage] = useState(page1);

  const scrollToSection = (element) => {
    window.scrollTo({
      top: element.current.offsetTop - 64,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToSection(currentPage);
  }, [currentPage]);

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <NavegationBar
        mode={mode}
        setMode={setMode}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        page1={page1}
        page2={page2}
        page3={page3}
        page4={page4}
        page5={page5}
        page6={page6}
      />


      {/* <Box
        item
        xs={12}
      >
        <ScrollButton />
      </Box> */}
      <Box
      >
        {/* <Stack 
        direction="row" 
        spacing={2} 
      justifyContent="space-between"> */}
        {/* <SideBar setMode={setMode} mode={mode}/> */}
        <Feed
          // pageScroll={pageScroll}
          // setPageScroll={setPageScroll}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          page1={page1}
          page2={page2}
          page3={page3}
          page4={page4}
          page5={page5}
          page6={page6}
        />
        {/* <RightBar /> */}
        {/* </Stack> */}

      </Box>
    </ThemeProvider>
  );
}

export default LandingPage;
