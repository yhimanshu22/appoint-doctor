import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import { setUser } from "../redux/features/userSlice";
import rootUrl from "../Data/proxy";

export default function ProtectedRoute({ children }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const getUser = async () => {
      try {
        dispatch(showLoading());
        const res = await axios.get( // Change to axios.get()
          `${rootUrl}/api/v1/user/getUserData`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        dispatch(hideLoading());
        if (res.data.success) {
          dispatch(setUser(res.data.data));
        } else {
          localStorage.clear();
          return <Navigate to="/login" replace />; // Correct redirect
        }
      } catch (error) {
        localStorage.clear();
        dispatch(hideLoading());
        console.error(error); // Use console.error for errors
        return <Navigate to="/login" replace />; // Redirect on error
      }
    };

    if (!user) {
      getUser();
    }
  }, [user, dispatch]);

  if (localStorage.getItem("token")) {
    if (user) {
      return children;
    } else {
      return null; //or a loading indicator.
    }
  } else {
    return <Navigate to="/login" replace />;
  }
}