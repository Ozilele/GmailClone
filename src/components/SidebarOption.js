import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectSidebar } from '../features/sidebarSlice';
import './SidebarOption.css';

function SidebarOption({ option, Icon, number, selected }) {
  const isSidebarRolled = useSelector(selectSidebar);

  let className = `${!isSidebarRolled ? 'sidebar__option' : 'sidebar__option__rolled'}`;

  return (
    <div className={`${className} ${selected ? "sidebar__option--active" : ''}`}>
      <Icon />
      <h4>{option}</h4>
      <p>{number}</p>
    </div>
  )
}

export default SidebarOption