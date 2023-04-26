import { createSlice } from '@reduxjs/toolkit';

export const mailSlice = createSlice({
  name: 'mail',
  initialState: {
    mailPopupOpen: false,
    mailInfo: null,
  },
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    openMailPopup: (state, action) => {
      state.mailPopupOpen = true;
    },
    openEmail: (state, action) => {
      state.mailInfo = action.payload;
    },
    closeMailPopup: (state, action) => {
      state.mailPopupOpen = false;
    }
  },
});

export const { openMailPopup, openEmail, closeMailPopup } = mailSlice.actions;

export const selectMailInfo = (state) => state.mail.mailInfo;
export const selectMailPopupInfo = (state) => state.mail.mailPopupOpen;

export default mailSlice.reducer;
