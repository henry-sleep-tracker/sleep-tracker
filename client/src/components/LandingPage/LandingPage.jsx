import Feed from "./Feed";
import React from "react";
import NavegationBar from "./NavegationBar";
import { createTheme, ThemeProvider, Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { cleanUser } from "../../actions/index";
import { useDispatch } from "react-redux";

function LandingPage() {
  const [mode, setMode] = useState("light");
  const loggedUser = useSelector((state) => state?.users.currentUser);

  const page1 = useRef(null);
  const page2 = useRef(null);
  const page3 = useRef(null);
  const page4 = useRef(null);
  const page5 = useRef(null);
  const page6 = useRef(null);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(page1);

  const scrollToSection = (element) => {
    window.scrollTo({
      top: element.current.offsetTop - 64,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (loggedUser.deletedAt) {
      dispatch(cleanUser());
    }
    scrollToSection(currentPage);
  }, [currentPage]);

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Helmet>
        <title>Sleep Tracker</title>
      </Helmet>

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
      <Box>
        <Feed
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          page1={page1}
          page2={page2}
          page3={page3}
          page4={page4}
          page5={page5}
          page6={page6}
        />
      </Box>
    </ThemeProvider>
  );
}

export default LandingPage;
