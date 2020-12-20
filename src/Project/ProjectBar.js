
import { Component } from 'react';
import Element from './Element'
import './ProjectBar.css';

class ProjectBar extends Component{

    constructor(props){
      super(props)
        this.state={
          
        }
      }
    
      componentDidMount(){
          let count=10 || this.props.count
          
          let arr=[] 

          for(let i = 0 ; i < count ; i++ ){
            
            let element=<Element/>
            arr.push(element)
          }

          this.setState({
              data:arr
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
        </div>
  
      )
    }
  }
  
  export default ProjectBar;
  