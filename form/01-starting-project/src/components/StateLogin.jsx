import Input from "./Input";
import useInput from "../hook/useInput";
import { isNotEmpty, isEmail, hasMinLength } from "../util/validation.js";

export default function Login() {
  const {
    value: email,
    handleBlur: handleEmailBlur,
    handleChange: handleEmailChange,
    hasError: isEmailValid,
  } = useInput("", (value) => isEmail(value) && isNotEmpty(value));

  const {
    value: password,
    handleBlur: handlePasswordBlur,
    handleChange: handlePasswordChange,
    hasError: isPasswordValid,
  } = useInput("", (value) => hasMinLength(value, 6));

  function handleSubmit(event) {
    event.preventDefault();
    if (isEmailValid || isPasswordValid) return;
    console.log("Submitted!");
    console.log(email, password);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <Input
          label="Email"
          name="email"
          type="email"
          id="email"
          value={email}
          onBlur={handleEmailBlur}
          onChange={handleEmailChange}
          error={isEmailValid && "Please enter a valid email"}
        />

        <div className="control no-margin">
          <Input
            label="Password"
            name="password"
            type="password"
            id="password"
            value={password}
            onBlur={handlePasswordBlur}
            onChange={handlePasswordChange}
            error={isPasswordValid && "Please enter a valid password"}
          />
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
