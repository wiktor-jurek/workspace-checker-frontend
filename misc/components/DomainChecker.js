const checkDomainForWorkspace = (domain) => {

    let domainName = domain.toLowerCase();
    const checkURL = `https://api.aretheyonworkspace.com/${domainName}`;

    let result = fetch(checkURL, {})
        .then(response => {
            return response.json()
                .then(json => {
                    return json;
                });
        })
        .catch(error => {
            return error;
        });

    return (result);

}
export default checkDomainForWorkspace;