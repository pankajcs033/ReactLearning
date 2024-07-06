import { redirect } from "react-router-dom";

export function getAuthToken() {
  const token = localStorage.getItem("token");
  if (!token) return null;
  return token;
}

export function loader() {
  return getAuthToken();
}

export function checkAuthLoader() {
  const token = getAuthToken();
  if (!token) {
    return redirect("/auth");
  }
  return null;
}

export function getExpirationDuration() {
  const storedExpiration = localStorage.getItem("expiration");
  const expiration = new Date(storedExpiration);
  const currDate = new Date();
  const duration = expiration.getTime() - currDate.getTime();

  if (duration < 0) {
    return "EXPIRED";
  }

  return duration;
}
