import React from 'react';
import './style.css';
import Social from './social';
import {FaHeart, FaReact} from 'react-icons/fa'


const Footer = () => {
    return (
        <>
        
        <nav className="Footer">
        <Social/>
        <span> &copy; 2019 Marlon Veiga :)</span>
        <span> Feito com <FaHeart className="heart-icon" /> e <FaReact className="react-icon" /></span>
        </nav>
        </>
    )
}

export default Footer;