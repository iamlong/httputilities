const filedownloader = require('./filedownloader');

fdownload = new filedownloader();

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
    });