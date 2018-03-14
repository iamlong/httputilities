const filedownloader = require ('./filedownloader');

fdownload = new filedownloader();

function downloadsuccess(value){
    console.log(value);
}
function downloadfailure(res, error){
    console.error('error here');
    console.error(error);
}
//fdownload.AsycSingleDownload('http://www.baidu.com', './a.html', downloadsuccess, downloadfailure);

//fdownload.PromiseSingleDownload('http://www.baidu.com', './a.html').then(function onfullfill(){console.log('PromiseDownload Finish')});
var downloadtasks = [];
downloadtasks.push({
    url:'http://www.baidu.com',
    filepath:'./1.html'
});

downloadtasks.push({
    url:'http://news.sina.com.cn',
    filepath:'./2.html'
});

fdownload.PromiseMultiDownloads(downloadtasks).then(function onfullfill(){console.log('PromiseMultiDownload Finish')});