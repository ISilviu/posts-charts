# posts-charts app

## Installation 
The application has been bootstrapped with CRA. 
Before running, please ensure the `.env` file is created, one can copy it from the `.env.example`: `cp .env.example .env`.
Running `npm run start` will start the development server on port 3000.

## Process
I split the bigger picture in smaller sub-problems:
1. Bootstrap the application.
2. Understand how to use the GraphQL api by using the playground.
3. Integrate Apollo client in the project and implement data fetching.
4. Explore the VSIX library, implement a dummy histogram, and then adapt the fetched data to be able to use it within the chart.
5. Add tests for the main functionalities of the application.

## Choices

- Even though I consider CRA to be less flexible for a production environment, it suited my needs just fine for this project. 
It allowed me to scaffold the application in seconds.
- I have added tests and environment files support since they are necessary for any production-level application.
- I have split structured the project according to the bussiness logic each file/component achieves.

## Challenges
- The VSIX's docs seem to be a bit out of date, they are not that organised.