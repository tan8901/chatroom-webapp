import React, {useState, useEffect} from 'react';
import Collapsible from 'react-collapsible';


const ChatBar = ({socket}) => {
    const [users, setUsers] = useState([])

    useEffect(()=> {
        socket.on("newUserResponse", data => setUsers(data))
    }, [socket, users])


  return (
    
    <div className="chat__sidebar">
      <h2>ETSY CHATS</h2>
      <div>
        <h4 className="chat__header">Active Users</h4>
        <div className="chat__users">
          {users.map((user) => (<p key={user.socketID}>{user.userName}</p>))}
      </div>
      <hr/><br/>
      <Collapsible trigger="Cloud Storage">
        <iframe className="cloud" title='cloudstorage' src="https://drive.google.com/embeddedfolderview?id=INSERT_FOLDER_ID#list" frameBorder="0"></iframe>
      </Collapsible>

      <Collapsible trigger="Spreadsheet">
        <iframe className="sheet" title='spreadsheet' src="https://docs.google.com/spreadsheets/d/INSERT_SPREADSHEET_ID?rm=minimal"></iframe>
      </Collapsible>
        
      <Collapsible trigger="Notes">
        <iframe className="notes" title='notes' src="https://docs.google.com/document/d/INSERT_DOCUMENT_ID?rm=minimal"></iframe>
      </Collapsible>
      </div>
    </div>
  )
}

export default ChatBar;