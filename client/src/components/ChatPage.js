import React, { useEffect, useState, useRef} from 'react'
import ChatBar from './ChatBar'
import ChatBody from './ChatBody'
import ChatFooter from './ChatFooter'

const ChatPage = ({socket}) => { 
  const [messages, setMessages] = useState([])
  const [typingStatus, setTypingStatus] = useState("")
  const lastMessageRef = useRef(null);

  //to display the chats and handle message response socket
  useEffect(()=> {
    socket.on("messageResponse", data => setMessages([...messages, data]))
  }, [socket, messages])

  //to display message called "admin is typing..." and others like that
  useEffect(()=> {
    socket.on("typingResponse", data => setTypingStatus(data))
  }, [socket])

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [messages]);

  //to put warning message when reloading the page
  window.onbeforeunload = (event) => {
    
    const e = event || window.event;
    // Cancel the event
    e.preventDefault();
    if (e) {
      e.returnValue = ''; // Legacy method for cross browser support
    }
    return ''; // Legacy method for cross browser support
    
  };

  //to navigate back to home page when reloading the page
  if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
    window.location.replace("/")
  }

  return (
    <div className="chat">
      <ChatBar socket={socket}/>
      <div className='chat__main'>
        <ChatBody messages={messages} typingStatus={typingStatus} lastMessageRef={lastMessageRef}/>
        <ChatFooter socket={socket}/>
      </div>
    </div>
  )
}

export default ChatPage;