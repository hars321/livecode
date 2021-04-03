
import { Component } from 'react';
import Directory from './Directory/Directory'
import './DirectoryBar.css';
import Monaco from '../Monaco/index';


// Parent Component is ProjectBar
      // props received are -> directories : json object that holds details of all the directories of CURRENT project

// Child Components :
      
      // Directory 
          // props passed:
              // id => id of the current directory
              // name => name of the current directory
              // subdirectories => data of all the directories
              // data => directory + subdirectory data
              // changeSubdirectory => function changes current active subdirectory when subdirectory is clicked upon 
              //                        this function is passed to => directory => subdirectory.js (here click event is trigerred)
              
      // Monaco Editor
        // props passed:
            // data => subdirectories data -> has the data of all the directories and project id

class DirectoryBar extends Component{

    constructor(props){
      super(props)
        this.state={
          user:"user",
          directories:"",
          arr:"",
          subdirectory_data:"",
          project_name:"",
          project_id:"",
          project_description:""

        }
      }
      updateProjectDetails=(project_details)=>{
        this.setState({
          project_name:project_details.name,
          project_id:project_details._id,
          project_description:project_details.description
        })
      }
      //gets triggered on project change
      componentDidUpdate(prevProps, prevState, snapshot) {

        if(this.props != prevProps){
          console.log("directorybar",this.props.project_details)
          this.updateProjectDetails(this.props.project_details)
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

      //function gets triggerred when the user changes(clicks) subdirectory
      //adds the active-subdirectory class to subdirectory object
      activateSubdirectory=(newId)=>{
        //newId is the id of the element that is clicked

        var activeObject = document.getElementById(newId);
        
        if(activeObject!=undefined && activeObject!=null){
          activeObject.classList.add("active-subdirectory");
        }
      
      }
      
      //function gets triggerred when the user changes(clicks) subdirectory
      //removes the active-subdirectory class from all the subdirectory object
      deactivatePreviousSubdirectory=()=>{
        
          var inactiveObject = document.getElementsByClassName("SubDirectory");
        
          for(let itr = 0 ; itr < inactiveObject.length ; itr ++){
            inactiveObject[itr].classList.remove("active-subdirectory");
          }

      }

      //changes sub directory 
      // trigerred when user changes(clicks) subdirectory
      // passed from director-bar to directory to subdirectory
      changeSubdirectory=(data)=>{

        //data holds the details of the subdirectory being clicked
        console.log(data)
        this.deactivatePreviousSubdirectory();

        this.activateSubdirectory(data.id);
        
        this.setState({
          "subdirectory_data":data
        })

        

    }
    
    render(){
      return (
        
        <div className="DirectoryBar-parent">
          <div className="Directory">
            <div className="DirectoryBar-User">

                {/* <div className="Project-Name Project-Details">
                  {this.state.project_name}
                </div> */}
                <div className="Project-Description Project-Details">
                  {this.state.project_description}
                </div>
                <div className="Project-Id Project-Details">
                  ({this.state.project_id})
                </div>
              

            </div>      

            <div className="DirectoryBar-List">

                  {this.state.data}

            </div>      
          </div> 

          <div className="Monaco-Wrapper">

              <Monaco data={this.state.subdirectory_data}/>
              
          </div>

        </div>
        
  
      )
    }
  }
  
  export default DirectoryBar;
  