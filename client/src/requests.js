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
