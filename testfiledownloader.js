const filedownloader = require ('./filedownloader');

fdownload = new filedownloader();

function downloadsuccess(value){
    console.log(value);
}
function downloadfailure(res, error){
    console.error('error here');
    console.error(error);
}
fdownload.asycDownload('http://www.baidu.com', './a.html', downloadsuccess, downloadfailure);

fdownload.PromiseDownload('http://www.baidu.com', './a.html').then(function onfullfill(){console.log('PromiseDownload Finish')});
