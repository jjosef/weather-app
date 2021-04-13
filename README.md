# How this app was setup

First create the project:

`yarn create react-app weather-app --template=typescript`

Once yarn finishes setting up the project folder

```bash
cd weather-app
yarn start
```

This just shows the app is working. Shut down the server and get to work!

## Set up the /server

You'll need to configure the `.env` file which contains your OpenWeatherMap.org and Google Places API Keys in the [server](server) directory.

```
cp .env-template .env
```

Open the file and set your environment variables appropriately.

# Run the server

You have two options here. Run each process separately or run them `concurrently` with `yarn dev`. 

To run them separately:

`cd server && npm start`

then (ideally in a different terminal)

`yarn start`

# Additional dependencies

I added a few dependencies to make API calls and testing API calls easier.

[superagent](https://visionmedia.github.io/superagent/) is my goto HTTP wrapper for both front and backend development.

[weather-icons](https://erikflowers.github.io/weather-icons/) a simple library of weather-related icons to spice up the app a little bit. This is a weird package, you need to install it from the github repo and not npm.

[prettier](https://prettier.io/) I like prettier. It is opinionated but I enjoy it and works well with Code and TypeScript.

# Deploying

Deploying the app will publish the React app and the backend proxy to a GCP Cloud Run instance via Github Actions.

Deploying the React app manually can be done like so:

```
gcloud builds submit --tag gcr.io/$GCP_PROJECT_ID/weather-app
...
gcloud run deploy weather-app --image gcr.io/$GCP_PROJECT_ID/weather-app --platform managed --region us-central1 --allow-unauthenticated
```

For versioning, you should specify a build tag on your image (likely during CI/CD). In this example repo we'll not get into that.

# Caveats and Improvements

Although this was intended to be "production ready", there are a few of things that could have been implemented to improve the quality of product.

1. More robust testing - I tried to illustrate testing business logic and also DOM interaction, but if I had more time to spend I'd likely cover the custom hooks more in depth and set up integration tests. The [server](server) is basically just a proxy so I didn't bother writing tests for that. In a real-world application it would likely have more complexity and require unit tests and integration tests. Adding an E2E suite like cypress or similar would be nice for tracking UI problems as well or publishing them via Slack for the team to be aware of.

2. Logging/Analytics library - For most projects you'd want to capture user interactions into a space where they can be observed by your organization. Whether this is Cloud Logging/Mixpanel/NewRelic/etc they are all solid solutions for helping debug incidents.

3. Environment staging - Typically you'd want your CI pipelines to push changes to a staging area (or multiple) depending on features being built and release structure. I didn't implement this for this demo.

4. Project structure - In a larger project I'd likely break up the components into a more hierarchical structure for manageability, but since I had less than 10 component files I decided to let them live together. Same with the [server](server), it is essentially a proxy so I didn't bother adding the complexity of TypeScript there, and it requires no real structure. Simple is best IMO.

5. Dates/Timezones - I used vanilla JS Date methods for displaying times so I chose to display them "local time", which is accurate to what OWM returns to me, but I don't actually know what the timezones are and I'd probably need a library like moment/date-fns/joda to accurately tell the user what timezone the times are based in.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
