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
- Create a `UserRouter.js` file in `routers` directory


### 1 Basic usage

After placing your middlewares in your application, import and configure magnet-routers:

```javascript
//import
const initRouters = require('@keops-society/magnet-routers');

//express init
const app = express();

//where is your routers files
const DIR_ROUTERS = path.join(__dirname, 'routers');

//adds all routers to app
initRouters(app, DIR_ROUTERS);
```

Your `UserRouter.js` should look like this:

```javascript
//import
const router = require('express').Router();

//default action
router.get('/', async(req, res, next) => {
    res.redirect("list");
});

//list users
router.get('/list', async(req, res) => {
    let userList = await User.findAll();
    res.render("user/list", { userList });
});

//show user
router.get('/show/:id', async(req, res) => {
    let user = await User.findByPk(req.params.id);
    res.render("user/show", { user });
});

//more methods
//...

//export router
module.exports = router;
```

You access this methods by calling the next urls in the browser:

- `/user/`
- `/user/list`
- `/user/show/1`
- `/user/...`

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
app.use(errorHandler); //model = { error, message, statusCode }
```

> **:warning: Error handlers:**
>
> Error and not found handlers should be placed after all routers and middlewares

> **:information_source: Error views:**
>
> You need to create a `notFound` and `error` views under `views` folder. See [views section](https://github.com/KeopsSociety/MagnetRouters#21-views) for more information and examples.

### 2.1 Views

This is an example hierarchy for organizing your views:

    .                           # Root directory of your app
    ├── ...
    ├── views/                  # Views directory
    │   ├── user/               # UserRouter views directory
    │   │   ├── list.hbs        # Users list view
    │   │   └── show.hbs        # Show user view
    │   ├── ...                 # Your home page and other views
    │   ├── error.hbs           # Errors page
    │   └── notFound.hbs        # Not found page
    └── ...

Here is an example of error and notFound views:
- error.hbs:

```html
<div>
    <h1>Error {{ statusCode }}</h1>
    {{#if error }}
<!--    This is only visible if `config.environment` is set to "developemnt" mode! -->
        <h2>{{ message }}</h2>
        <div>{{ error.stack }}</div>
    {{else}}
        <h2>There is an unexpected error</h2>
    {{/if}}
</div>
```
- notFound.hbs:

```html
<div>
    <h1>Not found 404</h1>

    <p>Requested path: <label>{{ url }}</label></p>
</div>
```

---