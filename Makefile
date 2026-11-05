install:
	npm ci

build:
	npm run build

typecheck:
	npm run typecheck

lint:
	npm run lint

lint-fix:
	npm run lint-fix

test:
	npm run test

test-coverage:
	npm run test-coverage

.PHONY: install build typecheck lint lint-fix test test-coverage
