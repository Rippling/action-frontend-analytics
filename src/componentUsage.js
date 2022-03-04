const componentUsage = async function ({ pattern }) {
  return {
    pattern,
    occurances: 150,
    occurancesByDirectory: {
      'apps': 50,
      'hris': 20
    }
  }
};

module.exports = componentUsage;
