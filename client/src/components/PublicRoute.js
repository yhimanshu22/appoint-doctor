import React from "react";
import { Navigate } from "react-router-dom";

export default function PublicRoute({ children }) {
  if (localStorage.getItem("token")) {
    return <Navigate to="/" replace />; // Added 'replace'
  } else {
    return children;
  }
}
