
import { Component } from 'react';
import Element from './Element'
import './ProjectBar.css';
import DirectoryBar from '../Directory/DirectoryBar.js'
class ProjectBar extends Component{

    constructor(props){
      super(props)
        this.state={
          data:""
        }
      }
    
      componentDidMount(){
          
          let data=this.props.data.projects;
        
          let count=data.length
          
          let arr=[] 

          for(let i = 0 ; i < count ; i++ ){
            
            let element=<Element data={this.props.data} project_data={data[i]}/>
            
            arr.push(element)

          }

          this.setState({
              data:this.props.data,
              element:arr
          })
      }
    render(){
      return (
        <div className="ProjectBar-parent">
          <div className="ProjectBar">
            <div className>
                
                {this.state.element}

            </div>
          </div>   
          <DirectoryBar data={this.state.data}/>
        </div>
  
      )
    }
  }
  
  export default ProjectBar;
  