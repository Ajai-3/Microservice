import React, { useState } from 'react'
import { toast } from 'react-toastify'

const CreateSnippet = () => {
    const [snippet, setSnippet] = useState({
        title: '',
        code: ''
    })

    const handleFormSubmit = (e) => {
        e.preventDefault();

        if(snippet.title === '' || snippet.code === '') {
          return toast.error('Please fill all the fields');
        } else if (snippet.title.length < 3) {
          return  toast.error('Title must be at least 3 characters');
        } else if (snippet.code.length < 10) {
          return  toast.error('Code must be at least 10 characters');
        } 
  
        return toast.success("Snippet created successfully");

    }

  return (
    <div className='flex justify-center h-screen mt-10'>
      <form onSubmit={handleFormSubmit}>
        <div className='flex flex-col gap-4 w-[500px]'>
          <input
            value={snippet.title}
            onChange={(e) => setSnippet({ ...snippet, title: e.target.value })}
            className='border border-white p-2 rounded-md focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500'
            type="text"
            name="title"
            id="title"
            placeholder='Title'
          />
          <textarea
            value={snippet.code}
            onChange={(e) => setSnippet({ ...snippet, code: e.target.value })}
            className='border border-white p-2 h-40 rounded-md focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500'
            name="code"
            id="code"
            placeholder='Write code snippet'
          ></textarea>
          <button
            className='rounded-md p-2 bg-green-500 text-white hover:bg-green-600 transition cursor-pointer'
            type="submit"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateSnippet
