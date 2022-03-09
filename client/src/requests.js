const server_url = 'http://localhost:9000/graphql';

const graphqlRequests = async (query) => {
    const response = await fetch(server_url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
    })

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
    console.log(jobId);
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
