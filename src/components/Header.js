import React from 'react'
import './Header.css';
import SearchIcon from '@mui/icons-material/Search';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import { Avatar } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { toggleSidebar } from '../features/sidebarSlice';

function Header() {

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleSidebarToggle = (e) => {
    dispatch(toggleSidebar());
  }

  return (
    <header className="app__header">
      <div className="app__header__first">
        <button className="menu__burger" onClick={handleSidebarToggle}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <Link to="/">
          <img className="header__logo" src="https://cdn-icons-png.flaticon.com/512/5968/5968534.png" alt="gmail__logo"></img>
        </Link>
        <h3>Gmail</h3>
      </div>
      <div className="header__search">
        <SearchIcon className="search__icon"/>
        <input className="search__input" type="text" placeholder='Seach mail'></input>
        <button>
          <TuneIcon className="option__icon"/>
        </button>
      </div>
      <div className="header__icons">
        <HelpOutlineOutlinedIcon className="help__icon"/>
        <SettingsOutlinedIcon />
        <AppsOutlinedIcon />
        <Avatar src={user?.photoUrl} className="avatar__icon"/>
      </div>
      <Avatar src={user?.photoUrl} className="avatar__alone"/>
    </header>
  )
}

export default Header;