import axios from "axios";

const API_KEY = "AIzaSyDuEo5AqWF5d5j6ZJ_wbeyMBrpe6QtJxao";

async function createUser(email, password) {
  const response = await axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
    {
      email:email,
      password:password,
      returnSecureToken: true,
    }
  );
  const token = response.data.idToken;
  return token;
}