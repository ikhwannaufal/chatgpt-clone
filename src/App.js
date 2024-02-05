import './App.css';
import gptLogo from './assets/chatgpt.svg';
import addBtn from './assets/add-30.png';
import msgIcon from './assets/message.svg'
import home from './assets/home.svg';
import saved from './assets/bookmark.svg';
import rocket from './assets/rocket.svg';
import sendBtn from './assets/send.svg';
import userIcon from './assets/user-icon.png';
import gptImgLogo from './assets/chatgptLogo.svg'
import { sendMessageToOpenAI } from './openai';
import { useEffect, useRef, useState } from 'react';

function App() {
  const msgEnd = useRef(null)

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([{
    text: "Hi, I am ChatGPT",
    isBot: true,
  }]);

  useEffect(()=>{
    msgEnd.current.scrollIntoView();
  },[messages]) 

  const handleSend = async () => {
    const text = input;
    setInput('');
    setMessages([
      ...messages,
      {text, isBot: false}
    ])
    const res = await sendMessageToOpenAI(input);
    setMessages([
      ...messages,
      {text, isBot: false},
      {text: res, isBot: true }
    ])
  }

  const handleEnter = async (e) => {
    if(e.key === 'Enter')  await handleSend()
  }

  const handleQuery = async (e) => {
    const text = e.target.value;
    setInput('');
    setMessages([
      ...messages,
      {text, isBot: false}
    ])
    const res = await sendMessageToOpenAI(input);
    setMessages([
      ...messages,
      {text, isBot: false},
      {text: res, isBot: true }
    ])
  }

  return (
    <div className="App">
      <div className='sideBar'>
        <div className='upperSide'>
          <div className='upperSideTop'>
            <img src={gptLogo} alt='Logo' className='logo'/>
            <span className='brand'>ChatGPT</span>
          </div>
          <button className="midBtn" onClick={()=>{window.location.reload()}}><img src={addBtn} alt="new chat" className="addBtn" />New Chat</button>
          <div className="upperSideBottom">
            <button className="query" onClick={handleQuery} value={"What is Programming?"}><img src={msgIcon} alt="Query" />What is Programming?</button>
            <button className="query" onClick={handleQuery} value={"How to use an API?"}><img src={msgIcon} alt="Query" />How to use an API?</button>
          </div>
        </div>
        <div className='lowerSide'>
          <div className="listItems"><img src={home} alt="Home" className="listitemsImg" />Home</div>
          <div className="listItems"><img src={saved} alt="Saved" className="listitemsImg" />Saved</div>
          <div className="listItems"><img src={rocket} alt="Upgrade" className="listitemsImg" />Upgrade to Pro</div>
        </div>
      </div>
      <div className="main">
        <div className="chats">
          {/* <div className="chat">
            <img className='chatimg' src={userIcon} alt="" /><p className="txt">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum, culpa.</p>
          </div>
          <div className="chat bot">
            <img className='chatimg' src={gptImgLogo} alt="" /><p className="txt">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui pariatur quibusdam non, vitae commodi dolorem aut itaque laudantium corrupti adipisci autem, quis officiis nobis exercitationem dolorum perspiciatis atque ratione velit nulla minus voluptates, aliquid alias? Ex a commodi accusamus omnis nemo dolorum voluptatibus repellat porro, libero quia veritatis nihil! Aliquam itaque dolore omnis excepturi commodi, soluta fugit ea laborum natus! Magnam aperiam praesentium totam at adipisci officia. Qui, accusamus. Veniam iste veritatis, inventore expedita in hic optio reprehenderit vero aliquid dolorum, labore repudiandae modi harum numquam voluptas? Eveniet rem eum et sequi quas. Soluta asperiores pariatur neque autem sequi sit.</p>
          </div> */}
          {messages.map((message, i) => 
            <div key={i} className={message.isBot ? "chat bot" : "chat"}>
              <img className='chatimg' src={message.isBot?gptImgLogo:userIcon} alt="" /><p className="txt">{message.text}</p>
            </div>
          )}
          <div ref={msgEnd}/>
        </div>
        <div className="chatFooter">
          <div className="inp">
            <input type="text" placeholder='Send a message' value={input} onKeyDown={handleEnter} onChange={(e)=>{setInput(e.target.value)}}/><button className="send" onClick={handleSend}><img src={sendBtn} alt="Send" /></button>
          </div>
          <p>ChatGPT can make mistakes. Consider checking important information.</p>
        </div>
      </div>
    </div>
  );
}

export default App;
