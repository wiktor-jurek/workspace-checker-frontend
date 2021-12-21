import React,{useState,useEffect} from 'react';


import './App.css';
import DomainForm from './components/DomainForm';
import DomainInfo from './components/DomainInfo';

function App() {
const [domain,setDomain] = useState('');
const [workspaceDnsStatus,setWorkspaceDnsStatus] = useState('');
const [workspaceHttpStatus,setWorkspaceHttpStatus] = useState('');
const [isOnWorkspace,setIsOnWorkspace] = useState(false);
const [isLoading,setLoading] = useState(false);
const [infoVisible,setInfoVisible] = useState(false);

useEffect(() => {
    if(domain && domain.length > 0 && !isLoading){
    setInfoVisible(true)
}
}, [isLoading,domain])



return (
<div className="App">
  <div className="container mx-auto">
            <div className="header flex flex-col justify-center text-red-400">
                <h1 className="text-2xl font-bold text-center">Are they on Workspace?</h1>
                <div className="subtext">
                    <h2>A super simple tool to give you the answer you need, without messing about with MX records and technical dives.</h2>
                    <p className="text-xs">(We also have an API!)</p>
                </div>
            </div>
        </div>
        <div className="">
            {isLoading ? <p>LOading</p> : <p>Not Loading</p>}
        </div>
  <div className="">
    <DomainForm setDomain={setDomain} 
    setWorkspaceDnsStatus={setWorkspaceDnsStatus} 
    setWorkspaceHttpStatus={setWorkspaceHttpStatus} 
    setIsOnWorkspace={setIsOnWorkspace} 
    setLoading = {setLoading}/>

    {infoVisible && <DomainInfo 
    domain={domain} 
  workspaceDnsStatus={workspaceDnsStatus} 
  workspaceHttpStatus={workspaceHttpStatus} 
  isOnWorkspace={isOnWorkspace}
/>}
     


  </div>
</div>



);
}

export default App;