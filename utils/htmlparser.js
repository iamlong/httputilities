import { isNullOrUndefined } from "util";

//笔趣网
//title: \b*<meta property=\"og:title\" content=\"(.*)\" \/>.
//Decription: \b*<meta property=\"og:description\" content=\"(.*)
//image: \b*<meta property=\"og:image\" content=\"(.*)\" />
//Author: \b*<meta property=\"og:novel:author\" content=\"(.*)\" />
//Directory Start: <div class=\"listmain\">.*\r\n.*<dl>\r\n.*<dt>\r\n.*\r\n.*</dt>\r\n(.*<dd>.*</dd>\r\n)*.*<dt>.*</dt>\r\n
//Directory End: </dl>.*\r\n.*</div>.*\r\n.*<script>list3\\(\\);</script>
//Directory item: <dd><a href=\"\(.*\)\">\(.*\)</a></dd> 

class HtmlParser {
    constructor (){
        this.ParseBook = function (htmlData, SiteRegx){
            function _parsebook(html, book){
                book.title = _getTitle(html);
                book.description = _getDescription(html);
                book.image = _getImage(html);
                book.author = _getAuthor(html);
                book.directory = _getDirectory(html);
                return true;
            }

            function _getTitle(html){
                SiteRegx.title_regx.test(html);
                if(RegExp.$1 !== isNullOrUndefined)
                    return RegExp.$1;
                else
                    throw {errorcode:'error parse', errormessage: 'no title found'};
            }

            var htmlstr = htmldata;
            var book = new BookInfo();
            
            success = _parsebook(html, book);

            if(!success)
                throw {
                    errorcode: 'parse book error',
                    errormessage: 'fail to parse html code \n \n' + htmlstr + '\n\n' + book
                };

        }
    }
}

class SiteRegx {
    constructor (domain, titlereg, authorreg, imagereg, directoryreg){
        this.domain = domain;
        this.title_regx =titlereg;
        this.author_regx = authorreg;
        this.image_regx = imagereg;
        this.directory_regx = directoryreg;
    }
}

class BookInfo{
    constructor (){
        this.title = '';
        this.author = '';
        this.description = '';
        this.image = '';
        this.directory = [];
    }
}

module.exports = {HtmlParser, SiteRegx};