import React, { Component } from "react";
import PropTypes from "prop-types";
import classes from "./Image.scss";
import classNames from "classnames";
import Spinner from "../Spinner";


/**
 * The Image component.
 *
 * Use this class instead of classic <img> tag.
 * It has built-in error handling and spinner in case the image takes long to load.
 */
export default class Image extends Component {
  static defaultProps = {
    draggable: true
  };

  static propTypes = {
    src: PropTypes.string, // The image source
    alt: PropTypes.string, // The image alt property
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    draggable: PropTypes.bool, // Allow/Disallow image to be dragged
    spinnerSize: PropTypes.number, // The spinner size. By default this is disabled. Set any number to activate.
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
      PropTypes.object
    ]), // class names for <img>
    errorClassName: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
      PropTypes.object
    ]), // class names for <span>
    spinnerClassName: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
      PropTypes.object
    ]) // class names for <Spinner>
  };

  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      error: false
    };

    this.onLoad = this.onLoad.bind(this);
    this.onError = this.onError.bind(this);
  }

  /**
   * When the image is loaded set the state accordingly. This callback is triggered
   * by the Image class when its src property is updated.
   */
  onLoad() {
    this.setState({ error: false, loaded: true });
  }

  /**
   * When the image failed to load set the state accordingly. This callback is triggered
   * by the Image class when its src property is updated.
   */
  onError() {
    this.setState({ error: true, loaded: true });
  }

  componentDidMount() {
    // Why loading like this? Because we want to render only one element:
    // for error: true => we render the cube
    // for loaded: true => we render the image
    // otherwise the spinner.
    // Doing this without wrapping the elements in a span wrapper is almost impossible
    // and we do not want to wrap every image in the app with a span (breaks the layout in some cases)
    this.image = new window.Image();
    this.image.onload = this.onLoad;
    this.image.onerror = this.onError;

    // Make sure to have this otherwise neither onload nor onerror will be triggered
    // and the image will spin forever.
    this.image.src = this.props.src;
  }

  // need to check both on update and on mount because sometimes the image gets called with an empty url at first
  // (eg. before we fetch the ad url from an api call)
  componentWillUpdate(nextProps) {
    if (nextProps.src !== this.props.src) {
      this.image.src = nextProps.src;
    }
  }

  // Cancel callback functions in case we unmount
  // before the image has loaded. This will remove
  // the annoying setState warning.
  componentWillUnmount() {
    this.image.onload = undefined;
    this.image.onerror = undefined;
  }

  render() {
    const {
      src,
      alt,
      className,
      errorClassName,
      spinnerClassName,
      spinnerSize,
      width,
      height,
      draggable
    } = this.props;
    const { error, loaded } = this.state;

    if (error) {
      return (
        <span
          className={classNames(
            classes.error,
            errorClassName,
            "ico",
            "ico-tutti-cube"
          )}
        />
      );
    }

    if (loaded) {
      return (
        <img
          className={classNames(classes.image, className)}
          alt={alt}
          src={src}
          width={width}
          height={height}
          draggable={draggable}
          onLoad={this.onLoad}
          onError={this.onError}
        />
      );
    }

    if (spinnerSize) {
      return <Spinner className={spinnerClassName} size={spinnerSize} />;
    }

    return null;
  }
}
