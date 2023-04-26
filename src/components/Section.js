import React from 'react'
import './Section.css';

const Section = ({ Icon, text, selected, color }) => {
  return (
    <div className={`email__section__item ${selected && 'email__section__item__selected'}`} style={{
      borderBottom: `3px solid ${color}` 
    }}>
      <Icon />
      <p>{text}</p>
    </div>
  )
}

export default Section;