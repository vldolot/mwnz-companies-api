# MWNZ Companies API

## About

This is a simple API for retrieving company information. It is built with Elysia.js and Bun.

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/vldolot/mwnz-companies-api.git
   ```
2. Install the dependencies:
   ```sh
   bun install
   ```

## Usage

### Running the development server

```sh
bun run dev
```

The server will be running at `http://localhost:3000`.

The Swagger docs will be available at `http://localhost:3000/swagger`.

### Running tests

```sh
bun test
```

### Building and Starting the Application

To build the application:

```sh
bun run build
```

To start the built application:

```sh
bun run start
```

## Initial Simple Version

The first version of this API is a basic app in one file: can be found in `simple-version/index.ts`.
It shows how the main features work without using complex structure, error handling, or extra features.
This version is a good starting point to understand how the core API works.

## API Documentation

The API is documented using OpenAPI and Swagger. When the development server is running, you can access the Swagger UI at `http://localhost:3000/swagger`.
