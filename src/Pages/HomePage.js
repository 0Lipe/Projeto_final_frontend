import React, { useContext, useState, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import './Home/styles.css';

const HomePage = () => {
  const { user } = useContext(AuthContext);
  const [tweets, setTweets] = useState([]);
  const [tweetInput, setTweetInput] = useState('');

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const response = await fetch('https://lsfelipels.pythonanywhere.com/post/tweets/');
        const data = await response.json();
        setTweets(data); 
      } catch (error) {
        console.error('Erro ao buscar tweets:', error);
      }
    };
    fetchTweets();
  }, []);

  const handleInputChange = (event) => {
    setTweetInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('https://lsfelipels.pythonanywhere.com/post/tweets/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: user.id, tweet: tweetInput }),
      });
      
      if (response.ok) {
        console.log('Tweet enviado com sucesso!');
        // Atualiza a lista de tweets após o envio bem-sucedido
        const newTweet = await response.json(); // Obtém o novo tweet criado pela API
        setTweets([...tweets, newTweet]); // Adiciona o novo tweet à lista de tweets
        setTweetInput(''); // Limpa o campo de input
      } else {
        console.error('Erro ao enviar o tweet:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao enviar o tweet:', error);
    }
  };

  return (
    <div className='container'>
      <div className='home'>
        <p>HomePage</p>
        <p>Hello {user && <span>{user.username}</span>}</p>
      </div>
      <form onSubmit={handleSubmit} className='form-tweet'>
        <h1>Tweet</h1>
        <input id='tweet-campo' type="text" value={tweetInput} onChange={handleInputChange} />
        <button type='submit'>Enviar</button>
      </form>
      <div className='tweets'>
        <h2>Tweets dos Usuários</h2>
        <div>
          {tweets.map(tweet => (
            <div className='tweets-usuarios' key={tweet.id}>
              <h5>{tweet.username}</h5><p>{tweet.tweet}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
