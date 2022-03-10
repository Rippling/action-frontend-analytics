const _  = require('lodash');
const core = require('@actions/core');
const { exec } = require('child_process');

const componentUsage = async function ({ string }) {
  return new Promise((resolve, reject) => {
    let files = [];
    exec(`grep -l -r ${string} app/modules/`, (err, stdout, stderr) => {
      if (stderr || err) {
        core.setFailed(stderr || err.message);
        return;
      }

      files = _(stdout)
        .split('\n')
        .map(item => _.split(item, 'app/modules/')[1])
        .groupBy(item => _.split(item, '/')[0])
        .value();
      // the *entire* stdout and stderr (buffered)
      // console.log(`stdout: ${JSON.stringify({files})}`);
      resolve({
        string,
        occurances: _.size(files),
        occurancesByDirectory: files
      }); 
    });
  });
};

module.exports = componentUsage;
