const _  = require('lodash');
const core = require('@actions/core');
const { exec } = require('child_process');

const componentUsage = async function ({ identifier, string }) {
  return new Promise((resolve, reject) => {
    let files = [];
    let occurancesByDirectory = {}
    exec(`grep -l -r ${string} app/modules/`, (err, stdout, stderr) => {
      if (stderr || err) {
        core.setFailed(stderr || err.message);
        return;
      }

      files = _(stdout)
        .split('\n')
        .map(item => _.split(item, 'app/modules/')[1])
        .compact()
        .value();

      occurancesByDirectory = _.groupBy(files, item => _.split(item, '/')[0])
      // the *entire* stdout and stderr (buffered)
      // console.log(`stdout: ${JSON.stringify({files})}`);
      resolve({
        identifier,
        string,
        occurances: _.size(files),
        occurancesByDirectory: occurancesByDirectory,
      }); 
    });
  });
};

module.exports = componentUsage;
