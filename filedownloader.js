class FileDownloader {
    constructor(){
        this.asycDownload = function (url, filepath, successcallback, failurecallback){
            var httpclient = require('urllib');
            httpclient.request(url, function(err, data, res){
                if(err){
                    console.log('error during download %s \n %s', url, err);
                    failurecallback(res, err);
                };
                
                var fs = require('fs');
                try{ 
                    fs.writeFileSync(filepath, data.toString());
                }catch (err){
                    console.log ('error during writing file %s \n %s', filepath, err);
                    failurecallback(res, err);
                }
                successcallback('success');
            });
        }
        
        this.PromiseDownload = function (url, filepath){
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
    }
    
}

module.exports = FileDownloader;