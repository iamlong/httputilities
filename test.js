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

var task = {
    url:'http://www.baidu.com',
    filepath:'./1.html'
}
var downloadtasks = [];
downloadtasks.push(task);
task.url='http://news.sina.com.cn';
task.filepath='./2.html';
downloadtasks.push(task);

fdownload.PromiseMultiDownloads(downloadtasks).then(function onfullfill(){console.log('PromiseMultiDownload Finish')});