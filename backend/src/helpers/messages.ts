export default {
    badRequest: 'BAD REQUEST!',
    notFound: (table: string = 'table', findDto: any = 'entity') => `[${table}:${findDto}] NOT FOUND`,
    sameOrder: 'A entidade especificada já está nesta ordem!'
}