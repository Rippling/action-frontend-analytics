const { exec } = require('child_process');
const core = require('@actions/core');
const componentUsage = require('./src/componentUsage');


// most @actions toolkit packages have async methods
async function run() {
  try {
    const ft = core.getInput('flashboard-token');
    core.info(`Starting the analytics....`);

    const usages = await componentUsage({ pattern: /Common\/table\/components\/table/ });

    // grep -l -r "Common/table/components/table" app/modules/
    exec('grep -l -r "Common/table/components/table" app/modules/', (err, stdout, stderr) => {
      if (stderr || err) {
        core.setFailed(stderr || err.message);
        return;
      }
      // the *entire* stdout and stderr (buffered)
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    });

    core.info(`Usages: ${JSON.stringify(usages)}`);
    core.info('End of analytics!');
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
