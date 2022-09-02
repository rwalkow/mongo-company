const mongoose = require('mongoose');
const Department = require('../department.model');
const expect = require('chai').expect;

describe('Department', () => {
  it('should throw an error if no "name" arg', () => {
    const dep = new Department({}); // create new Department, but don't set `name` attr value

    dep.validate(err => {
      expect(err.errors.name).to.exist;
    });
  });

  it('should throw an error if "name" is not a string', () => {
    const cases = [{}, []];
    for (let name of cases) {
      const dep = new Department({ name });

      dep.validate(err => {
        expect(err.errors.name).to.exist;
      });
    }
  });

  it('should throw an error if "name" have char < 5 and > 20', () => {
    const cases = ['Abc', 'abcd', 'Lorem Ipsum, Lorem Ip']; // we test various cases, some of them are too short, some of them are too long
    for (let name of cases) {
      const dep = new Department({ name });

      dep.validate(err => {
        if (err) {
          expect(err.errors.name).to.exist;
          // console.log('###### ', name, ' - err.errors.name:', err.errors.name);
        }
      });
    }
  });

  it('should not throw an error if "name" is OK', () => {
    const cases = ['Special Department', 'Archives X']; // we test various cases, some of them are too short, some of them are too long
    for (let name of cases) {
      const dep = new Department({ name });

      dep.validate(err => {
        expect(err).to.not.exist;
      });
    }
  });

  after(() => {
    mongoose.models = {};
  });
});
