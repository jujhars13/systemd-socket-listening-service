/**
 * Plain service, no external deps
 * Nodejs > 18
 */
const { environment = "development" } = process.env;

console.log(`${new Date()} accessed [${environment}]`);
