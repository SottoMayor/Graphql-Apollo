const db = require('../db');

const Query = {
    company: (_, { id }) => db.companies.get(id),
    job: (_, { id }) => db.jobs.get(id),
    jobs: () => db.jobs.list()
}

const Job = {
    company: (job) => db.companies.get(job.companyId)
}

module.exports = { Query, Job };
