import React,{useState} from 'react';
import checkDomainForWorkspace from './DomainChecker';

const DomainForm = ({setDomain,setWorkspaceDnsStatus,setWorkspaceHttpStatus,setIsOnWorkspace,setLoading}) =>{
    
    const [domainForm,setDomainForm] = useState('');

    const handleSubmit = (event) => {
    setLoading(true)
    console.log("set loading to true")
        event.preventDefault();
        if(domainForm.length < 0){
            return;
        }
        console.log("Checking domain: " + domainForm);
        checkDomainForWorkspace(domainForm).then(res => {
            setDomain(domainForm);
            setWorkspaceHttpStatus(res.isWorkspaceDomain);
            setWorkspaceDnsStatus(res.doGoogleMXRecordsExist);
            if(res.isWorkspaceDomain && res.doGoogleMXRecordsExist){
                setIsOnWorkspace(true);
            }
            setLoading(false)
            return res;
            }).catch(err => {
                setLoading(false);
                return err;
            }
        );
    }

      return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="domain">Enter domain:</label>
                <input type="text" 
                className="form-control" 
                id="domain" 
                placeholder="Enter domain" 
                onChange={(event)=> setDomainForm(event.target.value)}
                value = {domainForm}/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>

      );
    };
  
    export default DomainForm;