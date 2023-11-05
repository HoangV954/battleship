import { useEffect, useState } from "react";

export default function Arrow() {

    const [showArrow, setShowArrow] = useState(false);

    const scrollToBottom = () => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth"
        })
    }

    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY;
            const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
            // Whole page included hidden - visible = hidden
            if (scrolled >= pageHeight) {
                setShowArrow(false);
            } else {
                setShowArrow(true);
            }
        }
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [])


    return (
        <div
            className={`arrow ${showArrow ? 'visible' : 'hidden'}`}
            onClick={scrollToBottom}>
        </div>
    )
}