
import Monaco from './Monaco/index.js';
import ProjectBar from './Project/ProjectBar';
import './App.css';
// import Directory from './Project/Directory/Directory.js';
import DirectoryBar from './Project/Directory/DirectoryBar.js';
function App() {
  return (
    <div className="App">
      <ProjectBar/>
      <DirectoryBar/>
      <Monaco/>
    </div>
  );
}

export default App;
