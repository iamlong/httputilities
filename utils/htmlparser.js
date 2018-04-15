//import { isNullOrUndefined } from "util";

//笔趣网
//title: \b*<meta property=\"og:title\" content=\"(.*)\" \/>.
//Decription: \b*<meta property=\"og:description\" content=\"(.*)
//image: \b*<meta property=\"og:image\" content=\"(.*)\" />
//Author: \b*<meta property=\"og:novel:author\" content=\"(.*)\" />
//Directory Start: <div class=\"listmain\">.*\r\n.*<dl>\r\n.*<dt>\r\n.*\r\n.*</dt>\r\n(.*<dd>.*</dd>\r\n)*.*<dt>.*</dt>\r\n
//Directory End: </dl>.*\r\n.*</div>.*\r\n.*<script>list3\\(\\);</script>
//Directory item: <dd><a href=\"\(.*\)\">\(.*\)</a></dd>

class HtmlParser {
    constructor() {
        this.ParseBook = function (htmlData, SiteRegx) {
            function _parsebook(html, book) {
                book.title = _getBookMetaData(html, SiteRegx.title_regx);
                book.description = _getBookMetaData(html, SiteRegx.description_regx);
                book.image = _getBookMetaData(html, SiteRegx.image_regx);
                book.author = _getBookMetaData(html, SiteRegx.author_regx);
                book.directory = _getBookDirectory(html, SiteRegx.directorystart_regx, SiteRegx.directoryend_regx, SiteRegx.directoryitem_regx);
                return true;
            }

            function _getBookMetaData(html, regx) {
                const ret = regx.exec(html);
                if (ret.length >1 )
                    return ret[1];
                else
                    return null;
            }

            function _getBookDirectory(html, DirStart_regx, DirEnd_regx, DirItem_regx) {
                const Start = DirStart_regx.exec(html);
                if (Start == null)
                    return null;

                const StartPos = Start.index + Start[0].length + 1;
                const End = DirEnd_regx.exec(html);
                const EndPos = End !== null ? End.index : html.length;
                const dirstring = html.substr(StartPos, End.index - StartPos - 1);
                const dirs = [];
                var dirItem = {};
                while ((dirItem = DirItem_regx.exec(dirstring)) != null) {
                    dirs.push({
                        page: dirItem[1],
                        title: dirItem[2]
                    });
                }
                return dirs;
            }

            const htmlstr = htmlData;
            const book = new BookInfo();

            if (!_parsebook(htmlstr, book))
                throw {
                    errorcode: 'parse book error',
                    errormessage: 'fail to parse html code \n \n' + htmlstr + '\n\n' + book
                };

            return book;

        }
    }
}

class SiteRegx {
    constructor(siteregx) {
        this.site = siteregx.site;
        this.domain = siteregx.domain;
        this.title_regx = new RegExp(siteregx.booktitle, "");
        this.description_regx = new RegExp(siteregx.bookdescription, "");
        this.image_regx = new RegExp(siteregx.bookimage, "");
        this.author_regx = new RegExp(siteregx.bookauthor, "");
        this.directorystart_regx = new RegExp(siteregx.bookdirctstart, "");
        this.directoryend_regx = new RegExp(siteregx.bookdirctend, "");
        this.directoryitem_regx = new RegExp(siteregx.bookdirctitem, "g");
    }
}

class BookInfo {
    constructor() {
        this.title = '';
        this.author = '';
        this.description = '';
        this.image = '';
        this.directory = [];
    }
}

module.exports = {
    HtmlParser,
    SiteRegx,
    BookInfo
};