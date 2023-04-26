import React from 'react'
import './MailScreen.css';
import WestIcon from '@mui/icons-material/West';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined';
import DriveFileMoveOutlinedIcon from '@mui/icons-material/DriveFileMoveOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import LabelImportantOutlinedIcon from '@mui/icons-material/LabelImportantOutlined';
import TurnLeftOutlinedIcon from '@mui/icons-material/TurnLeftOutlined';
import { Avatar, IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectMailInfo } from '../features/mailSlice';
import MainBox from './MainBox';

const MailScreen = () => {

  const email = useSelector(selectMailInfo);
  const navigate = useNavigate();

  if(email === null ) {
    navigate("/");
  }

  const deleteMailFromInbox = () => {
    
  }

  const mailScreen = <div className="mail__screen">
  <div className="mail__tools">
    <Link to="/" className="mail__link__back">
      <IconButton className="back__icon__btn">
        <WestIcon/>
      </IconButton>
    </Link>
    <div className="first__mail__icons">
      <ArchiveOutlinedIcon/>
      <InfoOutlinedIcon/>
      <IconButton onClick={deleteMailFromInbox} className="mail__delete__btn">
        <DeleteOutlineOutlinedIcon/>
      </IconButton>
    </div>
    <div className="second__mail__icons">
      <EmailOutlinedIcon/>
      <AccessTimeOutlinedIcon/>
      <AddTaskOutlinedIcon/>
    </div>
    <div className="third__mail__icons">
      <DriveFileMoveOutlinedIcon/>  
      <LabelOutlinedIcon/>
      <MoreVertOutlinedIcon/>          
    </div>
    <div className="mail__slider">
      <p>1 of 135</p>
      <IconButton className="left__arrow__btn">
        <KeyboardArrowLeftOutlinedIcon/>
      </IconButton>
      <IconButton className="right__arrow__btn">
        <KeyboardArrowRightOutlinedIcon/>
      </IconButton>
    </div>
  </div>
  <div className="mail__content">
    <div className="mail__header">
      <h2>{email?.subject} <span><LabelImportantOutlinedIcon className="inbox__icon"/></span></h2>
    </div>
    <div className="mail__msg">
      <div className="mail__msg__first">
        <div className="mail__msg__info">
          <Avatar className="mail__avatar__icon" />
          <div className="msg__info">
            <h3>{email?.to}</h3>
            <p>to me</p>
          </div>
        </div>
        <div className="mail__msg__date">
          <p>{email?.time}</p>
          <StarBorderOutlinedIcon/>
          <TurnLeftOutlinedIcon/>
          <MoreVertOutlinedIcon/>
        </div>
      </div>
      <div className="mail__msg__content">
        <p>{email?.message}</p>
      </div>
    </div>
  </div>
</div>

  const content = email === null ? <MainBox /> : mailScreen;

  return (
    content
  )
}

export default MailScreen;