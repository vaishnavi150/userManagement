import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Edit = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [submit, setSubmit] = useState(false);

  const [initialValues, setInitialValues] = useState({
    name: "",
    email: "",
    phone: "",
    username: "",
    company: {
      name: "",
    },
  });

  const UserSchema = Yup.object().shape({
    name: Yup.string().required("* Required"),
    email: Yup.string().email("* Invalid Email").required("* Required"),
    phone: Yup.string().required("* Required"),
    username: Yup.string().required("* Required"),
    company: Yup.object().shape({
      name: Yup.string().required("* Required"),
    }),
  });

  const getData = async (id) => {
    setSubmit(true);
    try {
      let res = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${params.id}`
      );
      if (res.status === 200) {
        setInitialValues(res.data);
      }
    } catch (error) {
      toast.error("Error occurred while fetching user data");
    } finally {
      setSubmit(false);
    }
  };

  const handleEditUser = async (values) => {
    try {
      let res = await axios.put(
        `https://jsonplaceholder.typicode.com/users/${params.id}`,
        values
      );
      if (res.status === 200) {
        toast.success("User updated successfully");
        navigate("/");
      }
    } catch (error) {
      toast.error("Error occurred while updating user");
    }
  };

  useEffect(() => {
    if (Number(params.id)) {
      getData(Number(params.id));
    } else {
      navigate("/dashboard");
    }
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
          Edit User
        </h3>
        <Formik
          initialValues={initialValues}
          validationSchema={UserSchema}
          enableReinitialize={true}
          onSubmit={(values) => {
            handleEditUser(values);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleSubmit,
            handleChange,
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Name:
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name}
                    className={`w-full px-4 py-2 border ${
                      errors.name && touched.name
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  {errors.name && touched.name && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.name}
                    </div>
                  )}
                </div>

                {/* Username Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Username:
                  </label>
                  <input
                    type="text"
                    name="username"
                    placeholder="Enter Username"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.username}
                    className={`w-full px-4 py-2 border ${
                      errors.username && touched.username
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  {errors.username && touched.username && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.username}
                    </div>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Email:
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    className={`w-full px-4 py-2 border ${
                      errors.email && touched.email
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  {errors.email && touched.email && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.email}
                    </div>
                  )}
                </div>

                {/* Phone Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Phone Number:
                  </label>
                  <input
                    type="text"
                    name="phone"
                    placeholder="Enter Phone Number"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.phone}
                    className={`w-full px-4 py-2 border ${
                      errors.phone && touched.phone
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  {errors.phone && touched.phone && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.phone}
                    </div>
                  )}
                </div>

                {/* Company Name Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Company Name:
                  </label>
                  <input
                    type="text"
                    name="company.name"
                    placeholder="Enter Company Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.company?.name}
                    className={`w-full px-4 py-2 border ${
                      errors.company?.name && touched.company?.name
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  {errors.company?.name && touched.company?.name && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.company?.name}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 flex justify-center">
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  Save Changes
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Edit;
