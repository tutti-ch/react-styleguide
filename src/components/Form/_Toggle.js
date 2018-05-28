import React, { Children, PureComponent, cloneElement } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { filterProps } from "../../helpers/functions";
import WithWrapper from "./_WithWrapper";
import classes from "./Form.scss";

export class Toggle extends PureComponent {
  static defaultProps = {
    value: ""
  };

  static propTypes = {
    /**
     * The initial value.
     */
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /**
     * The input name.
     */
    name: PropTypes.string,

    /**
     * Function that will be called when value changes.
     */
    onChange: PropTypes.func,

    /**
     * The class name of the selected option.
     */
    selectedClass: PropTypes.string,
  };

  static Option = ({ value, selected, selectedClass, children, onClick }) => (
    <span
      className={classNames(
        { [classes.toggleSelected]: selected },
        classes.toggleOption,
        selectedClass
      )}
      data-value={value}
      onClick={onClick}
    >
      {children}
    </span>
  );

  constructor(props) {
    super(props);

    this.state = {
      value: props.value
    };

    this.handleOnClick = this.handleOnClick.bind(this);
  }

  /**
   * Sync the value.
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({ value: nextProps.value });
    }
  }

  handleOnClick(e) {
    if (this.props.disabled) {
      return;
    }

    e.preventDefault();
    const value = e.target.getAttribute("data-value");

    this.setState({ value }, () => {
      if (typeof this.props.onChange === "function") {
        this.props.onChange(value, {
          initialValue: this.props.value,
          name: this.props.name,
          formValue: value
        });
      }
    });
  }

  render() {
    const { value } = this.state;
    const { name, children } = this.props;
    const props = filterProps(Toggle.propTypes, this.props);

    return (
      <span
        className={classNames(props.className, classes.toggleWrapper, {
          [classes.disabled]: props.disabled
        })}
      >
        {Children.map(children, child =>
          cloneElement(child, {
            className: props.selectedClass,
            selected: value === child.props.value,
            onClick: this.handleOnClick
          })
        )}
        <input type="hidden" value={value} name={name} />
      </span>
    );
  }
}

const WrappedToggle = WithWrapper(Toggle, { hasValue: true });
WrappedToggle.Option = Toggle.Option; // Make it accessible also for the default export.
export default WrappedToggle;
