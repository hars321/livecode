
import { Component } from 'react';
import Element from './Element'
import './ProjectBar.css';
import DirectoryBar from '../Directory/DirectoryBar.js'
import { ENDPOINT } from '../serverEndpoint';



// ProjectBar is child of ../App.js
// App.js passes data as props

// Props received is an array which contains projects data 
    //prop name : Projects

// Child of ProjectBar is Element.js
// child is ProjectBar is -> 

    //  -> Element.js 

        // Element.js : This component holds the details of the projects
        // props passed are :
            // index -> current index in the loop is passed 
            // id -> the project id 
            // name -> the peoject name
            // directories -> the directories present in the current project
            // function activeProject -> this function is responsible for changing the current active project
    
    //  -> DirectoryBar.js
        // DirectoryBar.js -> This component renders all the directories present in current active project
        // props passed are -> directories : json object that holds all the directories of CURRENT ACTIVE project
        


// DirectoryBar is passed current active project details 
class ProjectBar extends Component{

    constructor(props){
      super(props)
        this.state={
          data:"",
          active_project:"",
          projects:""
          
        }
      }

      // when project elment is clicked following function is called
      // function changes existing project
      // function is passed as props to element.js
      
      activeProject=(project_id)=>{
        

        var projects = this.state.projects;
        
        // replacing the index of previous project in the array with the current project index
        var active_project=projects[project_id].directories


        // setting state of current active project
        this.setState({
          active_project
        })

      }

      

      // get data from props -> this.props.projects
      // get all the projects from this.props.projects and make an array
      // render the array element currently clicked
      componentDidMount(){
        var uid = "60269f1055f0113dd06a4b08"

        var fetch_url=ENDPOINT+'/finduserbyid/'+uid;
        console.log(fetch_url);
        fetch(fetch_url)
        .then(data=>data.json())
        .then(data=>{
          
          var count = data.projects.length;
          var arr = []
      
          for( var i = 0 ; i < count ; i++ ){
            var project=data.projects[i]
            console.log("current project",project._id,project.name)
            var element=<Element index={i} id={project._id} name={project.name} directories={project[i]} activeProject={this.activeProject}/>
            arr.push(element)
          }
          var active=0;

          this.setState({
            "data":arr,
            "projects":data.projects,
            "active_project":data.projects[0].directories
          })
        })
          
      }
    render(){
      return (
        <div className="ProjectBar-parent">
          <div className="ProjectBar">
            <div className>
                
                {this.state.data}

            </div>
          </div>  
          <DirectoryBar directories={this.state.active_project} /> 
        </div>
  
      )
    }
  }
  
  export default ProjectBar;
  