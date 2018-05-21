//generate ebook from bookinfo
jssha = require('jssha');
const sha = new jsSHA("SHA-256", "TEXT");

class ebookgen {
    constructor(bookinfo) {
        this.bookinfo = bookinfo;
        this.opf = {
            identifier: "",
            metadata: {
                title: "",
                creator: "",
                subject: [],
                description: "",
                publisher: "",
                contributor: [],
                date: "",
                type: "",
                format: "",
                identifier: "",
                source :"",
                language: "",
                relation:"",
                coverage:"",
                right:""
            },
            manifest: {},
        };

        function genBookid(){
            sha.update("eBookGen"+this.bookinfo.title)
            return (sha.getHash(HEX));
        }
        this.genEBook = function(bookinfo){

        }
    }
}