import React from 'react'
import { SiPrintables } from "react-icons/si";
function ModalHead({heading}) {
  return (
    <h2 className="text-lg flex justify-center font-bold text-pink-900 mb-4">
    <SiPrintables fontSize={16} />
    <p className="quantico-regular text-sm   px-3">{heading}</p>
  </h2>
  )
}

export default ModalHead