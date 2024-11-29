import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import SkeletonTable from "../common/Loading"

function Dashboard() {
  
  let [loading,setLoading] = useState(true)
  const [isDark, setIsDark] = useState(false);
  const [data, setData] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const fetchData = async () => {
    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/users");
      console.log(res);
      if (res.status === 200) {
        setData(res.data);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  let handleDelete = async (id, index) => {
    try {
      
      let res = await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      
      if (res.status === 200) {
        let newArray = [...data];
        newArray.splice(index, 1);
        setData(newArray);
        toast.success("User deleted successfully");
      }
    } catch (error) {
      toast.error("Error Occurred while deleting");
      console.error("Error deleting user:", error);
    }
  };
  

  return (
    <>
      <div className={`w-full ${isDark ? "bg-[#202124] text-[#e8eaed]" : "bg-orange-100 text-[#1f1f1f]"} min-h-screen`}>
        <div className="flex justify-between items-center p-4">
          <h1 className="text-xl font-bold">User Table</h1>
          <button className="border border-gray-300 rounded p-2 transition" onClick={() => setIsDark(!isDark)}>
            <span className="material-icons">{isDark ? "light_mode" : "dark_mode"}</span>
          </button>
        </div>
        <div className="px-3">
          <div className="m-0 p-0">
            <div className="mt-5 mx-2">
              <div className="flex justify-between items-center p-4">
                <h4 className="text-lg font-semibold">All Users</h4>
                <button className="border border-gray-300 rounded p-2 transition">
                  <span className="material-icons" onClick={() => navigate("/addusers")}>
                    person_add
                  </span>
                </button>
              </div>

              <div className="overflow-x-auto">
              {
                      loading ?<SkeletonTable rows={10} cols={4} />
                      :
                <>
                <table className="min-w-full text-sm table-auto border-collapse border border-gray-300 dark:border-gray-700">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-[#2d2f31] dark:text-[#dadce0]">
                      <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">ID</th>
                      <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Name</th>
                      <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Username</th>
                      <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Email</th>
                      <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Phone Number</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                      {data &&
                        data.map((e, i) => (
                          <tr key={i} className="bg-gray-50 dark:bg-[#282828] dark:text-[#9aa0a6]">
                            <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 ">{e.id}</td>
                            <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{e.name}</td>
                            <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{e.username}</td>
                            <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{e.email}</td>
                            <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">{e.phone}</td>
                            <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                              <button
                                onClick={() => {
                                  navigate(`/edit/${e.id}`);
                                }}
                                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
                                Edit
                              </button>
                              &nbsp; &nbsp;
                              <button
                               onClick={()=>handleDelete(e.id,i)}
                                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300">
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                  
                  </tbody>
                </table>
              </>
                  }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
