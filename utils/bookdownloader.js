const fdownloader = require('./filedownloader');
fd = new fdownloader();

class BookDownloader {
    constructor() {
        this.createDownloadJob = function (bookinfo, localpath) {
            this.bookjob = new BookDownloadJob(bookinfo, localpath);
        };

        //this.fdownloader = new(require('../utils/filedownloader'))();

        this.PromiseDownloadBook = function () {
            const downloadtasks = [];
            this.bookjob.downloadjob.downloaditems.forEach(item => {
                downloadtasks.push({
                    url: item.downloadurl,
                    filepath: item.localpath
                })
            });

            return new Promise(function (resolve, reject){


                fd.PromiseMultiDownloads( downloadtasks, 10)
                    .then(function onfulfilled(result){
                        this.bookjob.status = 'success';
                        resulve(result);
                    }, function onrejected(result){
                        this.bookjob.status = 'error';
                        reject(result);
                    })
            })

        }

    }
}

class BookDownloadJob {
    constructor(bookinfo, localpath) {
        this.bookinfo = bookinfo;
        this.status = '';
        this.localpath = localpath;
        if (this.localpath[this.localpath.length - 1] != '/')
            this.localpath += '/';
        this.downloadjob = {
            downloaditems: [],
            status: 'pending'
        };

        bookinfo.downloaddir.forEach(item => {
            this.downloadjob.downloaditems.push({
                title: item.title,
                page: item.page,
                downloadurl: item.downloadurl,
                localpath: this.localpath + item.page,
                status: 'pending'
            })
        })

    }
}
module.exports = {
    BookDownloader,
    //SiteRegx,
    BookDownloadJob
};