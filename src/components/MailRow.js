import React, { useState } from 'react'
import './MailRow.css';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { openEmail } from '../features/mailSlice';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';


const MailRow = ({ id, to, subject, description, time, timestamp }) => {

  const [iconClicked, setIsIconClicked] = useState(false);
  const path = `/mail/${id}`;
  const dispatch = useDispatch();

  const openMail = (e) => {
    console.log(e.target.nodeName);
    if(e.target.nodeName !== 'svg' && e.target.nodeName !== 'button' && e.target.nodeName !== 'path') {
      dispatch(openEmail({
        id: id,
        to: to,
        subject: subject,
        message: description,
        time: time
      }));
    } else {
      return false;
    } 
  }

  const addMailToStarred = () => {
    setIsIconClicked(true);
    const docRef = doc(db, "emails", id);
    const data = {
      starred: true
    }

    updateDoc(docRef, data)
    .then(docRef => {
      console.log(docRef);
      console.log("Document field has been added");
    })
    .catch(err => {
      console.log(err);
    });
  }

  return (
    <Link to={path} onClick={openMail} >
    <div className="mail__row">
      <div className="mail__row__icons">
        <CheckBoxOutlineBlankIcon className="checkbox__icon"/>
        <IconButton name="starred__btn" onClick={addMailToStarred}>
          <StarOutlineOutlinedIcon name="starred__icon"/>
        </IconButton>
        <IconButton>
          <LabelOutlinedIcon/>
        </IconButton>
      </div>
      <h3 className="mail__row__sender">
        {to}
      </h3>
      <div className="mail__row__msg">
        <h4 className="mail__row__subject">
          {subject}{" "}
          <span className="mail__row__description">- {description}</span>
        </h4>
      </div>
      <p className="mail__row__time">{time}</p>
    </div>
    </Link>
  )
}

export default MailRow;
