import React from 'react'

const Modal = ({title, onClose, children}) => {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
      <div className='bg-white p-6 rounded-xl w-[90%] max-w-md relative shadow-xl'>
        <button
          onClick={onClose}
          className="absolute mt-5 mr-3 right-4 text-gray-600 hover:text-red-600 hover:font-bold text-4xl"
        >
            &times;
        </button>
        <h2 className='text-3xl font-mono text-center mb-7'>{title}</h2>
        {children}
      </div>
    </div>
  )
}

export default Modal

