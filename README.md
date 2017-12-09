# The Myao Mirror &nbsp; <a href="https://github.com/Myao-mirror/mirror-webapp/stargazers"><img src="https://img.shields.io/github/stars/Myao-mirror/mirror-webapp.svg?style=flat-square" alt="" height="20"></a> <a href="https://github.com/Myao-mirror/mirror-webapp/issues"><img src="https://img.shields.io/github/issues/Myao-mirror/mirror-webapp.svg?style=flat-square" alt="" height="20"></a> <a href="https://github.com/Myao-mirror/mirror-webapp/blob/master/LICENSE.txt"><img src="https://img.shields.io/github/license/Myao-mirror/mirror-webapp.svg?style=flat-square" alt="" height="20"></a>

> The [Myao Mirror](https://github.com/Myao-mirror/mirror-webapp) consists of a  [single-page web applications](https://en.wikipedia.org/wiki/Single-page_application)
> (SPA) that can be used with a smart mirror and boasts cross-platform compatibility and component-based UI architecture. It is built upon some of the latest frontend and backend technologies including [ASP.NET Core 2.0](https://dot.net/core), [Kestrel](https://github.com/aspnet/KestrelHttpServer),
> [Entity Framework Core 2.0](https://ef.readthedocs.io/en/latest/), [Babel](http://babeljs.io/), [Webpack](https://webpack.github.io/),
> [React](https://facebook.github.io/react), [Redux](http://redux.js.org/), [CSS Modules](https://github.com/css-modules/css-modules),
> [React Hot Loader](http://gaearon.github.io/react-hot-loader/) and more.

### Features
&nbsp; &nbsp; ✓ Component-based front-end development via [Webpack](https://webpack.github.io/), [CSS Modules](https://github.com/css-modules/css-modules) and [React](https://facebook.github.io/react) (see [`webpack.config.js`](webpack.config.js))<br>
&nbsp; &nbsp; ✓ Modern JavaScript syntax ([ES2015](http://babeljs.io/docs/learn-es2015/)+) via [Babel](http://babeljs.io/); modern CSS syntax (CSS3+) via [PostCSS](https://github.com/postcss/postcss)<br>
&nbsp; &nbsp; ✓ Application state management via [Redux](http://redux.js.org/) (see [`client/store.js`](client/store.js))<br>
&nbsp; &nbsp; ✓ Universal cross-stack routing and navigation via [`path-to-regexp`](https://github.com/pillarjs/path-to-regexp) and [`history`](https://github.com/ReactJSTraining/history) (see [`client/routes.json`](client/routes.json))<br>
&nbsp; &nbsp; ✓ [Code-splitting](https://github.com/webpack/docs/wiki/code-splitting) and async chunk loading with [Webpack](https://webpack.github.io/) and [ES6 System.import()](http://www.2ality.com/2014/09/es6-modules-final.html)<br>
&nbsp; &nbsp; ✓ Hot Module Replacement ([HMR](https://webpack.github.io/docs/hot-module-replacement.html)) /w [React Hot Loader](http://gaearon.github.io/react-hot-loader/)<br>
&nbsp; &nbsp; ✓ Lightweight build automation with plain JavaScript (see [`run.js`](run.js))<br>
&nbsp; &nbsp; ✓ Cross-device testing with [Browsersync](https://browsersync.io/)<br>

### Directory Layout

```shell
.
├── /build/                               # The folder for compiled output
├── /client/                              # Client-side app (frontend)
│   ├── /components/                      # Common or shared UI components
│   ├── /utils/                           # Helper classes and optional KendoUI files
│   ├── /views/                           # UI components for web pages (screens)
│   ├── history.js                        # HTML5 History API wrapper used for navigation
│   ├── main.js                           # Entry point that bootstraps the app
│   ├── router.js                         # Lightweight application router
│   ├── routes.json                       # The list of application routes
│   └── store.js                          # Application state manager (Redux)
├── /client.test/                         # Unit and integration tests for the frontend app
├── /docs/                                # Documentation to the project
├── /public/                              # Static files such as favicon.ico etc.
│   ├── robots.txt                        # Instructions for search engine crawlers
│   └── ...                               # etc.
├── /server/                              # Web server and data API (backend)
│   ├── /Controllers/                     # ASP.NET Web API and MVC controllers
│   ├── /Models/                          # Entity Framework and Identity models
│   ├── /Views/                           # Server-side rendered views
│   ├── appsettings.json                  # Server-side application settings
│   ├── DesignTimeDbContextFactory.cs     # PostgreSQL connection string settings
│   ├── Startup.cs                        # Server-side application entry point
│   └── web.config                        # Web server settings for IIS
├── /server.test/                         # Unit and integration tests for the backend app
│── package.json                          # The list of project dependencies and NPM scripts
│── run.js                                # Build automation script (similar to gulpfile.js)
└── webpack.config.js                     # Bundling and optimization settings for Webpack
└── yarn.lock                             # Yarn generated list of project dependencies
```


### Prerequisites

* Desktop computer running OS X, Windows or Linux
* [Node.js](https://nodejs.org) v6 or newer
* [.NET Core](https://www.microsoft.com/net/core) and [.NET Core SDK](https://www.microsoft.com/net/core) v2.0 or newer


### Getting Started

**Step 1**. Clone the latest version of the **Myao-mirror/mirror-webapp** on your local machine by running:

```shell
$ git clone -o mirror-webapp -b master --single-branch \
      https://github.com/Myao-mirror/mirror-webapp.git MyApp
$ cd MyApp
```

**Step 2**. Install project dependencies listed in [`project.json`](server/project.json) and
[`package.json`](package.json) files: 

```shell
$ npm install                   # Install both Node.js and .NET Core dependencies
```

**Step 3**. Finally, launch your web app:

```shell
$ node run                      # Compile and lanch the app, same as running: npm start
```

The app should become available at [http://localhost:3000/](http://localhost:3000/).
See [`run.js`](run.js) for other available commands such as `node run build`, `node run publish` etc.
You can also run your app in a release (production) mode by running `node run --release`, or without
Hot Module Replacement (HMR) by running `node run --no-hmr`.

### How to Deploy

Whenever you need to compile your
app into a distributable format for deployment, simply run: (_*currently only supports Azure AppService_)

```shell
$ node run publish              # Same as running: npm run publish
```

### How to Update

We work hard on keeping the project up-to-date and adding new features. Down the road, after
starting a new web application project based on this boilerplate, you can always fetch and merge
the latest changes from this (upstream) repo back into your project by running:

```shell
$ git checkout master
$ git fetch mirror-webapp
$ git merge mirror-webapp/master 
```

Alternatively, pull the latest version of this repository into a separate folder and compare it with
your project by using a diff tool such as [Beyond Compare](http://www.scootersoftware.com/).

### How to Contribute
Anyone and everyone is welcome to [contribute](CONTRIBUTING.md) to this project. The best way to
start is by checking our [open issues](https://github.com/Myao-mirror/mirror-webapp/issues),
[submit a new issues](https://github.com/Myao-mirror/mirror-webapp/issues/new?labels=bug) or
[feature request](https://github.com/Myao-mirror/mirror-webapp/issues/new?labels=enhancement),
participate in discussions, upvote or downvote the issues you like or dislike, or send [pull
requests](CONTRIBUTING.md#pull-requests).

### License
This source code is licensed under the MIT license found in the [LICENSE.txt](https://github.com/Myao-mirror/mirror-webapp/blob/master/LICENSE.txt)
file. The documentation to the project is licensed under the [CC BY-SA 4.0](http://creativecommons.org/licenses/by-sa/4.0/)
license.

---
Updated with ♥ by the Myao Team ([@Myao-mirror](https://github.com/Myao-mirror)) and [contributors](https://github.com/Myao-mirror/mirror-webapp/graphs/contributors)