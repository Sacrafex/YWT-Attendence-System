BUILD_FLAGS ?= --publish never

.PHONY: help install run build clean

install:
	@echo "Installing dependencies with npm..."
	@npm install

run: install
	@echo "Starting Electron app..."
	@npm run start || npm electron .

build: install
	@echo "Building Application..."
	@npm run dist $(BUILD_FLAGS)

clean:
	@echo "Cleaning artifacts..."
	@rm -rf dist node_modules