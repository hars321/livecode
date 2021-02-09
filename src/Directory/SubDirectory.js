import  { Component,useContext } from 'react';
// import SubDirectory from './SubDirectory'
import './SubDirectory.css';
import Monaco from '../Monaco/index'
import url, { getParam, modifyUrl } from '../url'
import { getCode,setCode } from '../Store';
import { monaco } from 'react-monaco-editor';
// const MyContext = React.createContext();



// import {callback} from '../Monaco/index'
class SubDirectory extends Component{

    constructor(props){
      super(props)
        this.state={
          name:"subdirectory",
          id:"",
          data:"",
          url_params:"",
          directory_id:this.props.directory_id
        }
        this.setCode=setCode.bind(this)
        this.getCode=getCode.bind(this)
      }

    //handles click on subdirectory
    //calls function received from directorybar->directory->subdirectory
    handleClickOnSubDirectory=()=>{
        var data={
            "id":this.state.id,
            "directory_id":this.props.directory_id,
            "code":this.state.code
        }
        this.props.changeSubdirectory(data)
    }
    

    //takes props from directory.js
    //set props in state
    componentDidMount=()=>{
        console.log("subdirecotyr",this.props)
        var directory = this.props.data
        var id=directory._id
        var name = directory.name
        var code = directory.code

        var fetch_url = "http://localhost:4000/findcodebyid/"+id;

        fetch(fetch_url)
        .then(data=>console.log(data))
        .catch(err=>console.log(err))
        console.log(id)
        
         this.setState({
             "name":name,
             "id":id,
             "code":code
         })
        
    }
    
    render(){
        
        return(

            <div className="SubDirectory-Parent" onClick={this.handleClickOnSubDirectory}>
                <div id={this.state.id} className="SubDirectory">
                    <h4 >-->{this.state.name}</h4>        
                </div>                
            </div>
        
        )
    }
}

export default SubDirectory;