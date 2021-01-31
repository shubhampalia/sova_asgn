//programme to print json object on server
'use strict'; //enables strict mode
var a = 5;
const Hapi = require('@hapi/hapi'); //includes the module

const xlsx = require('xlsx')
var wb = xlsx.readFile('Book1.xlsx');
var ws = wb.Sheets["Sheet1"]; //user will tell the sheet, put in handler
var data = xlsx.utils.sheet_to_json(ws);
//console.log(wb.SheetNames);
//console.log(data);

const init = async () => {

    const server = Hapi.server({
        port: 3001,
        host: 'localhost'
    });
//Hapi uses a concept called routing to map the 
//incoming url to a processing function.
    server.route({
        method: 'GET',
        //path: '/{filename}',
        path: '/',
        handler: (request, h) => {
            //console.log(request.params.filename);
            //return 'Hello World! Is this thing even working? ';
            return data ;
            //return 'hello world';
        }
    });

    await server.start(); //always inside async block, operator used to 
    //wait for a promise to resolve or reject.
    console.log('Server running on %s', server.info.uri); //prints in console
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();