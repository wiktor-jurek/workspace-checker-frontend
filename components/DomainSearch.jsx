import { useSession, signIn, signOut } from "next-auth/react";
import cn from "classnames"

const DomainSearch = ({ setDomainsStatus, domainsStatus }) => {

    const handleSubmit = async (event) => {
        event.preventDefault()
        const workspaceStatus = await getWorkspaceStatus(event.target.domain.value)
    }
    const { data: session } = useSession();


    const getWorkspaceStatus = async (domain) => {
        const body = JSON.stringify({ domain: domain })
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: body
        }
        const resellerResponse = await fetch("/api/resellerCheck", requestOptions)

        const resellerResult = await resellerResponse.json()
        const mxResponse = await fetch("api/mxCheck", requestOptions)
        const mxResult = await mxResponse.json()

        let isDomainValid;
        let isGoogleMxPresent;

        if (mxResponse.status == 404) {
            isDomainValid = false;
            isGoogleMxPresent = false;
        } else {
            isDomainValid = true
            isGoogleMxPresent = JSON.stringify(mxResult).includes("google.com") ? true : false
        }
        console.log(resellerResult)
        console.log(mxResult)
        const domainStatus = {
            domain: domain,
            authenticated: mxResponse.status == 401 ? false : true,
            isValid: isDomainValid,
            isGoogleMxPresent: isGoogleMxPresent,
            isResellerPresent: resellerResponse.status == 404 ? false : true,
            timestamp: Date.now()
        }

        setDomainsStatus([...domainsStatus, domainStatus])


    }


    return (
        <div className={cn("flex w-max  bg-black text-orange-light font-bold py-3 px-3 rounded-3xl",
            session && "cursor-not-allowed")}>
            <form className="flex justify-between" onSubmit={handleSubmit}>

                <input className="bg-orange-light rounded-3xl px-3 w-2/3 placeholder-brown placeholder:font-medium text-black" type="text" placeholder="example.com" id="domain" name="domain" required />
                <button className="text-center w-1/3" type="submit" >Check</button>
            </form>
        </div >
    )
}

export default DomainSearch