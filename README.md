
## Basic Template

- The Backend is based on https://github.com/developit/express-es6-rest-api (as suggested)
- The Frontend was bootstrapped with create-react-app (and immediately ejected)

To host these for demo purposes, I would put the frontend on Netlify and the backend on Heroku (as it already came with a procfile and is containerized).
For a production app, however, I would use AWS services for HA and security (Heroku does let you choose which ports expose on their free plan).

Before I did this step though, I would abstract the urls to communicate between frontend and backend to a .env.development and .env.production to be read by each accordingly.

## To run locally

from the project root, you will need to start the backend and then the frontend.

From the root, install and start the backend like so:
```cd backend/```
```yarn install```
```yarn start```

again from the root, install and start the frontend like so:
```cd frontend/```
```yarn install```
```yarn start```

This should get you an api running on localhost:8080 and a frontend at localhost:3000

## Api design

The api is very basic, just a main route and a /block/ route.
I tried to stay inline with the express template provided.
I would love to talk about facets as it is a new concept for me :-)

## Bonus Points

- UI is responsive using Bootstrap 4 and font-awesome where appropriate
- All routes are cached on the server side to greatly improve performance when a page is revisited

## Future Improvements

- better frontend-routing (hash names are long and ugly, but I don't know what is unique about each of these block chain elements)
- Better transitions between pages
- ability to sort and filter data
- Better types (no anys for click handler for example)
