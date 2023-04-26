import React, { useEffect, useState } from 'react'
import './Sidebar.css';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import SidebarOption from './SidebarOption';
import InboxIcon from '@mui/icons-material/Inbox';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LabelImportantOutlinedIcon from '@mui/icons-material/LabelImportantOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { openMailPopup } from '../features/mailSlice';
import { selectSidebar, setSidebar } from '../features/sidebarSlice';
import { Link } from 'react-router-dom';
import { toggleTheme, selectAppTheme } from '../features/appMode';
import ReactSwitch from 'react-switch';

function Sidebar() {

  const [iconsClass, setIconsClass] = useState("hidden__icons");
  const [optionTxt, setOptionTxt] = useState("More");
  const [windowSize, setWindowSize] = useState([window.innerWidth, window.innerHeight]);
  const [isWindowSmall, setIsWindowSmall] = useState(false);
  const [isWindowHigh, setIsWindowHigh] = useState(false);

  const sidebarIsRolled = useSelector(selectSidebar);
  const theme = useSelector(selectAppTheme);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };
    
    if(windowSize[0] < 800 && !isWindowSmall) {
      setIsWindowSmall(true);
      setIsWindowHigh(false);
      dispatch(setSidebar(true));
    }

    if(windowSize[0] > 800 && !isWindowHigh) {
      setIsWindowHigh(true);
      setIsWindowSmall(false);
      dispatch(setSidebar(false));
    }

    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });

  const handleClassChange = (e) => {
    const newClass = iconsClass === "hidden__icons" ? "active__icons" : "hidden__icons";
    setIconsClass(newClass);
    const newOptiontxt = optionTxt === "More" ? "Less" : "More"; 
    setOptionTxt(newOptiontxt);
  }

  const handleBtnClick = (e) => {
    dispatch(openMailPopup());
  }

  const toggle = () => {
    dispatch(toggleTheme());
  }


  return (
    <div className={`${sidebarIsRolled ? "sidebar__rolled" : "sidebar"}`}>
      <button className='compose__sidebar__btn' onClick={handleBtnClick}>
        <div>
          <CreateOutlinedIcon /> 
        </div>
        {!sidebarIsRolled && <span>Compose</span>}
      </button>
      <div className="sidebar__options">
        {!sidebarIsRolled &&
        <>
        <SidebarOption option="Inbox" Icon={InboxIcon} number={54} selected={true}/>
        <Link to="/starred">
          <SidebarOption option="Starred" Icon={StarBorderOutlinedIcon} number={54} />
        </Link>
        <SidebarOption option="Snoozed" Icon={AccessTimeIcon} number={54} />
        <SidebarOption option="Important" Icon={LabelImportantOutlinedIcon} number={54}/>
        <SidebarOption option="Sent" Icon={SendOutlinedIcon} number={54}/>
        <SidebarOption option="Drafts" Icon={InsertDriveFileOutlinedIcon} number={54}/>
        <SidebarOption option="Category" Icon={CategoryOutlinedIcon} number={54}/>
        <div onClick={handleClassChange} className="sidebar__option">
          <ExpandMoreIcon />
          <h4>{optionTxt}</h4>
        </div>
        <div className={iconsClass}>
          <SidebarOption option="Chats" Icon={ChatOutlinedIcon} number={54}/>
          <SidebarOption option="Spam" Icon={InfoOutlinedIcon} number={54}/>
          <SidebarOption option="Trash" Icon={DeleteOutlinedIcon} number={54}/>
          <SidebarOption option="All Mail" Icon={MailOutlinedIcon} number={54}/>
          <SidebarOption option="Manage labels" Icon={SettingsOutlinedIcon} number={54}/>
        </div> </>}
        {sidebarIsRolled && <>
          <SidebarOption Icon={InboxIcon} selected={true}/>
          <Link to="/starred">
            <SidebarOption Icon={StarBorderOutlinedIcon}/>
          </Link>
          <SidebarOption Icon={AccessTimeIcon}/>
          <SidebarOption Icon={LabelImportantOutlinedIcon}/>
          <SidebarOption Icon={SendOutlinedIcon}/>
          <SidebarOption Icon={InsertDriveFileOutlinedIcon}/>
          <SidebarOption Icon={CategoryOutlinedIcon}/>
        </>}
      </div>
      <div className="toggle__theme__section">
        {!sidebarIsRolled && <label>{theme === "dark" ? "Dark Mode" : "Light Mode"}</label>}
        <ReactSwitch onChange={toggle} checked={theme === "dark"} />
      </div>
    </div>
  )
}

export default Sidebar;