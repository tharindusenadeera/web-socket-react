// import PriceConstants from '../../price/price-constants';
import TinyQueue from 'tinyqueue';
import utils from '../../util/utils/utils';

export default (function () {
    // TODO Jayanes manually changed isWebReqAllowed to true
    let isWebReqAllowed = true;
    let pendingRequestQueue = new TinyQueue();

    let sendAjaxRequest = function (param) {

        if (isWebReqAllowed) {
            sendRequest(param);
        } else {
            pendingRequestQueue.enqueue(param);
        }
    };

    let sendAjaxFileRequest = function (params) {
        try {
            let xhr = new window.XMLHttpRequest();

            xhr.open(params.requestMethod, params.url, true);
            xhr.responseType = 'blob';
            xhr.addEventListener('load', function () {
                if (xhr.status === 200) {
                    let blob = xhr.response;

                    if (blob.size === 0) {
                        if (params.onSuccess instanceof Function) {
                            params.onSuccess({sts: 0});
                        }
                    } else {
                        if (navigator.appVersion.toString().indexOf('.NET') > 0) { // Detect IE 10+
                            window.navigator.msSaveBlob(blob, params.fileName);
                        } else {
                            let link = document.createElement('a');
                            let blobUrl = window.URL.createObjectURL(new Blob([blob], {type: blob.type}));

                            link.setAttribute('style', 'display: none;');
                            link.setAttribute('href', blobUrl);

                            document.body.appendChild(link);
                            link.download = params.fileName;

                            link.click();
                            window.URL.revokeObjectURL(params.url);
                            link.remove();
                        }

                        if (params.onSuccess instanceof Function) {
                            params.onSuccess({sts: 1});
                        }
                    }
                } else if (xhr.status >= 300) {
                    if (params.onSuccess instanceof Function) {
                        params.onSuccess({sts: -1});
                    }
                } else {
                    if (params.onError instanceof Function) {
                        params.onError();
                    }
                }
            });

            xhr.send();
        } catch (e) {
            utils.logger.logError('Error in send ajax request : ' + params.url);

            if (params.onError instanceof Function) {
                params.onError();
            }
        }
    };

    let setRequestPermission = function (status) {
        isWebReqAllowed = status;
    };

    let sendPendingRequest = function () {
        while (pendingRequestQueue.getLength() > 0) {
            sendRequest(pendingRequestQueue.dequeue());
        }
    };

    let sendRequest = function (param) {
        try {

            let  type = param.type ? param.type : 'GET';
            let dataType = param.dataType !== undefined ? param.dataType : 'json';
            let contentType = param.contentType !== undefined ? param.contentType : 'application/json; charset=utf-8';
            let url = param.url;
            let headers = param.headers !== undefined ? param.headers : {'X-App-Token': new Date().getTime()};
            // let timeout = param.timeout ? param.timeout : PriceConstants.TimeIntervals.AjaxRequestTimeout;
            let timeout = '';
            let xhr = new XMLHttpRequest();
            xhr.open(type, url, true);
            xhr.setRequestHeader("Content-Type", contentType);
            xhr.setRequestHeader("Accept", dataType);
            xhr.setRequestHeader('X-App-Token',headers);
            xhr.setRequestHeader("Cache-Control",param.cache);
            xhr.setRequestHeader("Process-Data",param.processData);
            xhr.timeout =timeout;

            xhr.onload = function (e) {
                if (param.onSuccess instanceof Function) {
                    param.onSuccess(JSON.parse(e.target.response));
                }
            };

            xhr.onerror = function (e) {
                if (param.onError instanceof Function) {
                    param.onError(JSON.parse(e.target.response));
                }
            };

            xhr.send();

        } catch (e) {
            utils.logger.logError('Error in send ajax request : ' + param.url);

            if (param.onError instanceof Function) {
                param.onError({});
            }
        }
    };

    return {
        sendAjaxRequest: sendAjaxRequest,
        sendPendingRequest: sendPendingRequest,
        setRequestPermission: setRequestPermission,
        sendAjaxFileRequest: sendAjaxFileRequest
    };
})();