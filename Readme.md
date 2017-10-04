# tutti.ch Styleguide
---
[![CircleCI](https://img.shields.io/circleci/project/github/tutti-ch/react-styleguide.svg)](https://circleci.com/gh/tutti-ch/react-styleguide)

## How to start
---
### To develop:

```
git clone https://github.com/tutti-ch/react-styleguide.git
cd react-styleguide
npm install
npm run styleguide-server
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

To load the style, in your `main.scss` (or whatever the name is):

```css
@import '~tutti-ch-styleguide/main.bundle.css'
```

Then you can easily import our components like: 

```javascript
import { Table, Spinner } from 'tutti-ch-styleguide' // See our styleguide for a full list of components
```

## Changing content
---

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


## Publishing to Github Pages
---

For detailed information regarding publishing on GitHub pages, you can check
[this](https://help.github.com/articles/configuring-a-publishing-source-for-github-pages/) link.

We use the `docs/` way. GitHub will read everything under this folder. The `index.html` is 
the main file to be loaded.

To facilitate the build procedure, we have configured the styleguide to build directly into
the `docs/` folder. If you ever have to change this behaviour, check the `styleguideDir` configuration
under `styleguide.config.js` file.
