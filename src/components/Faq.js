import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

import data from "../db.json";
import "../assets/styles/Faq.css";

function Faq() {
    const { faqData } = data?.faqpage;
    const [activeIndex, setActiveIndex] = useState(null);
    const toggleAccordion = (index) => {
        setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
    };
    return (
        <>
            <div className="faq-container">
                <div className='header-faq'>
                    <span>Our FAQ</span>
                    <h2>Frequently asked questions</h2>
                </div>
                <div className="faq-list">
                    {faqData?.map((item, index) => (
                        <div className="faq-item" key={index}>
                            <h6
                                style={{
                                    border: '1px solid #dee2e6',
                                    borderTopLeftRadius: '6px',
                                    borderTopRightRadius: '6px',
                                    borderBottomLeftRadius: activeIndex === index ? '0px' : '6px',
                                    borderBottomRightRadius: activeIndex === index ? '0px' : '6px',
                                    backgroundColor: activeIndex === index ? '#f5efea' : '',
                                    color: activeIndex === index ? '#e67e22' : ''
                                }}
                                onClick={() => toggleAccordion(index)}
                            >
                                {item.question}
                                {activeIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                            </h6>
                            <div className={`faq-answer ${activeIndex === index ? 'active' : ''}`}>
                                {item?.answer.map((paragraph, pIndex) => (
                                    <p key={pIndex}>{paragraph}</p>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>)
}
export default Faq;
