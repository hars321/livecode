import { Component } from 'react';
import './Directory.css';
import Monaco from '../../Monaco/index'
import SubDirectory from './Subdirectory/SubDirectory'


// Parent Component is DirectoryBar
      // props received are -> directories : json object that holds details of all the directories of CURRENT project
            // id => id of the current directory
            // name => name of the current directory
            // subdirectories => data of all the directories
            // data => directory + subdirectory data
            // changeSubdirectory => function changes current active subdirectory when subdirectory is clicked upon 
            //                        this function is received from directorybar and is passed to subdirectory.js
            //                        (from) Directorybar => directory => subdirectory.js (pass it down as props)

// Child Components :
      
      // SubDirectory 
          // props passed:
            // subdirectory_id => id of i-th subdirectory of current directory
            // directory_id => id of the current directory
            // data => json object - details of the sub-directories 
            // changeSubdirectory => function changes current active subdirectory when subdirectory is clicked upon
            //                        this function is received from directorybar and is passed to subdirectory.js
            //                        (from) Directorybar => directory => subdirectory.js (pass it down as props)
            
class Directory extends Component{

    constructor(props){
      super(props)
        this.state={
          name:"directory",
          id:"",
          data:"",
          subdirectories:""
        }
      }
   
      // when props from the parent component changes the following function gets trigerred
      // when new project is clicked => the active project changes => the props passed down also gets changed => function gets trigerred
    componentDidUpdate(prevProps, prevState, snapshot) {

        if(this.props!=prevProps){
            var subdirectories=this.props.subdirectories
            var count = subdirectories.length
        
            var arr=[]

        for(var i = 0 ; i < count ; i++){
            var subdirectory = <SubDirectory subdirectory_id={subdirectories[i]._id} directory_id={this.props.id} data = {subdirectories[i]} changeSubdirectory={this.props.changeSubdirectory} />
            arr.push(subdirectory)
        }

         this.setState({
             "name":this.props.name,
             "id":this.props.id,
             "data":this.props.data,
             "subdirectories":arr
         })
        }
    }

    componentDidMount=()=>{
        
        var subdirectories=this.props.subdirectories
        var count = subdirectories.length
        
        var arr=[]
        for(var i = 0 ; i < count ; i++){
            var subdirectory = <SubDirectory subdirectory_id={subdirectories[i]._id} directory_id={this.props.id} data = {subdirectories[i]} changeSubdirectory={this.props.changeSubdirectory} />
            arr.push(subdirectory)
        }

         this.setState({
             "name":this.props.name,
             "id":this.props.id,
             "data":this.props.data,
             "subdirectories":arr
         })
    }


    render(){
        return(
            <div className="Directory-Parent" onClick={this.goto}>
                <div id={this.props.directory_id} className="Directory">
                    <h4>#{this.state.name}</h4>
                </div>
               
                {this.state.subdirectories}
            </div>
        )
    }
}

export default Directory;