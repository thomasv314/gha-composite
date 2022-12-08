export default function parseArgumentsFromComments(comments, command, optionsString) {
  // Find all comments that are commands, pick the last one
  let match = comments.filter(comment => comment["body"].startsWith(command)).slice(-1)

  if (match) {
    // Remove newlines from the matching comment body
    const body = match["body"].replace(/(\r\n|\n|\r)/gm, "")

    // Remove the prefix and split by spaces to parse the arguments
    const args = body.replace(command, "").split(" ")
    const options = JSON.parse(optionsString)

    const { values, positionals } = parseArgs({ args, options })

    return { found: true, options: values }
  }

  return { found: false, options: {} }
}
