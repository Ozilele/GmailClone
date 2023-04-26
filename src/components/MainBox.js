import React, { useState, useEffect } from 'react'
import './MainBox.css';
import RefreshIcon from '@mui/icons-material/Refresh';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { IconButton } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Section from './Section';
import InboxIcon from '@mui/icons-material/Inbox';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import PeopleIcon from '@mui/icons-material/People';
import MailRow from './MailRow';
import { useDispatch } from 'react-redux';
import { getEmails } from '../firebase/firebaseAPI';


const MainBox = () => {

  const [emails, setEmails] = useState([]);
  // const dispatch = useDispatch();

  const fetchEmails = async () => {
    const mailsDb = await getEmails();
    setEmails(mailsDb);
  }

  useEffect(() => {
    fetchEmails();
  }, []);

  return (
    <div className="main__section">
      <div className="email__settings">
        <div className="email__list__settings">
          <IconButton>
            <CheckBoxOutlineBlankIcon/>
          </IconButton>
          <IconButton>
            <ArrowDropDownIcon/>
          </IconButton>
          <IconButton>
            <RefreshIcon/>
          </IconButton>
          <IconButton>
            <MoreVertIcon/>
          </IconButton>
        </div>
        <div className="email__list__pagination">
          <h3>1-50 of 133</h3>
          <IconButton>
            <KeyboardArrowLeftIcon className="arrow__left__icon"/>
          </IconButton>
          <IconButton>
            <KeyboardArrowRightIcon/>
          </IconButton>
        </div>
      </div>
      <div className="emails__section">
        <Section Icon={InboxIcon} text="Primary" selected={true} color="white"/>
        <Section Icon={LocalOfferIcon} text="Promotions" selected={false} color="yellow"/>
        <Section Icon={PeopleIcon} text="Social" selected={false} color="blue"/>
      </div>
      <div className="emails__rows">
        {emails.map(({ id, data: { receiver, subject, message, timestamp} }) => {
          const date = new Date(timestamp);
          return (
            <MailRow 
              id={id}
              key={id} 
              to={receiver} 
              subject={subject} 
              description={message}
              timestamp={timestamp} 
              time={new Date(timestamp?.seconds * 1000).toUTCString()} 
            />
          )
        })}
        {/* <MailRow id={1} to="Google" subject="Aktywacja nowego hasła" description="Witaj Daredvil__, próbowałeś zmienić swoje hasło" time="10 p.m"/>
        <MailRow id={2} to="Twitch" subject="Aktywacja nowego hasła" description="Witaj Daredvil__, próbowałeś zmienić swoje hasło blablablabla" time="9 p.m"/> */}
      </div>
    </div>
  )
}

export default MainBox;
