import React from 'react'
import './RPHero.css'
import { RibosomalProtein } from '../../../redux/types/ribTypes'

const RPHero = (data:RibosomalProtein) => {
    console.log(data);
    
    return (
        <div className="rp-hero">
            "RP HERO"
        </div>
    )
}

export default RPHero



