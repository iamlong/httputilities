class FileDownloader {
    constructor(){
        this.AsycSingleDownload = function (url, filepath, successcallback, failurecallback){
            var httpclient = require('urllib');
            httpclient.request(url, function(err, data, res){
                if(err){
                    console.log('error during download %s \n %s', url, err);
                    failurecallback(err, res);
                };
                
                var fs = require('fs');
                try{ 
                    fs.writeFileSync(filepath, data.toString());
                }catch (err){
                    console.log ('error during writing file %s \n %s', filepath, err);
                    failurecallback(err, res);
                }
                successcallback('success');
            });
        }
        
        this.PromiseSingleDownload = function (url, filepath){
            function downloadPromise (url){
                return new Promise(function(resolve, reject){
                    var httpclient = require('urllib');
                    httpclient.request(url, function(err, data, res){
                        if(err) {
                            console.log('error during download %s \n %s', url, err);
                            reject(err);
                        }
                        var ret = {
                            res : '',
                            data : ''
                        }
                        ret.res = res;
                        ret.data = data;
                        console.log('syncdownload success');
                        resolve(ret);
                    })
                })
            };

            return downloadPromise(url).then(function onfulfilled(value){
                var fs = require('fs');
                try{
                    fs.writeFileSync(filepath,value.data.toString());
                    console.log('write success');
                }catch(err){
                    console.error('error during writing file %s \n %s', filepath, err);
                    throw err;
                }
            }).catch(function onrejected(err){
                console.error(err);
            })
        }

        this.PromiseMultiDownloads = function (downloadtasks){
           
            //using async module to
            //  1. perform all download task from downloadtasks array
            //  2. after all the downloads are finished, 
        }
    }
    
}

module.exports = FileDownloader;