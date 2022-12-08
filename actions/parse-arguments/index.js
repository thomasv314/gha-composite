const github = require('@actions/github');
const core = require('@actions/core');
const parseArgumentsFromComments = require('./parse_arguments_from_comments')

// most @actions toolkit packages have async methods
async function run() {
  try {
    const token = core.getInput('github-token');
    const octokit = github.getOctokit(token)

    const { data: comments } = await octokit.rest.issues.listComments({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      issue_number: github.context.issue.number
    });

    const commandPrefix = core.getInput('command-prefix')
    const commandOptionsString = core.getInput('command-options')

    let { found, options } = parseArgumentsFromComments(comments, commandPrefix, commandOptionsString)

  } catch (error) {
    core.setFailed(error.message)
  }
}

run();
