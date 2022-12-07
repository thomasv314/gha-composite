const github = require('@actions/github');
const core = require('@actions/core');

async function run() {
    const token = core.getInput('github-token')

    const context = github.context;

    const octokit = github.getOctokit(token)

    // You can also pass in additional options as a second parameter to getOctokit
    // const octokit = github.getOctokit(myToken, {userAgent: "MyActionVersion1"});

    const { data: pullRequest } = await octokit.pulls.get({
        owner: 'octokit',
        repo: 'rest.js',
        pull_number: 123,
        mediaType: {
          format: 'diff'
        }
    });

    console.log(pullRequest);
}

run();
