const axios = require('axios');
const core = require('@actions/core');

const flashboardToken = core.getInput('FE_FLASHBOARD_TOKEN');

// Set config defaults when creating the instance
const FlashboardClient = axios.create({
  baseURL: 'https://flashboard.ripplinginternal.com',
  headers: {'Authorization': `Bearer ${flashboardToken}`}
});

module.exports = {
  postFeAnalytics: (data) => {
    return FlashboardClient.post('/api/fe-analytics', data);
  }
}