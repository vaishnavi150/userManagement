import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Edit = () => {
  const params = useParams();
  
  let [submit, setSubmit] = useState(false);

  const [initialValues, setInitialValues] = useState({
    name: "",
    email: "",
    phone: "",
    username: "",
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: "",
    },
    website: "",
    company: {
      name: "",
      catchPhrase: "",
      bs: "",
    },
  });


  let navigate = useNavigate();

  const UserSchema = Yup.object().shape({
    name: Yup.string().required("* Required"),
    email: Yup.string().email("* Invalid Email").required("* Required"),
    phone: Yup.string().required("* Required"),
    company: Yup.object().shape({
      name: Yup.string().required("* Required"),
    }),
    address: Yup.object().shape({
      street: Yup.string().required("* Required"),
      city: Yup.string().required("* Required"),
      zipcode: Yup.string().required("* Required"),
    }),
  });

  const getData = async (id) => {
    setSubmit(true)
    try {
      let res = await axios.get(`https://jsonplaceholder.typicode.com/users/${params.id}`);
      if (res.status === 200) {
        setInitialValues(res.data);
      }

    } catch (error) {
      toast("Error Occoured");
    }
    finally {
      setSubmit(false);
    }
  };

  const handleEditUser = async (values) => {
    try {
      let res = await axios.put(`https://jsonplaceholder.typicode.com/users/${params.id}`, values);
      console.log(res)
      if (res.status === 200) {
        navigate("/");
      }
    } catch (error) {
      toast.error("Error Occoured");
    }
  };

  useEffect(()=>{
    if(Number(params.id))
    {
        getData(Number(params.id))
    }
    else
    {
      navigate('/dashboard')
    }
  },[])


  return (
    <>
      <div className="bg-orange-100 p-8 rounded-lg shadow-md w-full max-w-4xl mx-auto">
        <h3 className="text-2xl font-semibold mb-6">Edit Users</h3>
        <Formik
          initialValues={initialValues}
          validationSchema={UserSchema}
          enableReinitialize={true}
          onSubmit={(values) => {
            handleEditUser(values);
          }}>
          {({ values, errors, touched, handleBlur, handleSubmit, handleChange }) => (
            <form onSubmit={handleSubmit}>
             
              <div className="flex flex-col gap-4">
                <div className="flex flex-2 items-center space-x-2">
                  
                  <div className="flex flex-1 flex-col space-x-2">
                    <label className="block text-sm font-medium text-start mx-2">Name:</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter Name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.name}
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                        errors.name && touched.name ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                      }`}
                    />
                  </div>

                  {/* Username Field */}
                  <div className="flex flex-1 flex-col space-x-2">
                    <label className="block text-sm font-medium mx-2">Username:</label>
                    <input
                      type="text"
                      name="username"
                      placeholder="Enter Username"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.username}
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                        errors.username && touched.username ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                      }`}
                    />
                  </div>
                </div>
                <div className="flex-1">
                  {errors.name && touched.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
                  {errors.username && touched.username && <div className="text-red-500 text-sm mt-1">{errors.username}</div>}
                </div>

                {/* Email Field */}
                <div className="mb-4 flex-1">
                  <label className="block text-sm font-medium">Email:</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    className={`w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      errors.email && touched.email ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                    }`}
                  />
                  {errors.email && touched.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
                </div>


                {/* Phone Number Field */}
                <div className="mb-4 flex-1">
                  <label className="block text-sm font-medium">Phone Number:</label>
                  <input
                    type="text"
                    name="phone"
                    placeholder="Enter Phone Number"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.phone}
                    className={`w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      errors.phone && touched.phone ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                    }`}
                  />
                  {errors.phone && touched.phone && <div className="text-red-500 text-sm mt-1">{errors.phone}</div>}
                </div>

                {/* Suite Field */}
                <div className="mb-4 flex-1">
                  <label className="block text-sm font-medium">Suite:</label>
                  <input
                    type="text"
                    name="address.suite"
                    placeholder="Enter Suite"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.address?.suite}
                    className={`w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      errors.address?.suite && touched.address?.suite ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                    }`}
                  />
                  {errors.address?.suite && touched.address?.suite && <div className="text-red-500 text-sm mt-1">{errors.address?.suite}</div>}
                </div>

                <div className="flex justify-center items-center space-x-2">
                  {/* Street Field */}
                  <div className="mb-4 flex-1">
                    <label className="block text-sm font-medium">Street:</label>
                    <input
                      type="text"
                      name="address.street"
                      placeholder="Enter Street"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.address?.street}
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                        errors.address?.street && touched.address?.street ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                      }`}
                    />
                  </div>

                  {/* City Field */}
                  <div className="mb-4 flex-1">
                    <label className="block text-sm font-medium">City:</label>
                    <input
                      type="text"
                      name="address.city"
                      placeholder="Enter City"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.address?.city}
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                        errors.address?.city && touched.address?.city ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                      }`}
                    />
                  </div>

                  {/* Zipcode Field */}
                  <div className="mb-4 flex-1">
                    <label className="block text-sm font-medium">Zipcode:</label>
                    <input
                      type="text"
                      name="address.zipcode"
                      placeholder="Enter Zipcode"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.address?.zipcode}
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                        errors.address?.zipcode && touched.address?.zipcode ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                      }`}
                    />
                  </div>
                </div>

                <div className="flex-1">
                  {errors.address?.street && touched.address?.street && <div className="text-red-500 text-sm mt-1">{errors.address?.street}</div>}
                  {errors.address?.city && touched.address?.city && <div className="text-red-500 text-sm mt-1">{errors.address?.city}</div>}
                  {errors.address?.zipcode && touched.address?.zipcode && <div className="text-red-500 text-sm mt-1">{errors.address?.zipcode}</div>}
                </div>

                <div className="mb-4 flex-1">
                  <label className="block text-sm font-medium">Website:</label>
                  <input
                    type="text"
                    name="website"
                    placeholder="Enter Website URL"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.website}
                    className={`w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      errors.website && touched.website ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                    }`}
                  />
                  {errors.website && touched.website && <div className="text-red-500 text-sm mt-1">{errors.website}</div>}
                </div>

                {/* Company Name Field */}
                <div className="mb-4 flex-1">
                  <label className="block text-sm font-medium">Company Name:</label>
                  <input
                    type="text"
                    name="company?.name"
                    placeholder="Enter Company Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.company?.name}
                    className={`w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      errors.company?.name && touched.company?.name ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                    }`}
                  />
                  {errors.company?.name && touched.company?.name && <div className="text-red-500 text-sm mt-1">{errors.company?.name}</div>}
                </div>

                {/* Submit Button */}
                <div className="mb-4 flex-1">
                  <button
                    type="submit"
                    className={`w-1/2 py-2 px-4 rounded-md text-white font-semibold focus:outline-none ${
                      submit ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
                    }`}
                    disabled={submit}>
                    {submit ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Edit;
