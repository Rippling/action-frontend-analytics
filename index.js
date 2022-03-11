const core = require('@actions/core');
const componentUsage = require('./src/componentUsage');

// most @actions toolkit packages have async methods
async function run() {
  try {
    const ft = core.getInput('flashboard-token');
    core.info(`Starting the analytics....`);

    // Table usages
    const usages = await componentUsage({
      string: 'Common/table/components/table',
    });

    const data = {
      TableUsage: usages,
    }

    core.info(`Analytics data: ${JSON.stringify(data)}`);
    core.info('End of analytics!');
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
