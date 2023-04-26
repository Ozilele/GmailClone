import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useState, useEffect } from 'react'
import './StarredEmails.css';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { db } from '../firebase/firebase';
import MailRow from './MailRow';

const StarredEmails = () => {
  const [starredEmails, setStarredEmails] = useState([]);

  const getStarredEmails = async () => {
    const data = [];
    const q = query(collection(db, "emails"), where("starred", "==", true));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      data.push({
        id: doc.id,
        data: doc.data(),
      });
    });
    setStarredEmails(data);
  }

  useEffect(() => {
    getStarredEmails();
  }, []);

  return (
    <div className="starred__section">
      <div className="btns__section">
        <button>
          <span>From</span>
          <ArrowDropDownIcon/>
        </button>
        <button>
          <span>Any time</span>
          <ArrowDropDownIcon/>
        </button>
        <button>
          <span>Has attachment</span>
        </button>
        <button>
          <span>To</span>
          <ArrowDropDownIcon/>
        </button>
      </div>
      <div className="icons__section">

      </div>
      <div className="content__section">
        {starredEmails.map(({ id, data: { receiver, subject, message, timestamp } }) => {
          return (
            <MailRow 
              id={id}
              key={id} 
              to={receiver} 
              subject={subject} 
              description={message}
              timestamp={timestamp} 
              time={new Date(timestamp?.seconds * 1000).toUTCString()} 
            />)
        })}
      </div>
    </div>
  )
}

export default StarredEmails;