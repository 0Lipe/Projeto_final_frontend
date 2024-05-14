import axios from 'axios';
import React, { useState } from 'react';

const RegisterPage = () => {
  const url = 'https://lsfelipels.pythonanywhere.com/api/signup';
  const [data, setData] = useState({
    username: '',
    email: '',
    password: ''
  });

  function submit(e) {
    e.preventDefault();
    axios.post(url, {
      username: data.username,
      password: data.password,
      email: data.email
    })
    .then(res => {
      console.log(res.data);
    })
    .catch(error => {
      console.error('Erro ao enviar requisição POST:', error);
    });
  }

  function handle(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
    console.log(newdata);
  }

  return (
    <div>
      <form onSubmit={(e) => submit(e)}>
        <input onChange={(e) => handle(e)} value={data.username} type='text' id='username' placeholder='User Name' />
        <input onChange={(e) => handle(e)} value={data.password} type='password' id='password' placeholder='Password' />
        <input onChange={(e) => handle(e)} value={data.email} type='email' id='email' placeholder='Email' />
        <input type='submit' />
      </form>
    </div>
  );
};

export default RegisterPage;
