import React from 'react'

export default function Breadcrumb({path,path2,slash}) {
  return (
<nav className="flex border-b-2" aria-label="Breadcrumb">
  <ol className="p-3 px-6 inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
    <li className="inline-flex items-center">
      <a href="#" className="inline-flex items-center text-md font-medium text-gray-700 hover:text-blue-600">
        Home
      </a>
    </li>
    <li>
      <div className="flex items-center">
        /
        <a href="#" className="ms-1 text-md font-medium text-gray-700 hover:text-blue-600 md:ms-2">{path}</a>
      </div>
    </li>
    <li aria-current="page">
      <div className="flex items-center">
        {slash}
        <span className="ms-1 text-md font-medium text-gray-500 md:ms-2">{path2}</span>
      </div>
    </li>
  </ol>
</nav>

  )
}
