const process = require('process');
const cp = require('child_process');
const path = require('path');

const parseArgumentsFromComments = require("./parse_arguments_from_comments")

test('throws invalid number', async () => {
  await expect(wait('foo')).rejects.toThrow('milliseconds not a number');
});

/*test('wait 500 ms', async () => {
  const start = new Date();
  await wait(500);
  const end = new Date();
  var delta = Math.abs(end - start);
  expect(delta).toBeGreaterThanOrEqual(500);
});
*/

// shows how the runner will run a javascript action with env / stdout protocol
test('test runs', () => {
  process.env['INPUT_COMMAND_PREFIX'] = '/build'
  process.env['INPUT_GITHUB_TOKEN'] = process.env['GITHUB_TOKEN']
  process.env['INPUT_COMMAND_OPTS'] = '{ "foo": { "type": "string" } }'

  const ip = path.join(__dirname, 'index.js');
  const result = cp.execSync(`node ${ip}`, {env: process.env}).toString();

  console.log(result);
})
