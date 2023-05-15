const { ethers } = require("hardhat")
const { expect, assert } = require("chai")

describe("SimpleStorage", async function () {
    let simpleStorageFactory, simpleStorage
    beforeEach(async function () {
        simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
        simpleStorage = await simpleStorageFactory.deploy()
    })

    it("Should start with a favorite number of 0", async function () {
        const currentValue = await simpleStorage.retrieve()

        assert.equal(currentValue.toString(), "0")
    })
    it("Should update when calling store", async function () {
        const transactionResponse = await simpleStorage.store(7)
        await transactionResponse.wait(1)

        const currentValue = await simpleStorage.retrieve()
        assert(currentValue.toString(), "7")
    })
    it("Adds person favorite number", async function () {
        const transactionResponse = await simpleStorage.addPerson("Boris", 12)
        await transactionResponse.wait(1)

        const borkoNumber = await simpleStorage.nameToFavoriteNumber("Boris")
        assert.equal(borkoNumber.toString(), "12")
    })
})
