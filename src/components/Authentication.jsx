import { useState } from "react";

const Authentication = () => {
  const [isRegistration, setIsRegistration] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authenticating, setAuthenticating] = useState(false);

  async function handleAuthenticate() {}

  return (
    <>
      <h2 className="sign-up-test">{isRegistration ? "Sign up" : "Login"}</h2>
      <p>Sign in to your account</p>
      <input
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        placeholder="Email"
      />
      <input
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        placeholder="*******"
        type="password"
      />
      <button onClick={handleAuthenticate}>
        <p>Submit</p>
      </button>
      <hr />
      <div className="register-content">
        <p>Don&apos;t have an account</p>
        <button
          onClick={() => {
            setIsRegistration(!isRegistration);
          }}
        >
          <p>{isRegistration ? "Sign in" : "Sign up"}</p>
        </button>
      </div>
    </>
  );
};

export default Authentication;
