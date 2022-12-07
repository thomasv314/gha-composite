const github = require('@actions/github');
const core = require('@actions/core');


// most @actions toolkit packages have async methods
async function run() {
  try {
    const token = core.getInput('github-token');
    const octokit = github.getOctokit(token)
    // You can also pass in additional options as a second parameter to getOctokit
    // const octokit = github.getOctokit(myToken, {userAgent: "MyActionVersion1"});

    console.log(JSON.stringify(github.context.payload, null, 4))

    console.log("CONTEXT", github.context.repo)

    owner = github.context.repo.owner
    repo = github.context.repo.name

    pull_number = github.context.issue.number

    console.log("owner", owner, "repo", repo, "pull_number", pull_number)
    const data = await octokit.rest.pulls.listCommentsForReview({
      owner,
      repo,
      pull_number,
    });

    console.log(JSON.stringify(data, null, 4))

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
