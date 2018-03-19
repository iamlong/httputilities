
class FileDownloader {
    _PromiseSingleDownload(url, filepath) {
        function downloadPromise(url) {
            return new Promise(function (resolve, reject) {
                var ret = {
                    success: true,
                    err: null,
                    res: null,
                    data: null
                }
                var httpclient = require('urllib');
                httpclient.request(url, function (err, data, res) {
                    ret.res = res;
                    ret.data = data;
                    if (err) {
                        ret.success = false;
                        ret.err = err;
                        reject(ret);
                        return;
                    }
                    resolve(ret);
                })
            })
        };

        var result = {
            success: true,
            err: null,
        };

        return new Promise(function (resolve, reject) {
            downloadPromise(url).then(function onfulfilled(value) {
                var fs = require('fs');
                try {
                    fs.writeFileSync(filepath, value.data.toString());
                    result.success = true;
                    result.err = null;
                    resolve(result);
                } catch (err) { //catch error during file writing
                    result.success = false;
                    result.err = err;
                    reject(result);
                }
            }, function onrejected(result){
                result.success = false;
                result.err = err;
                result.data = null;
                reject(result);
            }).catch(function onrejected(err) { //catch error during url download
                result.success = false;
                result.err = err;
                result.data = null;
                reject(result);
            })
        });
    }

    constructor() {
        this.AsycSingleDownload = function (url, filepath, successcallback, failurecallback) {
            var httpclient = require('urllib');
            httpclient.request(url, function (err, data, res) {
                if (err) {
                    console.log('error during download %s \n %s', url, err);
                    failurecallback(err, res);
                };

                var fs = require('fs');
                try {
                    fs.writeFileSync(filepath, data.toString());
                } catch (err) {
                    console.log('error during writing file %s \n %s', filepath, err);
                    failurecallback(err, res);
                }
                successcallback('success');
            });
        }

        this.PromiseSingleDownload = function (url, filepath) {
            return this._PromiseSingleDownload(url, filepath);
        }

        //PromiseMultiDownloads perform download remote resource simultainously.
        //Args:
        //  downloadtasks: array of download task. Each download task item is combination of url, filepath, finishstate, err
        //return:
        //  promise object so that caller can handle through then/reject
        this.PromiseMultiDownloads = function (downloadtasks, parallelsize) {

            function download(task, _PromiseSingleDownload) {
                return function (downloaddone) {
                    return _download(task, _PromiseSingleDownload, downloaddone);
                }
            }

            function _download(task, _PromiseSingleDownload, downloaddone) {
                return _PromiseSingleDownload(task.url, task.filepath)
                    .then(function onfulfilled(ret) {
                        task.finishstate = true;
                        downloaddone(null, task);
                    }, function onrejected(err) {
                        task.finishstate = false;
                        task.err = err;
                        downloaddone(err, task);
                    });
            }

            var downloadfunctions = [];
            //firstly, generate download functions array
            for (var item in downloadtasks)
                downloadfunctions.push(download(downloadtasks[item], this._PromiseSingleDownload));

            return new Promise(function (resolve, reject) {
                var ret = {
                    success: true,
                    results: null,
                    err: null
                };
                //using async module to
                //  1. perform all download task from downloadtasks array
                //  2. after all the downloads are finished, continue the work through then with 
                var async = require('async');
                async.parallelLimit(downloadfunctions, parallelsize, function (err, results) {
                    ret.results = results;
                    if (err == null) 
                        resolve(ret);
                    else {
                        ret.success = false;
                        ret.err = err;
                        reject(ret);
                    }
                })
            });
        }
    }

}

module.exports = FileDownloader;