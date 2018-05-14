//const fdownloader = require('./filedownloader');
//fd = new fdownloader();

class BookDownloader {
    constructor() {
        this.createDownloadJob = function (bookinfo, localpath) {
            this.bookjob = new BookDownloadJob(bookinfo, localpath);
        };

        this.fdownloader = new(require('../utils/filedownloader'))();

        this.PromiseDownloadBook = function () {
            const downloadtasks = [];
            const downloadjob = this.bookjob;
            const fd = this.fdownloader;

            this.bookjob.bookinfo.directory.forEach(item => {
                downloadtasks.push({
                    url: item.downloadurl,
                    filepath: item.localpath,
                    index: item.index
                })
            });

            return new Promise(function (resolve, reject) {

                fd.PromiseMultiDownloads(downloadtasks, 20)
                    .then(function onfulfilled(result) {
                        downloadtasks.forEach(item => {
                            downloadjob.bookinfo.directory[item.index].status = item.finishstate;
                        })
                        downloadjob.status = 'success';
                        resolve(result);
                    }, function onrejected(result) {
                        downloadjob.status = 'error';
                        reject(result);
                    }).catch(function (error) {
                        reject(error);
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

        bookinfo.directory.forEach(item => {

           item.localpath = this.localpath + item.page;
           item.status = 'pending';
        })

    }
}
module.exports = {
    BookDownloader,
    //SiteRegx,
    BookDownloadJob
};