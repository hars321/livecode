
import { Component } from 'react';
import Directory from './Directory'
import './DirectoryBar.css';
import Monaco from '../Monaco/index'

class DirectoryBar extends Component{

    constructor(props){
      super(props)
        this.state={
          user:"user",
          directories:"",
          arr:""
        }
      }
    
      componentDidUpdate(prevProps, prevState, snapshot) {

        if(this.props != prevProps){
        var directories = this.props.directories ;
        let count=directories.length
          
                var arr=[] 

                for(let i = 0 ; i < count ; i++ ){
                  
                  let element=<Directory id={directories[i]._id} name={directories[i].name} data={directories[i]}/>
                  arr.push(element)
                }
              
                  this.setState({
                  // "user":user,
                  "directories":directories,
                  "data":arr
                })}
      }
      componentDidMount(){
        //maple url /?project_id=5feb6784c6f7fd3fd83503a2&directory=1&subdirectory=1
        
      console.log(this.props)
        var directories=this.props.directories
        // console.log(directories)
        //get project_id from the url 
        // const urlParams = new URLSearchParams(url);
        // const project_id=urlParams.get('project_id');

        // var fetch_url='http://localhost:4000/findDirectory/'+project_id
        
        // //fetch directory details from database
        // fetch(fetch_url)
 
        // .then(data=>data.json())
        // .then(data=>{
        //   data=data[0]
        //   if(data.length!=0)
        //   {

        //     //find the project with id = project_id
        //     for( let i = 0 ; i < data.projects.length ; i++ ){
              
        //       if (data.projects[i]._id == project_id){
                  
        //         //store the user data and directories
        //         var user=data;
                // var directories=data.projects[i].directories;

                // let count=directories.length
          
                // var arr=[] 

                // for(let i = 0 ; i < count ; i++ ){
                  
                //   let element=<Directory id={directories[i]._id} name={directories[i].name} data={directories[i]}/>
                //   arr.push(element)
                // }
              
                //   this.setState({
                //   // "user":user,
                //   "directories":directories,
                //   "data":arr
                // })

        //       }

        //     }
        //   }

        // })
        // .catch(err=>console.log(err))


        // const directory = urlParams.get('directory')
        // console.log("dir"+directory)

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
                    <Monaco/>
          </div>

        </div>
  
      )
    }
  }
  
  export default DirectoryBar;
  