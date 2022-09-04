//resources: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/401
// https://www.tabnine.com/code/javascript/functions/express/Response/status

//If the current middleware function does not end the request-response cycle,
//I  called next() to pass control to the next middleware function. Otherwise, the request will be left hanging.

import express from 'express';

const handelError = (error: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    return res.status(401).json({
        message: error.message,
    });
};
//then export errorHandler to use in app in server.ts
export default handelError;
