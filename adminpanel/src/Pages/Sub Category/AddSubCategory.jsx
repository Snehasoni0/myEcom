import React, { useEffect, useState } from "react";
import Breadcrumb from "../../common/Breadcrumb";
import axios from "axios";
import { apiBaseUrl } from "../../config/apiBaseUrl";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";


export default function AddSubCategory() {
  let [data, setData] = useState([]);
  let [status, setStatus] = useState(false);
  let [preview, setPreview] = useState(`https://www.shutterstock.com/image-vector/no-preview-image-icon-260nw-1295324875.jpg`);

  let [formAllData, setFormAllData] = useState({
    subCategoryName: '',
    subcatDescription: '',
    status: 1
  })


  let getCategory = () => {
    axios.get(`http://localhost:8000/admin/subcategory/parent-category`)
      .then((res) => {
        return res.data;
      })
      .then((finalRes) => {
        if (finalRes.status == 1) {
          setData(finalRes.data);
        }
      })
  };

  useEffect(() => {
    getCategory();
  }, [])


  let navigater = useNavigate()
  let saveForm = (event) => {
    event.preventDefault();
    let formData = new FormData(event.target);
    if (id !== undefined && id !== "") {
      axios.put(`${apiBaseUrl}subcategory/update-subcategory/${id}`, formData)
        .then((res) => {
          if (res.data.status == 0) {
            let { error } = res.data;
            if (error.errorResponse.code == 11000)
              toast.error(error.errorResponse.errmsg)

          } else {
            toast.success("Data Updated")
            window.setTimeout(() => {
              setStatus(true)
            }, 1000);
            event.target.reset();

          }
        })
    }
    else {
      axios.post(`${apiBaseUrl}subcategory/insert`, formData)
        .then((res) => {
          if (res.data.status == 0) {
            let { error } = res.data;
            if (error.errorResponse.code == 11000)
              toast.error(error.errorResponse.errmsg)

          } else {
            toast.success(res.data.message)
            window.setTimeout(() => {
              setStatus(true)
            }, 1000);
            event.target.reset();

          }
        })
    }

  }

  useEffect(() => {
    if (status) {
      setStatus(false)
      navigater('/sub-category/view-sub-category')
    }

  }, [status])

  let getImage = (event) => {
    console.log(event.target.files[0])
    setPreview(URL.createObjectURL(event.target.files[0]))
  }

  let { id } = useParams();
  // console.log(urlData)
  useEffect(() => {
    setFormAllData({
      subCategoryName: '',
      subcatDescription: '',
      status: 1
    })
    setPreview(`https://www.shutterstock.com/image-vector/no-preview-image-icon-260nw-1295324875.jpg`)
    if (id !== undefined) {
      axios.get(`${apiBaseUrl}subcategory/edit-subcategory/${id}`)
        .then((res) => {
          if (res.data.status == 1) {
            let { subCategoryName, subCategoryImage, subCategoryDescription, subCategorystatus } = (res.data.data)
            setFormAllData({
              subCategoryName: subCategoryName,
              subcatDescription: subCategoryDescription,
              status: subCategorystatus
            })
            setPreview(res.data.path + subCategoryImage)
          }
        })
    }
  }, [id])


  let getandsetValue = (event) => {
    let obj = { ...formAllData }
    obj[event.target.name] = event.target.value;
    setFormAllData(obj)
  }

  useEffect(() => {
    console.log(formAllData)
  }, [formAllData])

  return (
    <section className="w-full">
      <Breadcrumb
        path={"Sub Category"}
        path2={"Add Sub Category"}
        slash={"/"}
      />
      <div className="w-full min-h-[610px]">
        <div className="max-w-[1220px] mx-auto py-5">
          <h3 className="text-[26px] font-semibold bg-slate-100 py-3 px-4 rounded-t-md border border-slate-400">
            Add Sub Category
          </h3>
          <form className="border border-t-0 p-3 rounded-b-md border-slate-400" onSubmit={saveForm}>
            <div className="mb-5">
              <label
                for="base-input"
                className="block mb-5 text-md font-medium text-gray-900"
              >
                Category Name
              </label>
              <input
                type="text"
                name="subCategoryName"
                onChange={getandsetValue}
                value={formAllData.subCategoryName}
                id="base-input"
                className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3 "
                placeholder="Category Name"
              />
            </div>
            <div className="mb-5">
              <label
                for="base-input"
                className="block mb-5 text-md font-medium text-gray-900"
              >
                Parent Category Name
              </label>

              <select
                id="default"
                name="parentCatName"
                className=" border-2 border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
              >
                <option selected>--Select Category--</option>
                {data.length >= 1
                  ?
                  data.map((item, index) => {
                    return (
                      <option value={item._id}>{item.categoryName}</option>
                    )
                  })
                  :
                  ''
                }


              </select>
            </div>
            <div className="mb-5">
              <div className="grid grid-cols-2 gap-10">
                <div>
                  <label
                    for="base-input"
                    className="block mb-5 text-md font-medium text-gray-900"
                  >
                    Category Image
                  </label>
                  <label for="file-input" className="sr-only">
                    Choose file
                  </label>
                  <input
                    onChange={getImage}
                    type="file"
                    name="subCatImage"
                    id="file-input"
                    className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none  
    file:bg-gray-50 file:border-0
    file:me-4
    file:py-3 file:px-4
    "
                    multiple
                  />
                </div>
                <div>
                  <img src={preview} width={100} alt="" />
                </div>
              </div>
            </div>
            <div className="mb-5">
              <label
                for="base-input"
                className="block mb-5 text-md font-medium text-gray-900"
              >
                Category Description
              </label>
              <textarea
                value={formAllData.subcatDescription}
                id="message"
                name="subcatDescription"
                onChange={getandsetValue}
                rows="3"
                className=" resize-none block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                placeholder="Add Product Description....."
              ></textarea>
            </div>
            <div className="pe-5 ps-1">
              <span className="flex items-center gap-3">
                Status :
                <input
                  id="link-radio"
                  name="status"
                  onChange={getandsetValue}
                  type="radio"
                  value={1}
                  checked={formAllData.status == true ? true : ''}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
                ></input>
                Active
                <input
                  id="link-radio"
                  name="status"
                  onChange={getandsetValue}
                  type="radio"
                  value={0}
                  checked={formAllData.status == false ? true : ''}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
                ></input>
                Deactive
              </span>
            </div>
            <button
              type="submit"
              className="focus:outline-none my-10 text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
            >
              Add Sub Category
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
}
