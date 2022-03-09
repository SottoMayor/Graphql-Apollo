import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { fetchJobsById } from './requests';

export class JobDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      job: null
    }
  }
  
  async componentDidMount(){
    const { jobId } = this.props.match.params;

    const response = await fetchJobsById(jobId);

    this.setState({job: response});

  }

  render() {
    const {job} = this.state;

    if(job === null){
      return <p>...LOADING</p>
    }

    return (
      <div>
        <h1 className="title">{job.title}</h1>
        <h2 className="subtitle">
          {<Link to={`/companies/${job.company.id}`}>{job.company.name}</Link>}
        </h2>
        <div className="box">{job.description}</div>
      </div>
    );
  }
}
