import axios from "axios";

const API_KEY = "AIzaSyDuEo5AqWF5d5j6ZJ_wbeyMBrpe6QtJxao";
//the difference between the two URL's from firebase that are ment to either create a new user or signing
// up as an existing user is the "signUp" and "signInWithPassword" at the end of the URL

async function authenticate(mode, email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;
  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });
  //idToken from firebase
  const token = response.data.idToken;
  return token;
}

export function createUser(email, password) {
  const token = authenticate("signUp", email, password);
}

export function login(email, password) {
  const token = authenticate("signInWithPassword", email, password);
}
