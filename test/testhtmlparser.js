const htmlparser = require('../utils/htmlparser');
const assert = require('assert');


describe('HTML Parser Utility', function () {
    const fs = require('fs');
    const str = fs.readFileSync('./config/sites.json');
    const sites = JSON.parse(str);

    it('Test JSON loading', function (done) {
        const sitereg1 = new htmlparser.SiteRegx(sites.sites[0]);
        assert.equal(sitereg1.domain, 'www.shuquge.com');
        done();
    });
    it('Test Book Parser', function (done) {
        const fs = require('fs');
        const htmlstr = fs.readFileSync('./test/book.html', 'utf-8');
        const htmlparse = require('../utils/htmlparser');
        const siteregx = new htmlparse.SiteRegx(sites.sites[0]);
        const fileparser = new htmlparse.HtmlParser();
        const book = fileparser.ParseBook(htmlstr, siteregx);
        assert.equal(book.title, "修真聊天群");
        assert.equal(book.directory.length, 1866);
        done();

    });
})