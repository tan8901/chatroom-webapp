import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import ChatPage from './components/ChatPage';
import socketIO from 'socket.io-client';
//connect React App to Socket.io Server
const socket = socketIO.connect('http://localhost:4000');

//displays output on react app
function App() {
  //assigning different routes for Home page and Chat page using Routes (React)
  //passes Socket.io library to the components
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Home socket={socket} />}></Route>
          <Route path="/chat" element={<ChatPage socket={socket} />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;