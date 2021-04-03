import React, { createElement } from 'react';
import { render } from 'react-dom';
import MonacoEditor from 'react-monaco-editor';

import './index.css';
// import io from 'socket.io-client'   
import {ENDPOINT} from '../serverEndpoint';
import * as socketService from './Socket/SocketService';


    
// // var socket = io(url, {transports: ['websocket', 'polling', 'flashsocket']});
// const socket = socketIOClient(ENDPOINT);




// compilercode stores the current code in compiler
var compilerCode=""

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      id:''
    }
   this.updateCode=this.updateCode.bind(this)
   this.updateCursor=this.updateCursor.bind(this)
   this.sendCodeToSocket=this.sendCodeToSocket.bind(this)
   this.updateId=this.updateId.bind(this)
   
  }

  // when the compiler code is changed the function is trigerred 
  // sends the compiler code to the server
  sendCodeToSocket=(code)=>{
    let data={
      "room":this.props.data.id,
      "directory":this.props.data.directory_id,
      "code":code
    }
    socketService.emitCode(data);
  }
  //gets coordinates of the current user cursor
  //sends the cursor coordinates to socket.io server
  sendCoordsToSocket=(event)=>{
    let data={
      "user_name":"user1",
      "room":this.state.id,
      "x":event.clientX,
      "y":event.clientY
    }
    socketService.emitCoordinates(data);
  }


  listenOtherUsersEvents(){
    //listening to cursor change event of another users
    socketService.socket.on('coordinates',data=>{
      this.updateCursor(data)
    })
    //listening to code change event of another users
    socketService.socket.on('code',data=>{
      this.updateCode(data.code)
    });
  }

  joinNewSocketRoom(){
    // {room : id of the current active subdirectory}
    let channel={"room":this.props.data.id}
    // join the current active room
    socketService.emitJoinRoomEvent(channel);
  }
  



  // terminate all old socket events
   terminateOldSockets(){
    socketService.turnOffSocket();
  }

  //listens for socket.io on current active id
  listenToNewSocket=()=>{
    socketService.connectSocket();
  }

  changeSocketConnection(){
    // turn off all previous socket connections 
    this.terminateOldSockets();
  
    // start listening on the current subdirectory
    this.listenToNewSocket();

    // join new socket room
    this.joinNewSocketRoom();

    // start listening to socket events
    this.listenOtherUsersEvents();
  }



  









  //Monaco functions 


  // do not modify
  editorDidMount(editor, monaco) {
    // console.log('editorDidMount', editor);
    editor.focus();
  }
  
  //updates the compiler code
  updateCode=(code)=>{
    this.setState({
      code:code
    });
  }
  // updates the second user's cursor location on current user's screen
  updateCursor=(cursorCoordinates)=>{
    const secondCursor = document.getElementById('cursor');
    secondCursor.style.left = cursorCoordinates.x+'px';
    secondCursor.style.top = cursorCoordinates.y+'px';
  }

  // function gets trigerred when code changes in the compiler
  // do not modify
  onChange=(newValue, e)=>{
    compilerCode=newValue;
    // console.log(newValue)
    this.sendCodeToSocket(compilerCode);
    // console.log('onChange', newValue, e);
  }

  //returns the code written in compiler in JSON string format
  getData(){
    let output=compilerCode
    return output;
  }

  //switches between the compiler window and messaging app
  changeWindow=(editor)=>{

    let element_editor=this.refs.Editor;
    let element_message=this.refs.Message;
    
    if(editor){
      //change to editor
      element_editor.classList.add("active");
      element_message.classList.remove("active")
    }
    else{
      //change to message
      element_message.classList.add("active");
      element_editor.classList.remove("active")
    }
    
  }

  //  function gets executed when the new subdirectory is loaded
  //  fetches the code from server of the current active subdirectory
  fetchCode(id){
    //id is the id of the current active subdirectory
    var url = ENDPOINT+"findcodebyid/"+id;
    fetch(url)
    .then(data=>data.json()
    .then(data=>{
      this.updateCode(data.code);
    }))
    .catch(err=>{
      alert(err);
    })
  }
  


  //lifecycle funtions


  // updates the id of the current active subdirectory
  updateId=(newSubdirectoryId)=>{
    this.setState({
      "id":newSubdirectoryId
    })
  }

// when the props from parent changes
// new props are set as states
  static getDerivedStateFromProps(props, state) {
    return {id: props.data.id };
  }

  // when current subdirectory changes the function gets triggered
  componentDidUpdate(prevProps,prevState) {
    // if subdirectory changes 
    // implement directory change too //
    if(this.state.id != prevState.id){

      // turn off previous socket connections and start new socket connection
      this.changeSocketConnection();

      // fetch code of the current active subdirectory
      this.fetchCode(this.props.data.id);    

    }

  }

  



  render() {
    const code = this.state.code;
    const options = {
      selectOnLineNumbers: true
    };

    return (
      <div className="Editor-Parent">
      <div className="Editor-Category">
        <input type="button" className="btn active" ref="Editor" onClick={()=>this.changeWindow(true)} value="Editor"/>
        <input type="button" className="btn" ref="Message" onClick={()=>this.changeWindow(false)} value="Messages"/>
        {/* <input type="button" className="btn" ref="Data" onClick={()=>this.sendCodeToSocket()}  value="get Data"/> */}
      </div>
      <div className="Editor" onClick={this.sendCoordsToSocket.bind(this)}>
        <h3 id="cursor">cursor</h3>
      <MonacoEditor
        width="80vw"
        height="90vh"
        language="javascript"
        theme="vs-dark"
        value={code}
        options={options}
        onChange={this.onChange}
        editorDidMount={this.editorDidMount}
      />
      </div>
      </div>
    );
  }
}
export default App;


