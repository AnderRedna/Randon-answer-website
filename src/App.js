import React, { Component } from 'react';
import './App.css';

class ChatGPT extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: '',
      response: '',
      apiMessages: [],
      isTyping: false
    };
  }

  systemMessage = { role: "system", content: "você é mt engraçada"};

  handleChange = event => {
    this.setState({ userInput: event.target.value });
  };

  handleSubmit = async event => {
    event.preventDefault();

    const prompt = this.state.userInput;
    this.setState({isTyping: true})

    // Substitua com suas credenciais e endpoint
    const API_KEY = process.env.REACT_APP_API_KEY;


    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        this.systemMessage,
        ...this.state.apiMessages,
        {role: 'user', content: "gere uma pergunta engraçada e estranha em portugues e me retorne apenas a pergunta no campo pergunta de um json"}
      ]
    };

    await fetch("https://api.openai.com/v1/chat/completions", 
    {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(apiRequestBody)
    }).then(response => response.json())
      .then(data => {
        const timeElapsed = new Date();
        const today = new Date(timeElapsed);
            console.log(prompt + " : " +today);
        this.setState(prevState => ({
          apiMessages: [...prevState.apiMessages, {role: 'assistant', content: data.choices[0].message.content}],
          response: (JSON.parse(data.choices[0].message.content)).pergunta,
          isTyping: false
        }));
      }).catch(error => {
        console.error(error);
        this.setState({isTyping: false});
      });
  };

  render() {
  
    const containerStyle = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      maxWidth: '650px',
      width: '90%',
      height: 'auto',
      padding: '20px',
      backgroundColor: 'rgba(0, 0, 0, 0.45)',
      borderRadius: '10px',
    };
    
    const divStyle = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundImage: `url(${require('./background.jpeg')})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    };
    
    const formStyle = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    };
    
    const inputStyle = {
      color: '#000000',
      margin: '10px',
      padding: '10px',
      fontSize: '25px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      width: '100%',
      maxWidth: '400px',
      marginTop: '10px',
    };
    
    const buttonStyle = {
      padding: '10px 20px',
      fontSize: '20px',
      borderRadius: '5px',
      color: '#fff',
      backgroundColor: '#007BFF',
      border: 'none',
      cursor: 'pointer',
      marginTop: '10px',
    };
    
    const messageStyle = {
      color: '#FFF',
      marginTop: '20px',
      fontSize: '20px',
      fontWeight: 'bold',
      alignItems: 'center',
    };
    
    const typingStyle = {
      color: '#FFF',
      marginTop: '10px',
      fontSize: '16px',
      fontStyle: 'italic',
    };
    
    const redlineText = {
      color: '#FFF',
      textAlign: 'center',
      margin: 0
    };
    

  return (
    <div style={divStyle}>
      <div style={containerStyle}>
      <h1 style={redlineText}>TRADUTOR DE PERGUNTAS ESTRANHAS DO RICK</h1>
        <form style={formStyle} onSubmit={this.handleSubmit}>
            <input style={inputStyle} placeholder='Digite sua pergunta aqui' type="text" value={this.state.userInput} onChange={this.handleChange} />
            <button style={buttonStyle} type="submit">Enviar</button>
        </form>
        {this.state.response && <p style={messageStyle}>{this.state.response}</p>}
        {this.state.isTyping && <p style={typingStyle}>Pensando... Aproveita e me segue no TikTok!</p>}

      </div>
      
    </div>
);
  }
}

export default ChatGPT;
