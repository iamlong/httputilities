const htmlparser = require('../utils/htmlparser').default;
const assert = require('assert');


describe('Test SiteRegx Setting', function () {
    const fs = require('fs');
    const str = fs.readFileSync('./config/sites.json');
    const sites = JSON.parse(str);

    it('Set sites', function (done) {
        const sitereg1 = new htmlparser.SiteRegx(sites.sites[0]);
        assert.equal(sitereg1.domain, 'www.shuquge.com');
        done();
    })
})