"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    badRequest: 'BAD REQUEST!',
    notFound: (table = 'table', findDto = 'entity') => `[${table}:${findDto}] NOT FOUND`,
    sameOrder: 'A entidade especificada já está nesta ordem!'
};
//# sourceMappingURL=messages.js.map