import React from "react";
import Layout from "./../components/Layout";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import rootUrl from "../Data/proxy";

const NotificationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  // Handle marking all notifications as read
  const handleMarkAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        `${rootUrl}/api/v1/user/get-all-notification`,
        {
          userId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(hideLoading());

      if (res.data.success) {
        alert("Marked all notifications as read");
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      alert("Something went wrong");
    }
  };

  // Handle deleting all read notifications
  const handleDeleteAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        `${rootUrl}/api/v1/user/delete-all-notification`,
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        alert("Deleted all read notifications");
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      alert("Something went wrong with notifications");
    }
  };

  return (
    <Layout>
      <div className="p-6 bg-gray-100 min-h-screen">
        <h4 className="text-2xl font-semibold text-center mb-6">Notification Page</h4>
        <div className="bg-white shadow-md rounded-lg">
          <div className="border-b border-gray-200">
            <div className="flex border-b">
              <button
                className="w-1/2 p-4 text-blue-500 font-semibold border-b-2 border-transparent hover:border-blue-500"
                onClick={() => document.getElementById('unread').scrollIntoView()}
              >
                Unread
              </button>
              <button
                className="w-1/2 p-4 text-blue-500 font-semibold border-b-2 border-transparent hover:border-blue-500"
                onClick={() => document.getElementById('read').scrollIntoView()}
              >
                Read
              </button>
            </div>
          </div>
          <div id="unread" className="p-4">
            <div className="flex justify-end mb-4">
              <button
                className="text-blue-600 hover:text-blue-800 font-semibold"
                onClick={handleMarkAllRead}
              >
                Mark All Read
              </button>
            </div>
            {user?.notifcation.map((notificationMgs) => (
              <div
                key={notificationMgs._id}
                className="bg-white p-4 mb-2 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50"
                onClick={() => navigate(notificationMgs.onClickPath)}
              >
                {notificationMgs.message}
              </div>
            ))}
          </div>
          <div id="read" className="p-4">
            <div className="flex justify-end mb-4">
              <button
                className="text-red-600 hover:text-red-800 font-semibold"
                onClick={handleDeleteAllRead}
              >
                Delete All Read
              </button>
            </div>
            {user?.seennotification.map((notificationMgs) => (
              <div
                key={notificationMgs._id}
                className="bg-white p-4 mb-2 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50"
                onClick={() => navigate(notificationMgs.onClickPath)}
              >
                {notificationMgs.message}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotificationPage;
