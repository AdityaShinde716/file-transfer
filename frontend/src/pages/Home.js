import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import FileUpload from '../components/FileUpload.js';
import { getAuthHeader } from '../services/auth.js';

const Home = ({ socket }) => {
  const history = useHistory();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      history.push('/login');
    } else {
      socket.on('receive-file', (data) => {
        console.log('File received:', data);
        alert(`File ${data.filename} received successfully!`);
      });
    }
  }, [socket, history]);

  return (
    <div className="container">
      <h1>Home</h1>
      <FileUpload socket={socket} />
    </div>
  );
};

export default Home;







