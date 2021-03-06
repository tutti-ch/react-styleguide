# tutti.ch Styleguide
[![CircleCI](https://img.shields.io/circleci/project/github/tutti-ch/react-styleguide.svg)](https://circleci.com/gh/tutti-ch/react-styleguide)

## How to start
### To develop:

```
git clone https://github.com/tutti-ch/react-styleguide.git
cd react-styleguide
npm install
npm run styleguide
```

Then open [http://localhost:6060](http://localhost:6060) in your browser.

### To include in your project:

```
npm install --save tutti-ch-styleguide
```
or
```
yarn add tutti-ch-styleguide
```

We do work with scss files. In order to include the styles in your project, simply:

```css
@import '~tutti-ch-styleguide/dist/normalize.scss'
@import '~tutti-ch-styleguide/dist/index.scss'
```

The first file `normalize.scss` is a normalizer to have a common style accross browsers. The second file will give you access to all variables that are mentioned in the styleguide.

Then you can easily import our components like:

```javascript
import { Table, Spinner, Image } from 'tutti-ch-styleguide' // See our styleguide for a full list of components
```

## Changing content

We have currently divided the style guide into two sections.

### 1. Styles

Everything related to styles (colors, sizes, icons etc...) goes under this folder. The styleguide will
look into the `src/styles` folder and load every file matching the following glob:

```bash
src/styles/**/[A-Z]*.js
```

These files will be directly included in the style guide under the `Styles` Section.

### 2. Components

Components that will be used in our project will be grouped under this section. The styleguide will
look into the `src/components` folder and load every file matching the following glob:

```bash
src/components/**/[A-Z]*.js
```

These files will be directly included in the style guide under the `UI Components` Section.

### 3. Icons

In order to generate icons one must execute the following command:

`npm run icons`

This command will search for `svg` files recursively under `styles/` folder and will create an `index.js` file within each folder that svgs are located. This index file serves to import the svgs files directly into react as images. If you prefer to use it as a font, then simply use the corresponding class name. For instance, for `kanton-aargau.svg` file one will be able to write: 
```js
import { icons } from "tutti-ch-styleguide"
icons.cantons.CantonAargau
icons.categories.Tv
icons.SocialFacebook
```


## Publishing to Github Pages
---

For detailed information regarding publishing on GitHub pages, you can check
[this](https://help.github.com/articles/configuring-a-publishing-source-for-github-pages/) link.

We use the `docs/` way. GitHub will read everything under this folder. The `index.html` is
the main file to be loaded.

To facilitate the build procedure, we have configured the styleguide to build directly into
the `docs/` folder. If you ever have to change this behaviour, check the `styleguideDir` configuration
under `styleguide.config.js` file.

## Publishing to npm
---

In order to publish to npm one must first create an npm user.
`npm adduser`

Once done, an admin should provide access to the created user on npm's admin page. Afterwards it is as simple as executing the following command:

`npm run dist:publish`

This command will pull the latest version from the master, build the styleguide, patch the package version, push the changes to master and finally will publish.
