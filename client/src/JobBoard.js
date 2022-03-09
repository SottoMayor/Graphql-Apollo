import React, { Component } from 'react';
import { JobList } from './JobList';
import { fetchJobs } from './requests';

export class JobBoard extends Component {

  state = {
    jobs: [],
  }

  async componentDidMount() {
    const response = await fetchJobs();

    this.setState({ jobs: response });
  }

  render() {
    return (
      <div>
        <h1 className="title">Job Board</h1>
        <JobList jobs={this.state.jobs} />
      </div>
    );
  }
}
