import React, { useState } from 'react'
import './MailPopup.css';
import MinimizeOutlinedIcon from '@mui/icons-material/MinimizeOutlined';
import OpenInFullOutlinedIcon from '@mui/icons-material/OpenInFullOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Button, IconButton } from '@mui/material';
import { useDispatch } from 'react-redux';
import { closeMailPopup } from '../features/mailSlice';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/firebase';

const MailPopup = () => {

  const [inputs, setInputs] = useState({
    receiver: "",
    subject: "",
    message: "",
  });
  const dispatch = useDispatch();

  const handleClosePopup = (e) => {
    dispatch(closeMailPopup());
  } 

  const handleInputChange = (e) => {
    setInputs((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      };
    });
  }

  const handleMailSend = async(e) => {
    e.preventDefault();
    try {
      const emailRef = await addDoc(collection(db, "emails"), {
        receiver: inputs.receiver,
        subject: inputs.subject,
        message: inputs.message,
        timestamp: serverTimestamp()
      });
      setInputs("");
      dispatch(closeMailPopup());
    } catch(error) {
      console.error("Error adding document");
    }
  }

  return (
    <div className="mail__popup">
      <div className="mail__popup__header">
        <h3>New Message</h3>
        <div className="mail__popup__icons">
          <IconButton>
            <MinimizeOutlinedIcon/>
          </IconButton>
          <IconButton>
            <OpenInFullOutlinedIcon/>
          </IconButton>
          <IconButton onClick={handleClosePopup} className="close__btn__popup">
            <CloseOutlinedIcon/>
          </IconButton>
        </div>
      </div>
      <form onSubmit={handleMailSend} className="form__mail__popup">
        <input 
          name="receiver" required
          onChange={handleInputChange}
          value={inputs.receiver} 
          className="first__input" 
          type="email" 
          placeholder="To" />
        <input 
          name="subject" 
          onChange={handleInputChange}
          value={inputs.subject} 
          className="second__input" 
          type="text" 
          placeholder='Subject'/>
        <input 
          name="message" required
          value={inputs.message}
          onChange={handleInputChange} 
          className="third__input" 
          type="text" 
          placeholder="Message..."/>
        <div className="form__options">
          <Button onClick={handleMailSend} variant="contained" color="primary" type="submit">Send</Button>
        </div>
      </form>
    </div>
  )
}

export default MailPopup;