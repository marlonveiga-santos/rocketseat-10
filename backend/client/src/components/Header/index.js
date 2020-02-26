import React from "react";
import { GiRadarSweep } from 'react-icons/gi';
import './style.css'

export default function Header() {
    return(
        <>
        <div className="Header"><GiRadarSweep className="radar-icon"/> Dev-Radar</div>
        </>
    )
}