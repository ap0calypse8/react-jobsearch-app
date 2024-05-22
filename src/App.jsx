import useFetchJobs from "./useFetchJobs" //custom hook i created
import { Container,Form, Button } from 'react-bootstrap'
import { useState } from "react"
import Job from "./Job"
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
const [params,setParams] = useState({})
const [page, setPage] = useState(1)
const{loading,jobs = [],error} = useFetchJobs(params, page)

const handleSearch = (e) => {
  e.preventDefault();
  const formData = new FormData(e.target)
  const searchParams ={
    query: formData.get('query'),
    location: formData.get('location')
  }
  setParams(searchParams)
}

return (
  
  <Container className="my-4">
    <h1 className="mb-4">Job Listings</h1>
    <div className="d-flex justify-content-center">
  <Form onSubmit={handleSearch} className='mb-4'>
    <Form.Group controlId='query'>
        <Form.Label>Job Title</Form.Label>
        <Form.Control name='query' type='text' placeholder="Enter job title" />
    </Form.Group>
    <Form.Group controlId="location">
          <Form.Label>Location</Form.Label>
          <Form.Control name="location" type="text" placeholder="Enter location" />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-2">Search</Button>
  </Form>
  </div>

    {loading && <p>Loading...</p>}
    {error && <p>Error: {error.message}</p>}
    <div>
      {jobs.map(job => (
        <Job key={job.job_id} job={job}/> 
      ))}
    </div>  
    <div className="d-flex justify-content-between my-4">
    <Button onClick={() => setPage(prevPage => prevPage - 1)} disabled={page === 1}>
      Previous
    </Button>
    <Button onClick={() => setPage(prevPage => prevPage + 1)}>
      Next
    </Button>
    </div>
  </Container>
);
}

export default App
