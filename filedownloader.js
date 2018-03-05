import { isNullOrUndefined } from 'util';

class FileDownloader {
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
            function downloadPromise(url) {
                return new Promise(function (resolve, reject) {
                    var httpclient = require('urllib');
                    httpclient.request(url, function (err, data, res) {
                        if (err) {
                            console.log('error during download %s \n %s', url, err);
                            reject(err);
                        }
                        var ret = {
                            res: '',
                            data: ''
                        }
                        ret.res = res;
                        ret.data = data;
                        console.log('syncdownload success');
                        resolve(ret);
                    })
                })
            };

            return downloadPromise(url).then(function onfulfilled(value) {
                var fs = require('fs');
                try {
                    fs.writeFileSync(filepath, value.data.toString());
                    console.log('write success');
                } catch (err) {
                    console.error('error during writing file %s \n %s', filepath, err);
                    throw err;
                }
            }).catch(function onrejected(err) {
                console.error(err);
            })
        }

        //PromiseMultiDownloads perform download remote resource simultainously.
        //Args:
        //  downloadtasks: array of download task. Each download task item is combination of url, filepath, finishstate, err
        //return:
        //  promise object so that caller can handle through then/reject
        this.PromiseMultiDownloads = function (downloadtasks) {

            function download(task) {
                return function (downloaddone) {
                    return _download(task, downloaddone);
                }
            }

            function _download(task, downloadone) {
                PromiseSingleDownload(task.url, task.filepath)
                    .then(function onfulfilled(ret) {
                        task.finishstate = true;
                        downloaddone(task);
                    }).catch(function onrejected(err) {
                        task.finishstate = false;
                        task.err = err;
                        downloaddone(err, task);
                    })
            }

            return new Promise(function (resolve, reject) {

                var downloadfunctions = [];
                //firstly, generate download functions array
                for (var item in tasks)
                    downloadfunctions.push(download(item));

                //using async module to
                //  1. perform all download task from downloadtasks array
                //  2. after all the downloads are finished, continue the work through then with 
                var async = require('async');
                async.parallelLimit(downloadfunctions, 5, function (err, results) {
                    if (isNullOrUndefined(err))
                        resolve(results);
                    else
                        reject(err, results);
                })
            });
        }
    }

}

module.exports = FileDownloader;