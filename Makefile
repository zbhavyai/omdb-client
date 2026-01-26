COMMIT_SHA := $(shell git rev-parse --short HEAD)
DEPLOY_SITE := omdb-client

.PHONY: init clean format lint dev build deploy help

init:
	@ln -sf $(CURDIR)/.hooks/pre-commit.sh .git/hooks/pre-commit
	@pnpm install --frozen-lockfile

clean:
	@rm -rf dist/

distclean: clean
	@rm -rf node_modules/

format:
	@pnpm run format

lint:
	@pnpm run lint

dev:
	@pnpm run dev

build: clean
	@pnpm run build

update:
	@pnpm update --interactive --latest
	@pnpm self-update

deploy: build
	@echo "Ensuring site $(DEPLOY_SITE) exists"
	@pnpm exec netlify sites:list --json | grep -q '"name": "$(DEPLOY_SITE)"' || \
		(pnpm exec netlify sites:create --name $(DEPLOY_SITE) --account-slug zbhavyai)
	@pnpm exec netlify deploy \
		--site $(DEPLOY_SITE) \
		--auth ${NETLIFY_AUTH_TOKEN} \
		--dir dist \
		--prod \
		--no-build \
		--message "deploy by makefile at commit: $(COMMIT_SHA)"

help:
	@echo "Available targets:
	@echo "init      : install hook and dependencies"
	@echo "clean     : clean the build artifacts"
	@echo "distclean : clean build artifacts and node_modules"
	@echo "format    : format the codebase"
	@echo "lint      : lint the codebase"
	@echo "dev       : start the development server"
	@echo "build     : build the project"
	@echo "update    : update dependencies in interactive mode"
	@echo "deploy    : manual deploy to staging environment"
	@echo "help      : display this help message"
