import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

export default function Job({ job }) {
    if (!job) {
        console.error('Job prop is undefined');
        return null;
    }

    const { job_title, company, location, description = 'No description provided.', redirect_url, salary_min, salary_max, job_type, posted_date } = job;

    return (
        <Card className='mb-2' style={{ width: '100%' }}>
            <Card.Body>
                <Card.Title>{job_title}</Card.Title>
                <Card.Subtitle className='mb-2 text-muted'>{company?.employer_name}</Card.Subtitle>
                <Card.Text>
                    {location?.job_city}
                    <br />
                    {description}
                    <br />
                    <strong>Salary:</strong> {salary_min ? `$${salary_min} - $${salary_max}` : 'Not provided'}
                    <br />
                    <strong>Type:</strong> {job_type}
                    <br />
                    <strong>Posted on:</strong> {new Date(posted_date).toLocaleDateString()}
                </Card.Text>
                <Card.Link href={redirect_url} target="_blank">View job</Card.Link>
            </Card.Body>
        </Card>
    );
}

Job.propTypes = {
    job: PropTypes.shape({
        job_title: PropTypes.string.isRequired,
        company: PropTypes.shape({
            employer_name: PropTypes.string.isRequired
        }),
        location: PropTypes.shape({
            job_city: PropTypes.string.isRequired
        }),
        description: PropTypes.string,
        redirect_url: PropTypes.string.isRequired,
        salary_min: PropTypes.number,
        salary_max: PropTypes.number,
        job_type: PropTypes.string,
        posted_date: PropTypes.string
    }).isRequired
};
