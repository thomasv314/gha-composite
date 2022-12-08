const github = require('@actions/github');
const core = require('@actions/core');
const { parseArgs } = require('@pkgjs/parseArgs');

// most @actions toolkit packages have async methods
async function run() {
  const commandPrefix = core.getInput('command-prefix')
  const commandOptsString = core.getInput('command-options')
  let commandOpts

  try {
    commandOpts = JSON.parse(commandOptsString)
  } catch (error) {
    core.error(`Failed to parse command options: ${commandOptsString}`)
    core.setFailed(error.message);
  }

  try {
    const token = core.getInput('github-token');
    const octokit = github.getOctokit(token)
    // You can also pass in additional options as a second parameter to getOctokit
    // const octokit = github.getOctokit(myToken, {userAgent: "MyActionVersion1"});
    owner = github.context.repo.owner
    repo = github.context.repo.repo
    issue_number = github.context.issue.number

    const { data: comments } = await octokit.rest.issues.listComments({
      owner,
      repo,
      issue_number,
    });

    console.log(JSON.stringify(comments, null, 4))

    for (var i = 0; i < comments.length; i++) {
      const body = comments[i]["body"].replace(/(\r\n|\n|\r)/gm, "")
      const created = comments[i]["created_at"]
      if (body.startsWith(commandPrefix)) {
        const args = body.replace(commandPrefix, "").split(" ")
        const { values, positionals } = parseArgs({ args, commandOpts, allowPositionals: true });
        console.log("COMMENT STARTS WITH:", body, created)
        console.log("VALUES", value, "POSITIONALS", positionals)
      } else {
        console.log("COMMENT DOESNT START WITH PREFIX", body, created)
      }
      console.log("---")
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
