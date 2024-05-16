import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const RegisterPage = () => {

  const history = useNavigate();

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
      alert('Registro realizado com sucesso!');
      history('/');
    })
    .catch(error => {
      console.error('Erro ao enviar requisição POST:', error);
      if (error.response && error.response.data && error.response.data.username && error.response.data.username.length > 0) {
        // Se a resposta contiver uma mensagem de erro de nome de usuário, exiba-a
        alert(error.response.data.username[0]);
      } else {
        // Lidar com outros erros
        alert("Ocorreu um erro ao registrar. Por favor, tente novamente mais tarde.");
      }
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
