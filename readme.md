# Network Operations Center
This repository was built on using Clean Architecture Pattern to monitor services health, it saves the log entries into 3 different data sources, it is also able to send emails with or without attachmnents

## Technologies Used
This project leverages the following technologies:
- **Node.js** & **TypeScript** for the main application logic
- **Prisma ORM** for PostgreSQL integration
- **Mongoose** for MongoDB integration
- **Nodemailer** for email delivery
- **Jest** for unit and integration testing
- **Docker** for containerized development and testing environments
- **dotenv** and **env-var** for environment variable management
- **cron** for scheduled tasks

## Code Design Patterns
The codebase is structured using:
- **Clean Architecture**: Separation of concerns between domain, infrastructure, and presentation layers
- **Repository Pattern**: Abstracts data access for logs, supporting multiple data sources
- **Dependency Injection**: Services and repositories are injected into use cases for flexibility and testability
- **Use Case Pattern**: Business logic is encapsulated in use case classes (e.g., service health checks, email sending)
- **Factory Pattern**: Used for creating log entities from JSON or objects
- **Strategy Pattern**: Multiple log repositories can be used in parallel for different data sources

## Available Data Sources
You can save file into 1 to 3 of the following data sources:
* File System (fs)
* MongoDB (mongoose)
* PostgreSQL (prisma)

## Dev instructions
1. Clone file env.template to .env
2. Configure environment variables listed at env.template
3. Install dependencies by running ```npm install```
4. Run the docker containers with ```docker compose up -d```
5. Execute DB migrations using ```npx prisma migrate dev```
6. Run the app in dev mode by running ```npm run dev```

## Test
To run the test suite you must have the Docker Daemon Service running and execute ```npm run test```
