import React from 'react';

function DomainInfo({workspaceDnsStatus,workspaceHttpStatus,isOnWorkspace,domain}) {

  return (
    <div className="domain-info">

        <h1>Domain Information:</h1>
        <div className="domain-info__title">
            <h2>{domain}</h2>
        </div>
        <h2>And are they on Workspace?</h2>
        <div className="domain-is_workspace">
            <h3>MX Records</h3>
            <p>{workspaceDnsStatus ? "Found" : "Not Found"}</p>
            <h3>Service Login</h3>
            <p>{workspaceHttpStatus ? "Found" : "Not Found"}</p>
            <h3>Verdict</h3>
            <p>{isOnWorkspace ? "They're on workspace!" : "They're not fully using workspace!"}</p>
        </div>
    </div>
    );
}

export default DomainInfo;