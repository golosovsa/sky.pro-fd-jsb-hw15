/**
 * Function request({
 *     method: "GET",
 *     url: "",
 *     params: {},
 *     responseType: "json",
 *     onSuccess: empty,
 *     onError: empty,
 * })
 */

const emptyCallback = (data) => {};
const emptyParams = {};

function request({
    method = "GET",
    url = "",
    params = emptyParams,
    responseType = "json",
    onSuccess = emptyCallback,
    onError = emptyCallback,
}) {
    if (!url) onError("Empty url");

    const paramsUrl = new URLSearchParams(params); 

    const req = new XMLHttpRequest();
    req.open(method, params ? `${url}?${paramsUrl.toString()}` : url);
    req.responseType = responseType;
    req.onload = (event) => {
        if (req.status !== 200) onError(`(${req.status}) ${req.statusText}`);
        data = req.response;
        onSuccess(data);
    }
    req.onerror = (event) => {
        onError(`(${req.status}) ${req.statusText}`);
    }

    req.send();
}