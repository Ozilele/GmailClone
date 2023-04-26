import { getDocs, collection, query, orderBy } from "firebase/firestore"; 
import { db } from "./firebase";

export const getEmails = async() => {
  const emailsCollection = query(collection(db, 'emails'), orderBy('timestamp', 'desc'));
  const emails_ref = await getDocs(emailsCollection);
  const data = [];

  emails_ref.forEach((email) => {
    data.push({
      id: email.id,
      data: email.data(),
    });
  });

  return data;
}