
import { Component } from 'react';
import Directory from './Directory'
import './DirectoryBar.css';
import Monaco from '../Monaco/index';

class DirectoryBar extends Component{

    constructor(props){
      super(props)
        this.state={
          user:"user",
          directories:"",
          arr:"",
          subdirectory_data:"",
          prevSubdirectory:""
        }
      }
      
      //gets triggered on project change
      componentDidUpdate(prevProps, prevState, snapshot) {

        if(this.props != prevProps){
          // console.log("directorybar compupate",this.props)
        var directories = this.props.directories ;
        let count=directories.length
          
                var arr=[] 

                for(let i = 0 ; i < count ; i++ ){
                  
                  let element=<Directory id={directories[i]._id} name={directories[i].name} subdirectories={directories[i].subdirectories}  data={directories[i]} changeSubdirectory={this.changeSubdirectory}/>
                  arr.push(element)
                }
              
                  this.setState({
                  // "user":user,
                  "directories":directories,
                  "data":arr,
                })}
      }
      
      activateSubdirectory=(newId)=>{

        var activeObject = document.getElementById(newId);
        
        if(activeObject!=undefined && activeObject!=null){
          activeObject.classList.add("active-subdirectory");
        }
      
      }
      
      deactivatePreviousSubdirectory=()=>{
        
          var inactiveObject = document.getElementsByClassName("SubDirectory");
        
          for(let itr = 0 ; itr < inactiveObject.length ; itr ++){
            inactiveObject[itr].classList.remove("active-subdirectory");
          }

      }

      //changes sub directory of active window
    changeSubdirectory=(data)=>{
      
      console.log("active window",data)
      this.deactivatePreviousSubdirectory();
      console.log("active subdirectory has id ", data.id);
      this.activateSubdirectory(data.id);
      
      console.log(data)
      this.setState({
        "subdirectory_data":data
      })
    }
    componentDidMount(){
      // console.log("directory bar",this.props)
    }
    render(){
      return (
        
        <div className="DirectoryBar-parent">
          <div className="Directory">
            <div className="DirectoryBar-User">

                  {this.state.user.name}

            </div>      

            <div className="DirectoryBar-List">

                  {this.state.data}

            </div>      
          </div> 

          <div className="Monaco-Wrapper">
              <Monaco key={window.location.href} data={this.state.subdirectory_data}/>
          </div>

        </div>
        
  
      )
    }
  }
  
  export default DirectoryBar;
  