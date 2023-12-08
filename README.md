# loggerz
## loggerz-server
Generic loggging server implementation for mongodb.
### Setup
1 - Provide an endpoint function implementation in the modules directory. The endpoints and functions called by each of them can be found in the [API Reference docs](https://github.com/mleitao27/loggerz/wiki/API-Reference). You may use the middleware and services directories to hold any other sw that you find convenient.

2 - Provide an .env file with the necessary variables for the server to function properly (more info can be found in the [Env File docs](https://github.com/mleitao27/loggerz/wiki/Env-File)).
