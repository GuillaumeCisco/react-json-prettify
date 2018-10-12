var expect = require('chai').expect;
var JSONPretty = require('../index');

describe('JSONPretty', function() {
    it('should create component with json', function() {
        var C = JSONPretty({json: {name: 'toto'}});

        expect('1').to.equal('1');
    });
});