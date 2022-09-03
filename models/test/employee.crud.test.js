const Employee = require('../employee.model');
const Department = require('../department.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee CRUD', () => {
  before(async () => {
    try {
      await mongoose.connect('mongodb://localhost:27017/companyDBtest', { useNewUrlParser: true, useUnifiedTopology: true });
    } catch (err) {
      console.error(err);
    }
  });

  describe('Reading data', () => {
    before(async () => {
      const testEmpOne = new Employee({ firstName: 'FirstName #1', lastName: 'lastName #1', department: '62c9bf010b3b7578e355b6ee' });
      await testEmpOne.save();

      const testEmpTwo = new Employee({ firstName: 'FirstName #2', lastName: 'lastName #2', department: '62c9bf630b3b7578e355b6f1' });
      await testEmpTwo.save();
    });

    it('should return all the data with find method with populate', async () => {
      const employees = await Employee.find().populate('department');
      const employees2 = await Employee.find().populate('department').exec();
    });

    it('should return all the data with find method', async () => {
      const employees = await Employee.find();
      const expectedLength = 2;
      expect(employees.length).to.be.equal(expectedLength);
    });

    it('should return proper document by various params with findOne method', async () => {
      const expectedName = 'FirstName #1';
      const employee = await Employee.findOne({firstName: expectedName});
      expect(employee.firstName).to.be.equal(expectedName);
    });


    after(async () => {
      await Employee.deleteMany();
    });
  });

  describe('Creating data', () => {
    it('should insert new document with insertOne method', async () => {
      const employee = new Employee({ firstName: 'FirstName #1', lastName: 'lastName #1', department: 'idDepartment#1' });
      await employee.save();
      expect(employee.isNew).to.be.false;
    });
  });

  describe('Updating data', () => {
    beforeEach(async () => {
      const testEmpOne = new Employee({ firstName: 'FirstName #1', lastName: 'lastName #1', department: 'idDepartment#1' });
      await testEmpOne.save();

      const testEmpTwo = new Employee({ firstName: 'FirstName #2', lastName: 'lastName #2', department: 'idDepartment#2' });
      await testEmpTwo.save();
    });

    it('should properly update one document with "updateOne" method', async () => {
      const expectedName = '=FirstName #1=';
      await Employee.updateOne({ firstName: 'FirstName #1' }, { $set: { firstName: expectedName } });
      const updatedEmployee = await Employee.findOne({ firstName: expectedName });
      expect(updatedEmployee).to.not.be.null;
    });

    it('should properly update one document with "save" method', async () => {
      const expectedName = '=FirstName #1=';
      const employee = await Employee.findOne({ firstName: 'FirstName #1' });
      employee.firstName = expectedName;
      await employee.save();

      const updatedEmployee = await Employee.findOne({ firstName: expectedName });
      expect(updatedEmployee).to.not.be.null;
    });

    it('should properly update multiple documents with "updateMany" method', async () => {
      const expectedName = 'Updated!';
      await Employee.updateMany({}, { $set: { firstName: expectedName } });
      const updatedEmployee = await Employee.find({ firstName: expectedName });
      expect(updatedEmployee.length).to.be.equal(2);
    });

    afterEach(async () => {
      await Employee.deleteMany();
    });
  });

  describe('Removing data', () => {
    beforeEach(async () => {
      const testEmpOne = new Employee({ firstName: 'FirstName #1', lastName: 'lastName #1', department: 'idDepartment#1' });
      await testEmpOne.save();

      const testEmpTwo = new Employee({ firstName: 'FirstName #2', lastName: 'lastName #2', department: 'idDepartment#2' });
      await testEmpTwo.save();
    });

    it('should properly remove one document with "deleteOne" method', async () => {
      const deleteName = 'FirstName #1';
      await Employee.deleteOne({ firstName: deleteName });

      const deleteEmployee = await Employee.findOne({ firstName: deleteName });
      expect(deleteEmployee).to.be.null;
    });

    it('should properly remove one document with "remove" method', async () => {
      const deleteName = 'FirstName #1';
      const employee = await Employee.findOne({ firstName: deleteName });
      await employee.remove();

      const deleteEmployee = await Employee.findOne({ firstName: deleteName });
      expect(deleteEmployee).to.be.null;
    });

    it('should properly remove multiple documents with "deleteMany" method', async () => {
      await Employee.deleteMany();
      const deleteEmployees = await Employee.find();
      expect(deleteEmployees.length).to.be.equal(0);
    });


    afterEach(async () => {
      await Employee.deleteMany();
    });
  });
});
