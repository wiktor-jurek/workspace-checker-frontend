import Result from "./Result"
const ResultsTable = ({ resultsTable }) => {
    return (
        <div className="bg-black text-orange-light rounded-3xl flex flex-col space-y-4 my-4 py-3 ">
            {resultsTable.map((result) => {
                return (<Result
                    result={result}
                    key={result.timestamp} />)
            })}
        </div>
    )
}
export default ResultsTable