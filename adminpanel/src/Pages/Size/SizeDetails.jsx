import React, { useEffect, useState } from "react";
import Sidebar from "../../common/Sidebar";
import Header from "../../common/Header";
import Breadcrumb from "../../common/Breadcrumb";
import Footer from "../../common/Footer";
import axios from "axios";
import { apiBaseUrl } from "../../config/apiBaseUrl";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SizeDetails() {
  let [status, setStatus] = useState(false);

  let navigater = useNavigate();
  let sizeInsert = (event) => {
    event.preventDefault();
    let obj = {
      sizeName: event.target.sizeName.value,
      sizeStatus: event.target.sizeStatus.value
    }
    // console.log(obj)
    axios.post(`${apiBaseUrl}size/insert`, obj)
      .then((res) => {
        console.log(res.data)
        if (res.data.status == 0) {
          let { error } = res.data;
          if (error.errorResponse.code == 11000)
            toast.error("Data not inserted")

        } else {
          toast.success(res.data.message)
          window.setTimeout(() => {
            setStatus(true)
          }, 1000)
          event.target.reset();
        }
      })
  };

  useEffect(() => {
    if(status)
    {
      setStatus(false)
      navigater(`/size/view-size`)
    }
  },[status])
  return (
    <>
      <Breadcrumb path={"Size"} path2={"Size Details"} slash={"/"} />
      <div className="w-full min-h-[610px]">
        <div className="max-w-[1220px] mx-auto py-5">
          <h3 className="text-[26px] font-semibold bg-slate-100 py-3 px-4 rounded-t-md border border-slate-400">
            Add Size
          </h3>
          <form className="border border-t-0 p-3 rounded-b-md border-slate-400" onSubmit={sizeInsert}>
            <div className="mb-5">
              <label
                for="base-input"
                className="block mb-5 text-md font-medium text-gray-900"
              >
                Size Name
              </label>
              <input
                type="text"
                name="sizeName"
                id="base-input"
                className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3 "
                placeholder="Size Name"
              />
            </div>
            <div className="pe-5 ps-1">
              <span className="flex items-center gap-3">
                Status :
                <input
                  id="link-radio"
                  name="sizeStatus"
                  type="radio"
                  value="true"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
                ></input>
                Active
                <input
                  id="link-radio"
                  name="sizeStatus"
                  type="radio"
                  value="false"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
                ></input>
                Deactive
              </span>
            </div>
            <button
              type="submit"
              className="focus:outline-none my-10 text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
            >
              Add Size
            </button>
          </form>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}
