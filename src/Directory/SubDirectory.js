import { Component } from 'react';
// import SubDirectory from './SubDirectory'
import './SubDirectory.css';
import Monaco from '../Monaco/index'
import url, { modifyUrl } from '../url'
import { getCode,setCode } from '../Code';

class SubDirectory extends Component{

    constructor(props){
      super(props)
        this.state={
          name:"SubDirectory",
          id:"",
          data:""
        }
      }
    goto=()=>{
        var data={"SubDirectory":this.state.id}
        var new_url = modifyUrl(data)
        window.history.replaceState(null, "New Page Title", new_url)
    }
    componentDidMount=()=>{
        // var SubDirectory = this.props.SubDirectory
        // console.log(this.props.id)
        // var name = SubDirectory.name
        // console.log(this.props.data)
        var directory = this.props.data
        var name = directory.name
        var code = directory.code
        setCode(code)
        
         this.setState({
             "name":name,
             "id":directory.id,
             "code":directory.code
         })
        // var url = window.location.search
        
        // const urlParams = new URLSearchParams(url);
        // const subdirectory = urlParams.get('subdirectory')
        // console.log("sub"+subdirectory)
    }
    render(){
        return(
            <div className="SubDirectory-Parent" onClick={this.goto}>
                <div className="SubDirectory">
                    <h4>##{this.state.name}</h4>
                </div>
               
                
            </div>
        )
    }
}

export default SubDirectory;