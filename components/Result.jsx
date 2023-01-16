import cn from "classnames"
const Result = ({ result }) => {
    if (result.authenticated) {
        return (
            <div className={cn(!result.isValid && "text-red-500")}>
                <div className="grid grid-cols-3">
                    <div className="">{result.domain}</div>
                    <div className="">{result.isResellerPresent ? "Has Console" : "No Console"}</div>
                    <div className="">{result.isGoogleMxPresent ? "Has MX" : "No MX Found"}</div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="">Unauthenticted. Please Sign in</div>
        )
    }
}
export default Result