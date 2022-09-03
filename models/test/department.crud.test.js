const Department = require('../department.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Department CRUD', () => {
  before(async () => {
    try {
      await mongoose.connect('mongodb://localhost:27017/companyDBtest', { useNewUrlParser: true, useUnifiedTopology: true });
    } catch (err) {
      console.error(err);
    }
  });

  describe('Reading data', () => {
    before(async () => {
      const testDepOne = new Department({ name: 'Department #1' });
      await testDepOne.save();

      const testDepTwo = new Department({ name: 'Department #2' });
      await testDepTwo.save();
    });

    it('should return all the data with "find" method', async () => {
      const departments = await Department.find();
      const expectedLength = 2;
      expect(departments.length).to.be.equal(expectedLength);
    });

    it('should return a proper document by "name" with "findOne" method', async () => {
      const expectedName = 'Department #1';
      const department = await Department.findOne({ name: expectedName });
      expect(department.name).to.be.equal(expectedName);
    });

    after(async () => {
      await Department.deleteMany();
    });
  });

  describe('Creating data', () => {
    it('should insert new document with "insertOne" method', async () => {

      const expectedName = 'Department #1';

      const department = new Department({ name: expectedName });
      await department.save();

      expect(department.isNew).to.be.false;
    });

    after(async () => {
      await Department.deleteMany();
    });
  });

  describe('Updating data', () => {
    beforeEach(async () => {
      const testDepOne = new Department({ name: 'Department #1' });
      await testDepOne.save();

      const testDepTwo = new Department({ name: 'Department #2' });
      await testDepTwo.save();
    });

    it('should properly update one document with "updateOne" method', async () => {
      const expectedName = '=Department #1=';
      await Department.updateOne({ name: 'Department #1' }, { $set: { name: expectedName } });
      const updatedDepartment = await Department.findOne({ name: expectedName });
      expect(updatedDepartment).to.not.be.null;
    });

    it('should properly update one document with "save" method', async () => {
      const expectedName = '=Department #1=';
      const department = await Department.findOne({ name: 'Department #1' });
      department.name = expectedName;
      await department.save();

      const updatedDepartment = await Department.findOne({ name: expectedName });
      expect(updatedDepartment).to.not.be.null;
    });

    it('should properly update multiple documents with "updateMany" method', async () => {
      const expectedName = 'Updated!';
      await Department.updateMany({}, { $set: { name: expectedName } });
      const updatedDepartments = await Department.find({ name: expectedName });
      expect(updatedDepartments.length).to.be.equal(2);
    });

    afterEach(async () => {
      await Department.deleteMany();
    });
  });

  describe('Removing data', () => {
    beforeEach(async () => {
      const testDepOne = new Department({ name: 'Department #1' });
      await testDepOne.save();

      const testDepTwo = new Department({ name: 'Department #2' });
      await testDepTwo.save();
    });

    it('should properly remove one document with "deleteOne" method', async () => {
      const deleteName = 'Department #1';
      await Department.deleteOne({ name: deleteName });

      const deleteDepartment = await Department.findOne({ name: deleteName });
      expect(deleteDepartment).to.be.null;
    });

    it('should properly remove one document with "remove" method', async () => {
      const deleteName = 'Department #1';
      const department = await Department.findOne({ name: deleteName });
      await department.remove();

      const deleteDepartment = await Department.findOne({ name: deleteName });
      expect(deleteDepartment).to.be.null;
    });

    it('should properly remove multiple documents with "deleteMany" method', async () => {
      await Department.deleteMany();
      const deleteDepartments = await Department.find();
      expect(deleteDepartments.length).to.be.equal(0);
    });

    afterEach(async () => {
      await Department.deleteMany();
    });
  });
});
