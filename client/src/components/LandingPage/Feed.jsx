import { Grid } from "@mui/material";
<<<<<<< HEAD
import React, { useState } from "react";
import { useRef, useEffect } from "react";
import Post from "./Post";
=======
import React from "react";
>>>>>>> c98dff374c6e5e2d997ae405767bacdcacfa6902
import Page1 from "./Page1";
import Page2 from "./Page2";
import Page3 from "./Page3";
import Page4 from "./Page4";
import Page5 from "./Page5";

const Feed = ({
    currentPage,
    setCurrentPage,
    page1,
    page2,
    page3,
    page4,
    page5
}) => {

    // const [windowwidth, setwindowWidth] = useState(window.innerWidth)

    // const handleResize = () => {
    //     setwindowWidth(window.innerWidth)
    // }

    // useEffect(() => {
    //     window.addEventListener ('resize', handleResize)
    //     }, [currentPage]
    // )

    return (
        <Grid
            container
<<<<<<< HEAD
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={0.5}
            flex={4}
            p={2}
            // overflow= 'hidden'
        >
            <Grid item
                bgcolor='salmon'
                height='100vh'
=======
            justifyContent="center"
            alignItems="stretch"
            spacing={1}
            maxWidth='100vw'
            direction="column"
            flex={4}
            p={2}
            // flexBasis='100%'
            // overflow= 'hidden'
            // sx={{ display: 'auto' }}
            // minHeight='100vh'
            // direction="column"
            // justifyContent="center"
            // alignItems="stretch"
        >
            <Grid
                item
>>>>>>> c98dff374c6e5e2d997ae405767bacdcacfa6902
                ref={page1}
            >

                <Page1
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    page1={page1}
                    page2={page2}
                    page3={page3}
                    page4={page4}
<<<<<<< HEAD
                    page5={page5} />
            </Grid>
            <Grid item
                bgcolor='lightblue'
                height='100vh'
=======
                    page5={page5}
                />
            </Grid>
            <Grid
                item
>>>>>>> c98dff374c6e5e2d997ae405767bacdcacfa6902
                ref={page2}
            >
                <Page2 />
            </Grid>
<<<<<<< HEAD
            <Grid item
                bgcolor='lightgreen'
                height='100vh'
                ref={page3}
            >
                <Page3 />
            </Grid>
            <Grid item
                bgcolor='lightyellow'
                height='100vh'
=======
            <Grid
                item
                ref={page3}
            >

                <Page3 />
            </Grid>
            <Grid
                item
>>>>>>> c98dff374c6e5e2d997ae405767bacdcacfa6902
                ref={page4}
            >
                <Page4 />
            </Grid>
<<<<<<< HEAD
            <Grid item
                height='100vh'
=======
            <Grid
                item
>>>>>>> c98dff374c6e5e2d997ae405767bacdcacfa6902
                ref={page5}
            >
                <Page5 />
            </Grid>
        </Grid>
    )
}

export default Feed;