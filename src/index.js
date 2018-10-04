const Hapi = require('hapi');

//bots
let greeter = require('./greeter');

const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: process.env.HOST || "localhost"
});

const init = async() => {
    await server.start();
    await server.register(require('inert'));
    /*
    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: 'views'
            }
        }
    })*/

    greeter.spawn({
        token: process.env.token
    }).startRTM((err, bot, payload) => {
        if(err) {
            throw new Error(err)
        }
        console.log('Connected to Slack RTM!')
    });

    console.log(`Bot running at: ${server.info.uri}`);

    process.on('unhandledRejection', (err) => {
        console.log(err);
        process.exit(1);
    })
}

init();