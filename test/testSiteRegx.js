const htmlparser = require('../utils/htmlparser');
var assert = require('assert');


describe('Test SiteRegx Setting', function () {
    const fs = require('fs');
    const str = fs.readFileSync('./config/sites.json');
    const sites = JSON.parse(str);

     it('Set sites', function (done) {
        var sitereg1 = new htmlparser.SiteRegx(sites.sites[0].site, sites.sites[0].domain,sites.sites[0].booktitle, sites.sites[0].bookdescription, sites.sites[0].bookimage, sites.sites[0].bookauthor, sites.sites[0].bookdirctstart, sites.sites[0].bookdirctend, sites.sites[0].bookdirctitem);
        assert.equal(sitereg1.domain, 'www.shuquge.com');
        done();
    })
})