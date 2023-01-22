import { Grid } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import getComments from "../../actions/Comments/getComments";
import Page1 from "./Page1";
import Page2 from "./Page2";
import Page3 from "./Page3";
import Page4 from "./Page4";
import Page5 from "./Page5";
import Page6 from "./Page6";
import { theme } from "../../theme";
import { ThemeProvider } from "@emotion/react";

const Feed = ({
    currentPage,
    setCurrentPage,
    page1,
    page2,
    page3,
    page4,
    page5,
    page6
}) => {

    const dispatch = useDispatch();

    // const [windowwidth, setwindowWidth] = useState(window.innerWidth)

    // const handleResize = () => {
    //     setwindowWidth(window.innerWidth)
    // }

    useEffect(() => {
        dispatch(getComments())
    }, [dispatch]
    )

    const currentComments = useSelector((state) => state.comments);

    return (
        <ThemeProvider theme={theme}>

            <Grid
                container
                justifyContent="center"
                // alignItems="stretch"
                maxWidth='100vw'
                direction="column"
            // flex={4}
            // p={2}
            >
                <Grid
                    item
                    ref={page1}
                >

                    <Page1
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        page1={page1}
                        page2={page2}
                        page3={page3}
                        page4={page4}
                        page5={page5}
                        page6={page6}
                    />
                </Grid>

                <Grid
                    item
                    ref={page2}
                >
                    <Page2 />
                </Grid>

                <Grid
                    item
                    ref={page3}
                >

                    <Page3 />
                </Grid>

                <Grid
                    item
                    ref={page4}
                >
                    <Page4 />
                </Grid>

                {
                    currentComments.data &&
                    <Grid
                        item
                        ref={page6}
                    >
                        <Page6
                            commentsState={currentComments.data}
                        />
                    </Grid>
                }

                <Grid
                    item
                    ref={page5}
                >
                    <Page5 />
                </Grid>

            </Grid>
        </ThemeProvider>


    )
}

export default Feed;