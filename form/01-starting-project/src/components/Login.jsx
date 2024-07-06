import { useRef, useState } from "react";

export default function Login() {
  let email = "";
  let password = "";
  const emailRef = useRef();
  const passwordRef = useRef();

  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    email = emailRef.current.value;
    password = passwordRef.current.value;

    if (!(email && email.includes("@"))) {
      setIsEmailValid(true);
      return;
    }
    if (!(password && password.length > 8)) {
      setIsPasswordValid(true);
      return;
    }
    console.log("Submitted!");

    console.log(email, password);
  }

  // function handleReset() {
  // emailRef.current.value = ""; // not suggested
  // passwordRef.current.value = "";
  // }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" ref={emailRef} />
          {isEmailValid && (
            <p className="control-error">Please enter a valid email</p>
          )}
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            ref={passwordRef}
          />
          {isPasswordValid && (
            <p className="control-error">Please enter a valid password</p>
          )}
        </div>
      </div>

      <p className="form-actions">
        <button type="reset" className="button button-flat">
          Reset
        </button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
