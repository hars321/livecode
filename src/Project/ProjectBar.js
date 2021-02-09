
import { Component } from 'react';
import Element from './Element'
import './ProjectBar.css';
import DirectoryBar from '../Directory/DirectoryBar.js'


// child is Element.js -> projects and directorybar

// in componentDidMount 
// project details of user_id is fetched from database
// following props are passed to project ->
// index={i} id={project._id} name={project.name} directories={project[i]} activeProject={this.activeProject}

// DirectoryBar passes current project details as props
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
      activeProject=(project_id)=>{
        
        var projects = this.state.projects;
        var active_project=projects[project_id].directories
        this.setState({
          active_project
        })
      }

      
      componentDidMount(){
        var user_id="5ff19908b3c5741086c9533c"

        var fetch_url='https://livecodebackend.herokuapp.com/finduserbyid/'+user_id;

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
  