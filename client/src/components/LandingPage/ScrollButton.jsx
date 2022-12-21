import React, { useState, useEffect } from 'react';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';

const ScrollButton = () => {

    const [showScrollTopButton, setShowScrollTopButton] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 300) {
                setShowScrollTopButton(true);
            } else {
                setShowScrollTopButton(false);
            }
        })
    }, []);

    const scrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <div>
            {showScrollTopButton &&
                <ArrowCircleUpIcon
                    possition='fixed'
                    bottom='15px'
                    right='20'
                    onClick={scrollTop}

                />
                }
        </div>
    )
}

export default ScrollButton