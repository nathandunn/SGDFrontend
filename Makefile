BOOTSTRAP = bootstrap.py
BUILDOUT_DEPLOY = buildout_deploy.cfg
SERVER_PYTHON = /data/tools/python/current/bin/python

deploy-assets:
	. dev_deploy_variables.sh && grunt deployAssets

dev-deploy:
	. dev_deploy_variables.sh && cap dev deploy

qa-deploy:
	. dev_deploy_variables.sh && cap qa deploy

beta-deploy:
	. dev_deploy_variables.sh && cap beta deploy

staging-deploy:
	. prod_deploy_variables.sh && cap staging deploy

# to deploy to both production instances at once, remember Uncle Ben ...
#prod-deploy:
#	. prod_deploy_variables.sh && cap prod deploy

prod1-deploy:
	. prod_deploy_variables.sh && cap prod1 deploy

prod2-deploy:
	. prod_deploy_variables.sh && cap prod2 deploy

build: bootstrap dependencies grunt
	./bin/buildout

build-deploy: bootstrap-deploy
	./bin/buildout -c $(BUILDOUT_DEPLOY)

bootstrap:
	python $(BOOTSTRAP)

bootstrap-deploy:
	$(SERVER_PYTHON) $(BOOTSTRAP)

grunt:
	grunt

dependencies:
	npm install
	npm install -g grunt-cli
	bundle install

run:
	bin/pserve sgdfrontend_development.ini

tests:
	nosetests test/

ghost-local:
	. dev_deploy_variables.sh && bin/py lib/ghost/run_local_ghost.py && open $$GHOST_SUITE_BROWSER_URL

ghost-silent:
	. dev_deploy_variables.sh && bin/py lib/ghost/run_remote_ghost.py && open $$GHOST_SUITE_BROWSER_URL

# add START_URL env variable to point at non-production environment
ghost-with-alert:
	. prod_deploy_variables.sh && bin/py lib/ghost/run_remote_ghost.py && open $$GHOST_SUITE_BROWSER_URL
