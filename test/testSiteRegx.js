const htmlparser = require('../utils/htmlparser');
var assert = require('assert');


describe('Test SiteRegx Setting', function () {
    it('Set sites', function (done) {
        var sitereg1 = new htmlparser.SiteRegx('ABCDE');
        var sitereg2 = new htmlparser.SiteRegx('FGHIJK');

        assert.equal(sitereg1.domain, 'ABCDE');
        assert.equal(sitereg2.domain, 'FGHIJK');
        console.log(sitereg1);
        done();
    })
})