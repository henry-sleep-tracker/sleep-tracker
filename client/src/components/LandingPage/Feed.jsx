import { Grid } from "@mui/material";
import React from "react";
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
            justifyContent="center"
            alignItems="stretch"
            spacing={1}
            maxWidth='100vw'
            // direction="column"
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
            <Grid
                item
                ref={page5}
            >
                <Page5 />
            </Grid>
        </Grid>
    )
}

export default Feed;