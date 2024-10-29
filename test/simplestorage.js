const SimpleDonate = artifacts.require("./SimpleDonate.sol");

contract("SimpleDonate", accounts => {
  // it("should total donate value is 0.", async () => {
  //   const simpleDonateInstance = await SimpleDonate.deployed();

  //   const storedData = await simpleDonateInstance.getTotalDonate.call();

  //   assert.equal(storedData, 0, "TThe total donate must be 0");
  // });

  describe("Donate and get all address", () => {
    
    it("should total donate value is 10000.", async () => {
      const simpleDonateInstance = await SimpleDonate.deployed();
      
      await simpleDonateInstance.donate({ from: accounts[0], value: 10000 });
      console.log(accounts[0]);
      const storedData = await simpleDonateInstance.getTotalDonate.call();
      console.log(storedData);
      assert.equal(storedData, 10000, "The total donate must be 10000");
    });
    
    it("should total donated address is 1", async () => {
      const simpleDonateInstance = await SimpleDonate.deployed();
      const allAddress = await simpleDonateInstance.geAllAddressDonated.call()
      assert.equal(allAddress.length, 1, "The count of all address must be 1");
    })
    
    it("owner can should be claim", async () => {
      const simpleDonateInstance = await SimpleDonate.deployed();
      const result = await simpleDonateInstance.ownerClaim.call()
      assert.equal(result, true, "The result of owner claim can be true")
    })
  })
});
