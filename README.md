# Marketplace UI

The Marketplace UI is web-based frontend for Marketplace Server, and requires an instance of the server to be launched.

## Developer Quick Start

This is an [AngularJS 2](https://angular.io) project using `grunt` as the build system, [pug](https://pugjs.org/api/getting-started.html) for HTML templates, [SASS](http://sass-lang.com) for CSS and [Bootstrap](http://getbootstrap.com/) for layout. `npm` is the package manager. Assuming you already have node installed via `brew install node` or similar:

	npm install -g grunt typings
	npm install # to install project development dependencies
	typings install # to install TypeScript declarations

To run in development mode, just:

	grunt # to serve the project and automatically recompile on file changes

Visit [http://localhost:9000](http://localhost:9000) and do your thang. :)

## Building for Production

First, build:

	grunt build # to build your local copy with any local changes

Then, assuming you've already familiar with [Docker](https://www.docker.com) awesomeness and have it installed, plop the build into a wicked-fast [nginx](http://nginx.org) web server container using the including Dockerfile with:

	docker build -t p3000/hsp-marketplace-ui:latest . # though you probably want your own repo and tag strings :)

## Production Deployment

Extremely easy in your existing Dockerized hosting environment by pointing it at your Marketplace Server installation. Just:

	docker run -d -p 9000:80 --restart unless-stopped -e "MARKETPLACE_SERVER_URL=http://localhost:3000" p3000/hsp-marketplace-ui:latest # or any official tag

And you're done. No environment variables or further configuration are needed. Jedi's may use your existing Kubernetes, Open Shift etc installations as you see fit. :)


# License

[Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0)
