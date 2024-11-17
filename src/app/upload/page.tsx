'use client'
import React, { useState } from 'react'

const UploadForm = () => {
  const [files, setFiles] = useState<File[]>([])
  const [message, setMessage] = useState<string>('')

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files
    if (selectedFiles) {
      setFiles(Array.from(selectedFiles))
    }
  }

  const handleUpload = async () => {
    if (files.length === 0) {
      setMessage('Please select files to upload')
      return
    }

    const formData = new FormData()
    files.forEach(file => {
      formData.append('files', file)
    })

    try {
      const response = await fetch('/system/upload', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        setMessage('Files uploaded successfully!')
      } else {
        const errorData = await response.json()
        setMessage(`Upload failed: ${errorData.error}`)
      }
    } catch (error) {
      setMessage('Upload failed')
      console.error(error)
    }
  }

  return (
    <div>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {message && <p>{message}</p>}
    </div>
  )
}

export default UploadForm
