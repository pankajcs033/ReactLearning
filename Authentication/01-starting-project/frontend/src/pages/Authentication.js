import { json, redirect } from "react-router-dom";
import AuthForm from "../components/AuthForm";

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({ request }) {
  // get params
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login";

  const formData = await request.formData();
  // create data object
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  // if invalid mode
  if (mode !== "login" && mode !== "signup") {
    throw json({ message: "Unsupported Mode" }, { status: 422 });
  }

  // send request to backend
  const response = await fetch("http://localhost:8080/" + mode, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  });

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Authentication Failed" }, { status: 500 });
  }

  const resData = await response.json();
  const token = resData.token;
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1); // increare hour by 1
  //handle token
  localStorage.setItem("token", token);
  localStorage.setItem("expiration", expiration.toISOString());

  return redirect("/");
}
