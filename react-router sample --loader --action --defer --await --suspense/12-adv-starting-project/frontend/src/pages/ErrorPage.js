import React from "react";
import { Link, useRouteError } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

export default function ErrorPage() {
  const error = useRouteError();
  let title = "Path not found";
  let message = "requested path not available";

  if (error.status === 500) {
    message = error.data.message;
    title = "500 DATA NOT FOUND";
  }

  if (error.status === 404) {
    message = "requested resources are not available";
    title = "404 NOT FOUND";
  }

  return (
    <div>
      <MainNavigation />
      <h1>{title}</h1>
      <p>{message}</p>
      <Link to=".." relative="route">
        BACK TO HOME
      </Link>
    </div>
  );
}
