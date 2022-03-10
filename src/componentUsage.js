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

      files = _.split(stdout, '\n');
      // the *entire* stdout and stderr (buffered)
      console.log(`stdout: ${JSON.stringify({files})}`);
    });

    resolve({
      string,
      occurances: _.size(files),
      occurancesByDirectory: {
        'apps': 50,
        'hris': 20
      }
    }); 
  });
};

module.exports = componentUsage;
