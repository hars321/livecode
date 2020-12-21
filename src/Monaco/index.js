import React from 'react';
import { render } from 'react-dom';
import MonacoEditor from 'react-monaco-editor';

import './index.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '// type your code...',
    }
  }
  editorDidMount(editor, monaco) {
    console.log('editorDidMount', editor);
    editor.focus();
  }
  onChange(newValue, e) {
    console.log('onChange', newValue, e);
  }

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
      </div>
      <div className="Editor">
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
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
