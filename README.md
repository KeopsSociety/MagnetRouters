# MagnetRouters

MagnetRouters is a Node module that make [Express](https://github.com/expressjs/express) routers more easy to organize and provide some utilities like error or not found pages handlers.

---

## Installation

```bash
# install locally (recommended)
npm install @keops-society/magnet-routers --save
```

---

## Usage

- Create a `routers` directory in your project
- Create a `ExampleRouter.js` file in routers directory


### 1 Basic usage

After placing your middlewares in your application, import and configure magnet-routers:

```javascript
//import
const initRouters = require('@keops-society/magnet-routers');

//where is your routers files
const DIR_ROUTERS = path.join(__dirname, 'routers');

//express init
const app = express();

//adds all routers to app
initRouters(app, DIR_ROUTERS);
```

### 2 Advanced usage

After initialize routers, you can add a not found and error handlers like this:

```javascript
//import
const { notFoundHandler, errorHandler } = require('@keops-society/magnet-routers');

//adds all routers to app
initRouters(app, DIR_ROUTERS);

// catch 404 and forward to error handler
app.use(notFoundHandler); //model = { url }

// error handler
app.use(errorHandler); //model = { error, message }
```

> **:information_source: Error views:**
>
> You need to create a notFound and error views under views folder

> **:warning: Error handlers:**
>
> Error and not found handlers should be placed after all routers

---