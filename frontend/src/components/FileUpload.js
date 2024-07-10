import React, { useState } from 'react';
import { uploadFile } from '../services/file.js';

const FileUpload = ({ socket }) => {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await uploadFile(formData, (event) => {
      setUploadProgress(Math.round((100 * event.loaded) / event.total));
    });

    socket.emit('transfer-file', {
      filePath: response.data.filePath,
      recipient: 'recipient_socket_id', //You have to give your own ids
    });
  };

  socket.on('file-uploaded', (data) => {
    console.log('File uploaded:', data);
    alert(`File ${data.filename} uploaded successfully!`);
  });

  return (
    <div className="container">
      <h1>Upload and Transfer File</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload & Transfer</button>
      {uploadProgress > 0 && <div>Upload Progress: {uploadProgress}%</div>}
    </div>
  );
};

export default FileUpload;




