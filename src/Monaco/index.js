import React, { createElement } from 'react';
import { render } from 'react-dom';
import MonacoEditor from 'react-monaco-editor';
import socketIOClient from "socket.io-client";
import './index.css';

const ENDPOINT = "http://localhost:4000";
const socket = socketIOClient(ENDPOINT);
    


var compilerCode=""
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
    }
   this.updateCode=this.updateCode.bind(this)
   this.updateCursor=this.updateCursor.bind(this)
   this.sendCode=this.sendCode.bind(this)
  }

  // do not modify
  editorDidMount(editor, monaco) {
    console.log('editorDidMount', editor);
    editor.focus();
  }

  sendCode=()=>{
    let data={
      "code":this.getData()
    }
    // let data=code
    socket.emit("code", data);

  }
  // do not modify
  onChange=(newValue, e)=>{
    compilerCode=newValue;
    this.sendCode();
    console.log('onChange', newValue, e);
  }


  //gets coordinates of the current user cursor
  //sends the cursor coordinates to socket.io server
 sendCoords=(event)=>{

    let data={
      "user_name":"user1",
      "x":event.clientX,
      "y":event.clientY
    }
    socket.emit("coordinates", data);
    
  }
  
 
//returns the code written in compiler in JSON string format
  getData(){
    let output=JSON.stringify(compilerCode)
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


  //listens for socket.io emits
  listenSocket=()=>{
    
    //calling update cursor function when gets coordinates from server
    socket.on('coordinates',data=>{
      this.updateCursor(data)
    })

    //calling update code function when gets code from server
    socket.on('code',data=>{
      this.updateCode(JSON.parse(data.code))
    });

  }

  //function to position duplicate cursor on user screen
  updateCursor=(data)=>{
    let x=data.x
    let y=data.y

    y=y-10;

    const cursor = document.getElementById('cursor');
    cursor.style.left = x+'px';
    cursor.style.top = y+'px';
  }

  //update the state code with code received from server
  updateCode=(data)=>{
    console.log(data)
    this.setState({
      code:data
    });
  }

  //start the socket connection to the server
  componentDidMount(){
      this.listenSocket();
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

