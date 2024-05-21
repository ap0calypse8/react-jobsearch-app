import useFetchJobs from "./useFetchJobs" //custom hook i created
import { Container } from 'react-bootstrap'
import { useState } from "react"
//import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
const [params,setParams] = useState({})
const [page, setPage] = useState(1)
const{loading,jobs = [],error} = useFetchJobs(params, page)



return (
  <Container>
    <h1>Job Listings</h1>
    {loading && <p>Loading...</p>}
    {error && <p>Error: {error.message}</p>}
    <ul>
      {jobs.map(job => (
        <li key={job.job_id}>{job.job_title}</li>
      ))}
    </ul>
    <button onClick={() => setPage(prevPage => prevPage - 1)} disabled={page === 1}>
      Previous
    </button>
    <button onClick={() => setPage(prevPage => prevPage + 1)}>
      Next
    </button>
  </Container>
);
}

export default App
