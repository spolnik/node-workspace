let sendResponse = function(res, next) {
    return (obj) => {
        res.send(200, obj);
        next();
    }
};

let sendError = function(next) {
    return (err) => {
        console.log(err);
        next(err);
    }
};

export {sendResponse, sendError};