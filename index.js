const core = require('@actions/core');
const componentUsage = require('./src/componentUsage');


// most @actions toolkit packages have async methods
async function run() {
  try {
    const ft = core.getInput('flashboard_token');
    core.info(`Starting the analytics....`);

    const usages = await componentUsage({ pattern: /Common\/table\/components\/table/ });

    core.setOutput('usages', usages);
    core.info('End of analytics!');
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
