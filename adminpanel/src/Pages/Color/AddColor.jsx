import React, { useEffect, useState } from "react";
import Sidebar from "../../common/Sidebar";
import Header from "../../common/Header";
import Breadcrumb from "../../common/Breadcrumb";
import Footer from "../../common/Footer";
import { ChromePicker } from "react-color";
import axios from "axios";
import { apiBaseUrl } from "../../config/apiBaseUrl";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";


export default function AddColor() {
  let [status, setStatus] = useState(false);
  const [colorPickerValue, setColorPickerValue] = useState('');
  let [formAllData, setFormAllData] = useState({
    colorName: '',
    colorPicker: '',
    colorStatus: 1
  })


  let navigater = useNavigate();

  let insertColor = (event) => {
    event.preventDefault();

    let obj = {
      colorName: event.target.colorName.value,
      colorPicker: event.target.colorPicker.value,
      colorStatus: event.target.colorStatus.value
    }
    axios.post(`${apiBaseUrl}color/insert`, obj)
      .then((res) => {
        console.log(res.data)
        if (res.data.status == 0) {
          let { error } = res.data;
          if (error.errorResponse.code == 11000)
            toast.error("Data not inserted")

        } else {
          toast.success(res.data.message)
          window.setTimeout(()=>{
            setStatus(true)
          },1000)
          event.target.reset();
        }
      })
  };
  useEffect(() => {
    if(status){
      setStatus(false)
      navigater('/colors/view-color')
    }
  }, [status])

  let getandsetValue = (event) => {
    let obj = { ...formAllData };
    obj[event.target.name] = event.target.value;
    setFormAllData(obj)
  }
  useEffect(() => {
    console.log(formAllData)
  }, [formAllData])

  let { id } = useParams();
  useEffect(() => {
    setFormAllData({
      colorName: '',
      colorPicker: '',
      colorStatus: 1
    })
    if (id !== undefined) {
      axios.get(`${apiBaseUrl}color/edit/${id}`)
        .then((res) => {
          if (res.data.status == 1) {
            let { colorName, colorPicker, colorStatus } = res.data.data;
            setFormAllData({
              colorName: colorName,
              colorPicker: colorPicker,
              colorStatus: colorStatus
            })
          }
        })
    }
  }, [id])
  return (
    <>
      <Breadcrumb path={"Colors"} path2={"Add Color"} slash={"/"} />
      <div className="w-full">
        <div className="max-w-[1220px] mx-auto py-5">
          <h3 className="text-[20px] font-semibold bg-slate-100 py-2 px-3 rounded-t-md border border-slate-400">
            Add colors
          </h3>
          <form className="p-3 border border-t-0 rounded-b-md border-slate-400" onSubmit={insertColor}>
            <div className="mb-5">
              <label
                for="base-input"
                className="block mb-5 text-md font-medium text-gray-900"
              >
                Color Name
              </label>
              <input
                type="text"
                name="colorName"
                onChange={getandsetValue}
                value={formAllData.colorName}
                id="base-input"
                className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3 "
                placeholder="Color Name"
              />
            </div>
            <div className="mb-5">
              <label
                for="base-input"
                className="block mb-8 text-md font-medium text-gray-900"
              >
                Color Picker
              </label>

              {/* <input type="color" name="colorPicker" id="" value={''} /> */}
              <input
                type="color"
                name="colorPicker"
                onChangeCapture={getandsetValue}
                value={colorPickerValue}
                onChange={(e) => setColorPickerValue(e.target.value)}
              />

              <br />
            </div>
            <div className="pe-5 ps-1">
              <span className="flex items-center gap-3">
                Status :
                <input
                  id="link-radio"
                  name="colorStatus"
                  type="radio"
                  value={1}
                  onChange={getandsetValue}
                  checked={formAllData.colorStatus == true ? true : ''}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
                ></input>
                Active
                <input
                  id="link-radio"
                  name="colorStatus"
                  type="radio"
                  value={0}
                  onChange={getandsetValue}
                  checked={formAllData.colorStatus == false ? true : ''}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
                ></input>
                Deactive
              </span>
            </div>
            <button
              type="submit"
              className="focus:outline-none my-10 text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
            >
              Select Color
            </button>
          </form>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}
