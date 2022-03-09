import { getAccessToken, isLoggedIn } from "./auth";

const server_url = 'http://localhost:9000/graphql';


const graphqlRequests = async (query) => {

    const request = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
    }

    if(isLoggedIn()) {
        request.headers['Authorization'] = 'Bearer ' + getAccessToken();
    }

    const response = await fetch(server_url, request);

    const data = await response.json();

    if(data.errors){
        const message = data.errors.map(error => error.message).join('\n');
        throw new Error(message)
    }

    console.log(data.data)

    return data.data
}

export const fetchJobs = async () => {

    const query = `
        {
            jobs{
                    id
                    description
                    title
                    company{
                        id
                        description
                        name
                }
            }
        }
    `

    const data = await graphqlRequests(query);
    

    return data.jobs;

}

export const fetchJobsById = async ( jobId ) => {
    const query = `
        {
            job(id: "${jobId}"){
                id
                title
                company{
                    id
                    name
                }
                description
            }
        }
    `

    const data = await graphqlRequests(query);

    return data.job
}

export const fetchCompaniesById = async (companyId) => {
    const query = `
        {
            company(id: "${companyId}"){
                name
                description
                id
                jobs{
                    id
                    title
                }
            }
        }
    `

    const data = await graphqlRequests(query);

    return data.company;
}

export const addNewJob = async (jobData) => {

    const { companyId, title, description } = jobData

    const query = `
        mutation {
            createJob(input: { companyId: "${companyId}", title: "${title}", description: "${description}"}) {
                company {
                    id
                    name
                }
                id
                title
            }
        }
    `

    const data = await graphqlRequests(query);

    return data.createJob;

}