import { createUser } from "../util/auth";
import AuthContent from "../components/Auth/AuthContent";

function Signup() {
  function sinupHandler() {
    createUser();
  }
  return <AuthContent />;
}

export default Signup;
