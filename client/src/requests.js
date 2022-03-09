const server_url = 'http://localhost:9000/graphql';

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

    const response = await fetch(server_url, {
        method: 'POST',
        body: JSON.stringify({ query }),
        headers: { 'content-type': 'application/json'}
    })

    const data = await response.json()

    console.log(data)

    return data.data.jobs;

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

    const response = await fetch(server_url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ query })
    })

    const data = await response.json()

    console.log(data.data.job)

    return data.data.job
}
