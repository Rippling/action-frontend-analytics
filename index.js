const core = require('@actions/core');
const componentUsage = require('./src/componentUsage');
const FlashboardService = require('./src/services/Flashboard')

// most @actions toolkit packages have async methods
async function run() {
  try {
    core.info(`Starting the analytics....`);

    // Table usages
    const usages = await componentUsage({
      string: 'Common/table/components/table',
    });

    const feAnalyticsData = [{
      id: 'TableUsage',
      value: usages,
    }];

    core.info(`Analytics data: ${JSON.stringify(feAnalyticsData, null, 2)}`);
    core.info('Sending data to Flashboard ....');

    await FlashboardService.postFeAnalytics(feAnalyticsData);
    core.info('End of analytics!');
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
