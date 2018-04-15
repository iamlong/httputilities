const fs = require('fs');
const htmlstr = fs.readFileSync('./debug/book.html', 'utf-8');

const str = fs.readFileSync('./config/sites.json');
const sites = JSON.parse(str);

const htmlparse = require('../utils/htmlparser');
const siteregx = new htmlparse.SiteRegx(sites.sites[0]);

const fileparser = new htmlparse.HtmlParser();

const book = fileparser.ParseBook(htmlstr, siteregx);


