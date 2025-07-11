# Network Operations Center
This repository was built to monitor services health, it saves the log entries into 3 different data sources, it is also able to send emails with or without attachmnents

## Available Data Sources
You can save file into 1 to 3 of the following data sources:
* File System (fs)
* MongoDB (mongoose)
* PostgreSQL

# Dev instructions
1. Clone file env.template to .env
2. Configure environment variables listed at env.template
3. Install dependencies by running ```npm install```
4. Run the docker containers with ```docker compose up -d```
5. Run the app in dev mode by running ```npm run dev```
