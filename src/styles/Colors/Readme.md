The user interface colors derive from the brand and are used according to WCAG AA standards.

The colors can be found [here](https://github.com/tutti-ch/react-styleguide/blob/master/src/styles/Colors/_colors.scss "Link to react-mypages github repo").

### Greyscale

The colors used for text

```jsx noeditor
<Colors
  color="greyscale"
  shades={["00", 20, 30, 40, 50, 60, 75, 80, 85, 90, 95, 100]}
/>
```

### Base

The base colors are used for navigation & other interface elements.

```jsx noeditor
<Colors color="base" shades={[40, 60, 70, 80, 90, 95, 99]} />
```

### Red

The red color is the accent color to give focus to some UI elements against the base colors.

```jsx noeditor
<Colors color="red" shades={[10, 20, 30, 40, 50, 60, 70, 80, 90]} />
```

### Blue

The color blue is used for info communication.

```jsx noeditor
<Colors color="blue" shades={[10, 20, 30, 40, 50, 60, 70, 80, 90, 95]} />
```

### Green

The color is used for success communication.

```jsx noeditor
<Colors color="green" shades={[10, 20, 30, 40, 50, 60, 70, 80, 90]} />
```

### Yellow

The color yellow is used for favoriting items and for highlighting promotional ads across the UI.

```jsx noeditor
<Colors color="yellow" shades={[10, 20, 30, 40, 50, 60, 70, 80, 90]} />
```

### Orange

The color orange is used to promote premium features.

```jsx noeditor
<Colors color="orange" shades={[10, 20, 30, 40, 50, 60, 70, 80, 90]} />
```

### Purple

The purple color is used to create gradients for marketing / promo features.

```jsx noeditor
<Colors color="purple" shades={[10, 20, 30, 40, 50, 60, 70, 80, 90]} />
```

### Gradients

The gradients are used for marketing / promo features.

```jsx noeditor
<Colors
  color="gradient"
  shades={["red", "blue", "green", "orange", "purple", "yellow"]}
/>
```
