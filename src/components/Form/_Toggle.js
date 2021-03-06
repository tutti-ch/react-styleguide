import React, { Children, PureComponent, cloneElement } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
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
    selectedClass: PropTypes.string
  };

  static Option = ({ value, selected, selectedClass, children, onClick }) => (
    <div
      className={classNames(
        {
          [classes.toggleSelected]: selected,
          [selectedClass]: selected
        },
        classes.toggleOption
      )}
      data-value={value}
      onClick={onClick}
    >
      {children}
    </div>
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
  componentDidUpdate(oldProps) {
    if (oldProps.value !== this.props.value) {
      this.setState({ value: this.props.value });
    }
  }

  handleOnClick(e, value) {
    if (this.props.disabled) {
      return;
    }

    e.preventDefault();

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
    const { name, children, selectedClass, onChange, ...props } = this.props;

    return (
      <>
        <div
          className={classNames(props.className, classes.toggleWrapper, {
            [classes.disabled]: props.disabled
          })}
        >
          {Children.map(children, child =>
            cloneElement(child, {
              selectedClass,
              selected: value === child.props.value,
              onClick: e => this.handleOnClick(e, child.props.value)
            })
          )}
        </div>
        <input type="hidden" value={value} name={name} />
      </>
    );
  }
}

const WrappedToggle = WithWrapper(Toggle, { hasValue: true });
WrappedToggle.Option = Toggle.Option; // Make it accessible also for the default export.
export default WrappedToggle;
