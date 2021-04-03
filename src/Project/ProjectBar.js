
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
          projects:"",
          active_project_details:""
        }
      }

      //update background
      updateBackground=(id)=>{

        var active_object = document.getElementById(id)

        active_object.classList.add("active_project");

        // remove active-project class from all other components
        var inactive_objects = document.getElementsByClassName("active_project");


        for(let itr=0;itr<inactive_objects.length;itr++){

          if(inactive_objects[itr].id!=id){
            inactive_objects[itr].classList.remove("active_project");}

          }
        
      }

      // when project elment is clicked following function is called
      // function changes existing project
      // function is passed as props to element.js
      activeProject=(project_id)=>{
        
        var projects = this.state.projects;
        
        // replacing the index of previous project in the array with the current project index
        var active_project=projects[project_id].directories
        var active_project_details=projects[project_id];

        //update background of active project
        this.updateBackground(active_project_details._id);

        
        // setting state of current active project
        this.setState({
          active_project:active_project,
          active_project_details:active_project_details
        })

      }


      static getDerivedStateFromProps(props, state) {
        return {id: localStorage.getItem('_id') };
      }
      
      // get data from props -> this.props.projects
      // get all the projects from this.props.projects and make an array
      // render the array element currently clicked
      componentDidMount(){
        
        var user_id = localStorage.getItem('_id')

        var fetch_url=ENDPOINT+'/finduserbyid/'+this.state.id;
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

          let first_project_id = data.projects[0]._id
          console.log(first_project_id)
          // this.updateBackground(first_project_id);
          this.setState({
            "data":arr,
            "projects":data.projects,
            "active_project":data.projects[0].directories,
            "active_project_details":data.projects[0]
          })
        })
          
      }
    render(){
      return (
        <div className="ProjectBar-parent">
          <div className="ProjectBar">
            <div className="Project-Elements">
                
                {this.state.data}

            </div>
            <div className="Project-Logout">
              <button className="logout-button" onClick={this.props.logout}>Logout</button>
            </div>
          </div>  
          <DirectoryBar directories={this.state.active_project} project_details={this.state.active_project_details}/> 
        </div>
  
      )
    }
  }
  
  export default ProjectBar;
  