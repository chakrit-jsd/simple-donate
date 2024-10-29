// const SimpleStorage = artifacts.require("SimpleStorage");
const SimpleDonate = artifacts.require("SimpleDonate");

module.exports = function (deployer) {
  deployer.deploy(SimpleDonate);
};
