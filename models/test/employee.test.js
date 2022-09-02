const mongoose = require('mongoose');
const Employee = require('../employee.model.js');
const expect = require('chai').expect;

describe('Employee', () => {
  it('should throw an error if no "firstName" arg', () => {
    const dep = new Employee({}); // create new Department, but don't set `name` attr value

    dep.validate(err => {
      expect(err.errors.firstName).to.exist;
    });
  });

  it('should throw an error if no "lastName" arg', () => {
    const dep = new Employee({}); // create new Department, but don't set `name` attr value

    dep.validate(err => {
      expect(err.errors.lastName).to.exist;
    });
  });

  it('should throw an error if no "department" arg', () => {
    const dep = new Employee({}); // create new Department, but don't set `name` attr value

    dep.validate(err => {
      expect(err.errors.department).to.exist;
    });
  });

  it('should throw an error if "firstName" is not a string', () => {
    const cases = [{}, []];
    for (let firstName of cases) {
      const dep = new Employee({ firstName });

      dep.validate(err => {
        expect(err.errors.firstName).to.exist;
      });
    }
  });

  it('should throw an error if "lastName" is not a string', () => {
    const cases = [{}, []];
    for (let lastName of cases) {
      const dep = new Employee({ lastName });

      dep.validate(err => {
        expect(err.errors.lastName).to.exist;
      });
    }
  });

  it('should throw an error if "department" is not a string', () => {
    const cases = [{}, []];
    for (let department of cases) {
      const dep = new Employee({ department });

      dep.validate(err => {
        expect(err.errors.department).to.exist;
      });
    }
  });

  it('should not throw an error if "firstName" is OK', () => {
    const cases = ['Special Department', 'Archives X'];
    for (let firstName of cases) {
      const dep = new Employee({ firstName });

      dep.validate(err => {
          expect(err.errors.firstName).to.not.exist;
      });
    }
  });

  it('should not throw an error if "lastName" is OK', () => {
    const cases = ['Special Department', 'Archives X'];
    for (let lastName of cases) {
      const dep = new Employee({ lastName });

      dep.validate(err => {
        expect(err.errors.lastName).to.not.exist;
      });
    }
  });

  it('should not throw an error if "department" is OK', () => {
    const cases = ['Special Department', 'Archives X'];
    for (let department of cases) {
      const dep = new Employee({ department });

      dep.validate(err => {
        expect(err.errors.department).to.not.exist;
      });
    }
  });

  after(() => {
    mongoose.models = {};
  });
});
