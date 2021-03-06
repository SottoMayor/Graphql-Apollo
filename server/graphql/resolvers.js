const db = require('../db');

const Query = {
    company: (_, { id }) => db.companies.get(id),
    job: (_, { id }) => db.jobs.get(id),
    jobs: () => db.jobs.list()
}

const Mutation = {
    createJob: (_, { input }, context) => {

        console.log(context);
        if(!context.user){
            throw new Error("Not authorizated! You must authenticate first.")
        }

        const createJobId = db.jobs.create( { ...input, companyId: context.user.companyId } );
        const selectedJob = db.jobs.get(createJobId);
        return selectedJob;
    }
}

const Job = {
    company: (job) => db.companies.get(job.companyId)
}

const Company = {
    jobs: (company) => db.jobs.list().filter( job => job.companyId === company.id)
}

module.exports = { Query, Job, Company, Mutation };
