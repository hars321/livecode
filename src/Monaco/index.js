import React, { createElement } from 'react';
import { render } from 'react-dom';
import MonacoEditor from 'react-monaco-editor';
import socketIOClient from "socket.io-client";
import './index.css';

import {Context} from '../Context';
import { getParam } from '../url';




const ENDPOINT = "http://localhost:4000";
const socket = socketIOClient(ENDPOINT);
    



var compilerCode=""
var room="room1"
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      id:'',
      code:''
    }
   this.updateCode=this.updateCode.bind(this)
   this.updateCursor=this.updateCursor.bind(this)
   this.sendCode=this.sendCode.bind(this)
   this.updateId=this.updateId.bind(this)
   
  }
  updateId=(id)=>{

    this.setState({
      id
    })
  }

  startSocket=()=>{
    console.log("listening socket")
    this.listenSocket();
  }
  turnOffSocket=()=>{
    socket.disconnect() 

    socket.off(); // stops listening to all events
  }


  static getDerivedStateFromProps(){
    console.log("getderivedstate")
  }
  //changing subdirectory
  componentDidUpdate(prevProps,prevState) {
    
    if (this.props.data.id!=undefined && this.state.id !== prevProps.data.id) {
      console.log("calling componentDidUpdate")
        
        // this.updateId(this.props.data.id);
        // this.fetchCode(this.props.data.id);

        return true;
    }
    return false;
}
  
  // do not modify
  editorDidMount(editor, monaco) {
    // console.log('editorDidMount', editor);
    editor.focus();
  }

  sendCode=(code)=>{
    console.log("monaco",this.props)
    let data={
      "room":this.props.data.id,
      "directory":this.props.data.directory_id,
      "code":code
    }
    // let data=code
    console.log(data)
    socket.emit("code", data);

  }
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

  //fetch code from express
  fetchCode(id){
    var endpoint = "https://livecodebackend.herokuapp.com/findcodebyid/"+id;
    fetch(endpoint)
    .then(data=>data.json()
    .then(data=>{
      this.updateCode(data.code);
    })
    )
    .catch(err=>{
      console.log(err);
    })
  }
  
  //listens for socket.io emits
  listenSocket=()=>{
    
    socket.connect();
    let channel={"room":this.props.data.id}
    console.log("listening socket", channel)
    socket.emit("join_room",channel);

    //calling update cursor function when gets coordinates from server
    socket.on('coordinates',data=>{
      console.log(data)
      this.updateCursor(data)
    })

    //calling update code function when gets code from server
    socket.on('code',data=>{
      console.log(data);
      this.updateCode(data.code)
    });

  }

  //function to position duplicate cursor on user screen
  updateCursor=(data)=>{
    console.log(data)
    let x=data.x
    let y=data.y

    y=y-10;

    const cursor = document.getElementById('cursor');
    cursor.style.left = x+'px';
    cursor.style.top = y+'px';
  }

  //update the state code with code received from server
  updateCode=(data)=>{
    this.setState({
      code:data
    });
  }


  //start the socket connection to the server
  componentDidMount(){
      
    console.log("calling componentDidMount")
    console.log(this.props)
    //get id as props
    
    this.turnOffSocket();
    
    this.updateId(this.props.data.id);
    this.startSocket();
    this.fetchCode(this.props.data.id);

      
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


