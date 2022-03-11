# 301 - Transferred to the [official organization](https://github.com/Preben-Norwegian-Community)

# pnc-webcomponents
The Webcomponents of the Preben Norwegian Community software

## Project purpose

These are the Webcomponents of the Preben Norwegian Community software. They are the **widgets that are used inside the LearnWorlds custom code to make the students interact with the APIs and handle their groups enrollments**.

## How was it made

It was made with **Vue.js 2** and **Vuetify**. The software interfaces with **the PNC APIs**.

## How to use it

There is a **Docker image** that is automatically published with a **Github action**. For the usage, the only other important related thing is the **.env.example** file that shows the parameters that must be configured.

## For development

To run it locally, just run `npm install` for installing the dependencies, `npm run serve` to run a local server. To build the webcomponents, run `npm run build` (the package.json script is changed to make it output the webcomponents).

It is also important knowing the branches organization:
- __pre__: it is a branch used just for development and can be modified without caring too much. **Pushes must be done only on this branch**.
- __dev__: it is a branch that has a github action to create and push the `prebenorwegian/pnc-webcomponents-dev` docker image on dockerhub. **Merges must be done only from the pre branch**.
- __main__: it is a branch that has a github action to create and push the `prebenorwegian/pnc-webcomponents` docker image on dockerhub. **Merges must be done only from the dev branch**.

The **two docker images** (main and dev) exist because first ones wants to **test the changes on dev** and **only after pushing them in prod**.
