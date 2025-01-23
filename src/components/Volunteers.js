import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FaUser, FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

import { getContributor } from "../Services/CommonServices";
import Loading from "../assets/images/loading_gif.webp"
import "../assets/styles/Volunteers.css";

const Volunteers = () => {
    const containerRef = useRef(null);

    const [contributorsData, setContributorsData] = useState([]);
    const [displayedData, setDisplayedData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 576);

    const foodDonationDescriptions = [
        "These volunteers help provide food and essentials to people in need, collecting and distributing it.",
        "Our volunteers ensure families experiencing food insecurity have access to nutritious meals daily.",
        "Food donation volunteers collect, package, and deliver food to people in need across local areas."
    ];

    const getRandomDescription = (name) => {
        const randomIndex = Math.floor(Math.random() * foodDonationDescriptions?.length);
        return `${name}, ${foodDonationDescriptions[randomIndex]}`;
    };

    const getContributorsData = async () => {
        try {
            const response = await getContributor();
            if (response?.status === 200) {
                setContributorsData(response?.data?.contributors);
            } else {
                setContributorsData([]);
            }
        } catch (error) {
            console.log("error:", error);
        }
    };

    const renderContributorsUsers = () => {
        return (<>
            <div className="contributors-users" style={{ maxHeight: displayedData?.length > 3 ? '52vh' : '30vh' }} ref={containerRef}>
                {displayedData?.map((item, index) => (
                    <div className={`user-section`} key={index}>
                        <div>
                            <FaUser className="section-img-icon-user" />
                        </div>
                        <h5>{item.fullName}</h5>
                        <p className="user-about">
                            {getRandomDescription(item?.fullName)}
                        </p>

                        <div className="social-links">
                            <a href={"#facebook"} target="_blank" rel="noopener noreferrer">
                                <FaFacebook className="social-icon" />
                            </a>
                            <a href={"#twitter"} target="_blank" rel="noopener noreferrer">
                                <FaTwitter className="social-icon" />
                            </a>
                            <a href={"#linkedin"} target="_blank" rel="noopener noreferrer">
                                <FaLinkedin className="social-icon" />
                            </a>
                            <a href={"#instagram"} target="_blank" rel="noopener noreferrer">
                                <FaInstagram className="social-icon" />
                            </a>
                        </div>
                    </div>
                ))}
            </div>
            {isLoading && (
                <div className="loading-container">
                    {/* <div class="spinner"></div> */}
                    <img src={Loading} alt="Loading..." className="loading-spinner" />
                </div>
            )}
        </>)
    }

    const loadMoreData = () => {
        setIsLoading(true);
        setTimeout(() => {
            const nextData = contributorsData.slice(displayedData.length, displayedData.length + 3);
            setDisplayedData((prevData) => [...prevData, ...nextData]);
            setIsLoading(false);
        }, 2000);
    };

    const handleScroll = useCallback(() => {
        const container = containerRef.current;
        const bottom = container.scrollHeight === container.scrollTop + container.clientHeight;
        if (bottom && !isLoading && displayedData.length < contributorsData.length) {
            loadMoreData();
        }
        // eslint-disable-next-line
    }, [displayedData, isLoading]);

    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
        }
        return () => {
            if (container) {
                container.removeEventListener('scroll', handleScroll);
            }
        };
    }, [handleScroll]);

    useEffect(() => {
        if (contributorsData.length > 0) {
            setDisplayedData(contributorsData.slice(0, 3));
        }
    }, [contributorsData]);

    useEffect(() => {
        getContributorsData();
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth <= 576);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            <div className='main-container'>
                <div className='top-header'>
                    <p>Let's Help The</p>
                    <p>Unfortunate People</p>
                </div>
                {
                    !isMobileView && displayedData?.length > 0 ? renderContributorsUsers() : null
                }
            </div>
            {
                isMobileView && displayedData?.length > 0 ? renderContributorsUsers() : null
            }
        </>
    );
};

export default Volunteers;
