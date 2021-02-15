import React, { createElement } from 'react';
import { render } from 'react-dom';
import MonacoEditor from 'react-monaco-editor';
import socketIOClient from "socket.io-client";
import './index.css';
// import io from 'socket.io-client'   
import {ENDPOINT} from '../serverEndpoint';


    
// var socket = io(url, {transports: ['websocket', 'polling', 'flashsocket']});
const socket = socketIOClient(ENDPOINT);




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
   this.sendCode=this.sendCode.bind(this)
   this.updateId=this.updateId.bind(this)
   
  }




  
  //  function gets triggered when subdirectory changes
  //  function starts listening to the socket
  startSocket=()=>{
    this.listenSocket();
  }

  //  function gets triggered when subdirectory changes
  //  function stops listening to the socket
  turnOffSocket=()=>{
    console.log("turning off socket")
    socket.disconnect() 
    socket.off(); // stops listening to all events
  }


  // when the compiler code is changed the function is trigerred 
  // sends the compiler code to the server
  sendCode=(code)=>{
    let data={
      "room":this.props.data.id,
      "directory":this.props.data.directory_id,
      "code":code
    }
    
    socket.emit("code", data);

  }



  // function gets emitted when the current user clicks the screen
  // socket is emmited with the current user's location
  
  //gets coordinates of the current user cursor

  //sends the cursor coordinates to socket.io server
  sendCoords=(event)=>{

    let data={
      "user_name":"user1",
      "room":this.state.id,
      "x":event.clientX,
      "y":event.clientY
    }
    socket.emit("coordinates", data);
    
  }

  
  //listens for socket.io on current active id
  listenSocket=()=>{
    
    socket.connect();

    // {room : id of the current active subdirectory}
    let channel={"room":this.props.data.id}
    
    // join the current active room
    socket.emit("join_room",channel);

    //calling update cursor function when gets coordinates from server
    socket.on('coordinates',data=>{
      this.updateCursor(data)
    })

    //calling update code function when gets code from server
    socket.on('code',data=>{
      this.updateCode(data.code)
    });

  }

  // function gets trigerred when socket emits cursor change emit
  //function to position duplicate cursor (user2) on user screen
  updateCursor=(data)=>{
    let x=data.x
    let y=data.y

    y=y-10;

    const cursor = document.getElementById('cursor');
    cursor.style.left = x+'px';
    cursor.style.top = y+'px';
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

  // function gets trigerred when code changes in the compiler
  // do not modify
  onChange=(newValue, e)=>{
    compilerCode=newValue;
    // console.log(newValue)
    this.sendCode(compilerCode);
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

  //  fetches the code from server of the current active subdirectory
  //  function gets executed when the new subdirectory is loaded

  fetchCode(id){
    
    //id is the id of the current active subdirectory
    var endpoint = "https://livecodebackend.herokuapp.com/findcodebyid/"+id;
    
    fetch(endpoint)
    
    .then(data=>data.json()
    .then(data=>{
      // update the code of the new code fetched from the server
      this.updateCode(data.code);
    })
    )
    .catch(err=>{
      console.log(err);
    })
  }
  
















  //lifecycle funtions

  // updates the id of the current active subdirectory
  updateId=(newid)=>{

    this.setState({
      "id":newid
    })

  }


// when the props from parent changes
// new props are set as states
  static getDerivedStateFromProps(props, state) {
    return {id: props.data.id };
  }

  // when current subdirectory changes the function gets triggered
  componentDidUpdate(prevProps,prevState) {
    
    if(this.state.id != prevState.id){
       // turn off all previous socket connections 
    this.turnOffSocket();
    
    // update the id of the current active subdirectory
    // this.updateId(this.props.data.id);

    // start listening on the current subdirectory
    this.startSocket();

    // fetch code of the current active subdirectory
    this.fetchCode(this.props.data.id);    
    
      // this.fetchCode(this.state.id)
      console.log("State changed")
    }
    // this.fetchCode()
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
        {/* <input type="button" className="btn" ref="Data" onClick={()=>this.sendCode()}  value="get Data"/> */}
      </div>
      <div className="Editor" onClick={this.sendCoords.bind(this)}>
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


