import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import DoctorList from "../components/DoctorList";
import rootUrl from "../Data/proxy";

const HomePage = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getUserData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${rootUrl}/api/v1/user/getAllDoctors`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (res.data.success) {
        setDoctors(res.data.data);
      } else {
        setError(res.data.message || "Failed to fetch doctors.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while fetching doctors.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline">{error}</span>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {doctors.length > 0 ? (
          doctors.map((doctor) => (
            <div key={doctor._id}>
              <DoctorList doctor={doctor} />
            </div>
          ))
        ) : (
          <div className="text-center w-full">
            <p className="text-gray-600">No doctors available.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default HomePage;