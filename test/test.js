const filedownloader = require('../utils/filedownloader');


var assert = require('assert');

fd = new filedownloader();

describe('Test FileDownloader', function () {
    this.timeout(10000);
    describe('Test Single Download', function (done) {
        it('Single Download Promise Pass', function (done) {
            fd.PromiseSingleDownload('https://www.baidu.com', './a.html').then(
                function onfullfill(result) {
                    assert.equal(result.success, true);
                },
                function onReject(result) {
                    assert.equal(result.success, false);
                }
            ).catch(
                (result) => {
                    assert.equal(result.success, false);
                }
            ).then(done, done);
        });
        it('Single Download Promise with bad url', function (done) {
            fd.PromiseSingleDownload('https://wwwwe.baidu.com', './a.html')
                .then(
                    function onfullfill(result) {
                        assert.equal(result.success, true);
                    },
                    function onReject(result) {
                        assert.equal(result.success, false);
                    }
                )
                .catch(
                    (result) => {
                        assert.equal(result.success, false);
                    }
                ).then(done, done);
        });
    });
    describe('Multi Download Promise Test', function (done){
        
    })
})
/* fdownload = new filedownloader();

function downloadsuccess(value) {
    console.log(value);
}

function downloadfailure(res, error) {
    console.error('error here');
    console.error(error);
}
//fdownload.AsycSingleDownload('http://www.baidu.com', './a.html', downloadsuccess, downloadfailure);

var promise = fdownload.PromiseSingleDownload('https://www.baidu.com/', './a.html')
promise.then(
    function onfullfill() {
        console.log('PromiseDownload Finish')
    }
).catch((err) => {
    console.log(err);
});
var downloadtasks = [];
downloadtasks.push({
    url: 'https://www.baidu.com',
    filepath: './1.html'
});

downloadtasks.push({
    url: 'http://news.sina.com.cn',
    filepath: './2.html'
});

fdownload.PromiseMultiDownloads(downloadtasks, 1).then(
    function onfullfill(result) {
        console.log('PromiseMultiDownload Finish')
    }).catch(
    (err) => {
        console.error(err.err)
    });

downloadtasks.push({
    url: 'https://wwwwedew.baidu.com',
    filepath: './3.html'
});

downloadtasks.push({
    url: 'http://newsdewd.sina.com.cn',
    filepath: './4.html'
});

fdownload.PromiseMultiDownloads(downloadtasks, 1).then(
    function onfullfill(result) {
        console.log('PromiseMultiDownload Finish')
    }).catch(
    (err) => {
        console.error(err.err)
    }); */