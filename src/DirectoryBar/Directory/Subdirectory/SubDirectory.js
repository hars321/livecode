import  { Component } from 'react';
import './SubDirectory.css';
import { ENDPOINT } from '../../../serverEndpoint';



// => Parent is Directory 
//     => props received :
            // subdirectory_id => id of i-th subdirectory of current directory
            // directory_id => id of the current directory
            // data => json object - details of the sub-directories 
            // changeSubdirectory => function changes current active subdirectory when subdirectory is clicked upon
            //                        this function is received from directorybar and is passed to subdirectory.js
            //                        (from) Directorybar => directory => subdirectory.js (pass it down as props)


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
      }

    //  handles click when current component is clicked (i.e.,  subdirectory changes )
    //  calls function received from directorybar->directory->subdirectory
    //  when current subdirectory is clicked changesubdirectory function is called
    
    handleClickOnSubDirectory=()=>{

        var data={
            "id":this.props.subdirectory_id,
            "directory_id":this.props.directory_id,
            "code":this.state.code
        }
        this.props.changeSubdirectory(data)
    }


    componentDidUpdate(prevProps,prevState) {
        if(prevProps!=this.props){
            return true;
        }
        return false;
    }

    //takes props from directory.js
    //set props in state
    componentDidMount=()=>{
        
        var directory = this.props.data
        var id=this.props.directory_id
        var name = directory.name

        var fetch_url = ENDPOINT+'/'+id;

        fetch(fetch_url)
        .then(data=>console.log(data))
        .catch(err=>console.log(err))
        
         this.setState({
             "name":name,
             "id":id
         })
        
    }
    
    render(){
        
        return(

            <div className="SubDirectory-Parent" onClick={this.handleClickOnSubDirectory}>
                <div id={this.props.subdirectory_id} className="SubDirectory">
                    <h4 >-->{this.props.data.name}</h4>        
                </div>                
            </div>
        
        )
    }
}

export default SubDirectory;