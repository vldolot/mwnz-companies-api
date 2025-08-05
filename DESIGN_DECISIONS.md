# Design Decisions

This document explains the main technology choices and design structure.

## Core Technology Stack

- **Bun**
  - Used as the JavaScript runtime, bundler, and package manager
  - Fast and all-in-one, making development simpler and quicker

- **Elysia.js**
  - Web framework built for Bun
  - Fast, easy to use, and supports TypeScript
  - Comes with built-in features like Swagger docs for APIs and testing

- **TypeScript**
  - Adds static typing to catch errors early
  - Improves code quality and helps developers write better code

- **fast-xml-parser**
  - Parses XML data from an external API
  - Converts XML into JSON quickly and reliably

## Architecture (Folder Structure)

The application follows a standard layered architecture to separate concerns and improve maintainability:

- **Routes** (`src/routes`)
  - Define API paths and connect them to controllers
  - Handles input validation and response formatting

- **Controllers** (`src/controllers`)
  - Contain the business logic
  - Receive requests, call services, and return results

- **Services** (`src/services`)
  - Handle core logic and talk to external APIs (or databases)
  - Keep logic reusable and organized

- **Middleware** (`src/middleware`)
  - Handle common concerns e.g. error handling and logging
  - Runs between request and response

## Key Design Choices

- **Swagger Integration**

  Auto-generates API docs using `@elysiajs/swagger`, always up-to-date and easy to test.

- **Error Handling**
  
  Centralized in `error-handler.ts`, ensures consistent error responses.

- **Environment Config**

  Stored in src/config/env.ts, simple switching between dev, test, and prod.

- **AWS Lambda Ready**
  
  Supports `elysia-lambda`, enables serverless, scalable, low-cost deployment.
