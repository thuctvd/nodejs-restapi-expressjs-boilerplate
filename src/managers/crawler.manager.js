
class CrawlerManager {
  constructor(app) {
    this.app = app;
    this.init();
  }
  init() {
    console.log(`***** Init Crawler Manager ******`);
  }
  async getListNode() {
    console.log(`get list Node`);
  }

  async startNewNode({ nodeId, agentInfo }) {
    console(`start new Node: id[${nodeId}] agentInfo: ${JSON.stringify(agentInfo)}`);
  }

  async requestAction({ cmd, data }) {
    console(`request action on a Node`);
  }

  async test(){
    console.log(`Crawler Manager Test`);
  }
}

module.exports = CrawlerManager;