import React from 'react'
import { TbFaceIdError } from "react-icons/tb";

function ErrorPage() {
  return (
    <div className="h-screen w-screen flex flex-row  items-center justify-center"><div className='flex'><div className="loading-icon-container flex flex-col gap-6 w-62 items-center">
    <TbFaceIdError className="text-pink-900 flex text-2xl" />
    <div className="text-pink-900">Unexpected Error Occured </div>
  </div></div></div>
  )
}

export default ErrorPage