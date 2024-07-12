const axios = require('axios');
const { namespaceWrapper } = require('@_koii/namespace-wrapper');
const task = require('./task');

class CoreLogic {
  async task(round) {
    const result = await task.submission.task(round);
    const talentData = await this.fetchTalentData();
    await namespaceWrapper.storeSet(round.toString(), JSON.stringify(talentData));
    return talentData;
  }

  async submitTask(round) {
    const submission = await task.submission.submitTask(round);
    return submission;
  }

  async auditTask(round) {
    await task.audit.auditTask(round);
  }

  async selectAndGenerateDistributionList(
    round,
    isPreviousRoundFailed = false,
  ) {
    await namespaceWrapper.selectAndGenerateDistributionList(
      task.distribution.submitDistributionList,
      round,
      isPreviousRoundFailed,
    );
  }

  async auditDistribution(round) {
    await task.distribution.auditDistribution(round);
  }


  async fetchTalentData() {
    try
    {
      const response = await axios.get('https://api.talentprotocol.com/api/v2/passports?per_page=10&page=1');
      return response.data;
    }
    catch (error)
    {
      console.error('Error fetching data:', error);
      return null;
    }
  }
}


const coreLogic = new CoreLogic();

module.exports = { coreLogic };
