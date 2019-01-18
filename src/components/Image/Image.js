import React, { Component } from "react";
import PropTypes from "prop-types";
import classes from "./Image.scss";
import classNames from "classnames";
import Spinner from "../Spinner";
import { TuttiCube } from "../../styles/Icons/assets/generic";
import { filterProps } from "../../helpers/functions";

// This gets overwritten by the Readme.md for some reason
// Apparently, it uses the component name as a global variable.
// Small hack to prevent this behavior.
const NativeImage =
  typeof window !== "undefined"
    ? window.Image
    : /* istanbul ignore next */ () => {};

/**
 * The Image component.
 *
 * Use this class instead of classic &lt;img&gt; tag.
 * It has built-in error handling and spinner in case the image takes long to load.
 */
export default class Image extends Component {
  static propTypes = {
    /**
     * The image source.
     */
    src: PropTypes.string.isRequired,

    /**
     * The size of the spinner while image is loading. By default this is disabled, set any number to activate.
     */
    spinnerSize: PropTypes.number,

    /**
     * The class name for the span that is shown on error.
     */
    errorClassName: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
      PropTypes.object
    ]),

    /**
     * The class name for the spinner.
     */
    spinnerClassName: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
      PropTypes.object
    ])
  };

  state = {
    loaded: false,
    error: false
  };

  /**
   * When the image is loaded set the state accordingly. This callback is triggered
   * by the Image class when its src property is updated.
   */
  onLoad = () => {
    this.setState({ error: false, loaded: true });
  };

  /**
   * When the image failed to load set the state accordingly. This callback is triggered
   * by the Image class when its src property is updated.
   */
  onError = () => {
    this.setState({ error: true, loaded: true });
  };

  componentDidMount() {
    // Why loading like this? Because we want to render only one element:
    // for error: true => we render the cube
    // for loaded: true => we render the image
    // otherwise the spinner.
    // Doing this without wrapping the elements in a span wrapper is almost impossible
    // and we do not want to wrap every image in the app with a span (breaks the layout in some cases)
    this.image = new NativeImage();
    this.image.onload = this.onLoad;
    this.image.onerror = this.onError;

    // Make sure to have this otherwise neither onload nor onerror will be triggered
    // and the image will spin forever.
    this.image.src = this.props.src;
  }

  // need to check both on update and on mount because sometimes the image gets called with an empty url at first
  // (eg. before we fetch the ad url from an api call)
  componentDidUpdate(oldProps) {
    if (oldProps.src !== this.props.src) {
      this.image.src = this.props.src;
      this.setState({ loaded: false });
    }
  }

  // Cancel callback functions in case we unmount
  // before the image has loaded. This will remove
  // the annoying setState warning.
  componentWillUnmount() {
    this.image.onload = undefined;
    this.image.onerror = undefined;
  }

  /**
   * Render the error state. This is called when onError callback is triggered.
   *
   * @return {*}
   */
  renderError = () => {
    const { errorClassName } = this.props;
    return (
      <span className={classNames(classes.error, errorClassName)}>
        <TuttiCube className={classes.cube} />
      </span>
    );
  };

  /**
   * Render the spinner. This is called when the image is still loading and
   * neither error, nor success is called yet.
   *
   * @return {*}
   */
  renderSpinner = () => {
    const { spinnerClassName, spinnerSize } = this.props;

    // Do not render if the spinner size is not provided
    if (!spinnerSize) {
      return null;
    }

    return <Spinner className={spinnerClassName} size={spinnerSize} />;
  };

  /**
   * Render the image component.
   *
   * @return {*}
   */
  render() {
    const { src } = this.props;
    const { error, loaded } = this.state;

    if (error) {
      return this.renderError();
    }

    if (loaded) {
      const attrs = filterProps(Image.propTypes, this.props);
      attrs.draggable =
        typeof attrs.draggable === "undefined" ? true : attrs.draggable; // By default is true
      attrs.className = classNames(classes.image, attrs.className);

      return (
        <img {...attrs} src={src} onLoad={this.onLoad} onError={this.onError} />
      );
    }

    return this.renderSpinner();
  }
}
