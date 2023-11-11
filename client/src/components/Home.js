import React, {useState} from 'react'
import {useNavigate} from "react-router-dom"
import data1 from './users.json'

const Home = ({socket}) => {
    const navigate = useNavigate()
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    var valid = false
    const handleSubmit = (e) => {
        e.preventDefault()
        localStorage.setItem("userName", userName)
        localStorage.setItem("password", password)
        var clientip = localStorage.getItem("ip")
        data1.forEach(i => {
          if ((i.username === userName && i.password === password) || i.ip.includes(clientip)) { 
            valid = true 
            socket.emit("newUser", {userName, socketID: socket.id})
          }
        })
        if (valid===true) {navigate("/chat")}
        else {alert("user authentication failed... please try again")}
        
    }
  return (
    <form className='home__container' onSubmit={handleSubmit}>
        <h2 className='home__header'>Sign in to the Chat Application</h2>
        <label htmlFor="username">Username</label>
        <input type="text" 
        name="username" 
        id='username'
        className='input_field' 
        value={userName}
        onChange={e => setUserName(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input type="password" 
        name="password" 
        id='password'
        value={password}
        onChange={e => setPassword(e.target.value)}
        className='input_field' 
        />
        <button className='home__cta'>SIGN IN</button>
    </form>
  )
}

export default Home;