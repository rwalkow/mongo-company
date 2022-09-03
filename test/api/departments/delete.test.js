const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const Department = require('../../../models/department.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('DELETE /api/departments', () => {
  before(async () => {
    const testDepOne = new Department({ _id: '5d9f1140f10a81216cfd4408', name: 'Department #1' });
    await testDepOne.save();
  });

  it('/:id should remove one document and return success', async () => {
    const updateId = '5d9f1140f10a81216cfd4408';
    const res = await request(server).delete('/api/departments/' + updateId);
    const updateDepartment = await Department.findOne({ _id: updateId });
    expect(res.status).to.be.equal(200);
    expect(updateDepartment).to.be.null;
  });

  after(async () => {
    await Department.deleteMany();
  });
});
