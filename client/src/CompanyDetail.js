import React, { Component } from 'react';
import { fetchCompaniesById } from './requests';
import { JobList } from './JobList';

export class CompanyDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {company: null};
  }

  async componentDidMount() {
    const {companyId} = this.props.match.params;
    const response = await fetchCompaniesById(companyId);

    this.setState({company: response});
  }

  render() {
    const {company} = this.state;

    if(!company){
      return <p>...LOADING</p>
    }

    return (
      <div>
        <h1 className="title">{company.name}</h1>
        <div className="box">{company.description}</div>
        <h5 className="title is-5">Jobs at {company.name}</h5>
        <JobList jobs={company.jobs} />
      </div>
    );
  }
}
