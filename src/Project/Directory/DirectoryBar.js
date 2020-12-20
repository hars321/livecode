
import { Component } from 'react';
import Directory from './Directory'
import './DirectoryBar.css';

class DirectoryBar extends Component{

    constructor(props){
      super(props)
        this.state={
          
        }
      }
    
      componentDidMount(){

          let count=10 || this.props.count
          
          let arr=[] 

          for(let i = 0 ; i < count ; i++ ){
            
            let element=<Directory/>
            arr.push(element)
          }

          this.setState({
              data:arr
          })

        }

        
    render(){
      return (
        <div className="DirectoryBar-parent">

          <div className="DirectoryBar-User">
                
                User123

          </div>      

          <div className="DirectoryBar-List">
                
                {this.state.data}

          </div>      
          
        </div>
  
      )
    }
  }
  
  export default DirectoryBar;
  