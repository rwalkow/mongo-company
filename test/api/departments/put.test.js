const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const Department = require('../../../models/department.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('PUT /api/departments', () => {
  before(async () => {
    const testDepOne = new Department({ _id: '5d9f1140f10a81216cfd4408', name: 'Department #1' });
    await testDepOne.save();
  });

  it('/:id should update chosen document and return success', async () => {
    const updateId = '5d9f1140f10a81216cfd4408';
    const expectedName = '=#Department #1=';
    const res = await request(server).put('/api/departments/' + updateId).send({ name: expectedName });
    const updateDepartment = await Department.findOne({ _id: updateId, name: expectedName });
    expect(res.status).to.be.equal(200);
    expect(updateDepartment).to.not.be.null;
  });

  after(async () => {
    await Department.deleteMany();
  });
});
