//generate ebook from bookinfo
//opf reference: http://www.idpf.org/epub/301/spec/epub-publications.html
jssha = require('jssha');
const sha = new jsSHA("SHA-256", "TEXT");

class opf {
    constructor() {
        this.package = {
            properties: [property]
        };
    }
};

class ebookgen {
    constructor(bookinfo) {
        this.bookinfo = bookinfo;
        this.opf = {
            package: {
                properties: [{
                    version: "1.0",
                    unique_identifier: "",
                    prefix: "",
                    xml_lang: "",
                    dir: "",
                    id: ""
                }],
                metadata: {
                    dc_identifier: [{
                        id: "",
                        identifier_value: ""
                    }],
                    dc_title: [{
                        id: "",
                        xml_lang: "",
                        dir: "",
                        title_value: ""
                    }],
                    creator: "",
                    subject: [],
                    description: "",
                    publisher: "",
                    contributor: [],
                    date: "",
                    type: "",
                    format: "",
                    identifier: "",
                    source: "",
                    language: "",
                    relation: "",
                    coverage: "",
                    right: ""
                },
                manifest: {},
                spine: {},
                bindings: {},
                collection: []
            },
        };

        function genBookid() {
            sha.update("eBookGen" + this.bookinfo.title)
            return (sha.getHash(HEX));
        }
        this.genEBook = function (bookinfo) {
            this.bookinfo = bookinfo;
            this.opf.identifier = genBookid();
            this.opf.package.metadata.title = this.bookinfo.title;
            this.opf.package.metadata.creator = this.bookinfo.author;
            this.opf.package.metadata.description = this.bookinfo.description;
            this.opf.package.metadata.language = "zh_cn";
            //this.opf.metadata.publisher = "";
            //this.opf.metadata.contributor = [];
            this.opf.package.metadata.date = Date();




        }
    }
}