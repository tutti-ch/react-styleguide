import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import classes from "./Tabs.scss";
import Tab from "./_Tab";

export default class Tabs extends Component {
  static defaultProps = {
    defaultActiveTab: 0
  };

  static propTypes = {
    defaultActiveTab: PropTypes.number,
    onTabChange: PropTypes.func
  };

  static Tab = Tab;

  state = {
    activeTab: this.props.defaultActiveTab
  };

  /**
   * Handle the tab being clicked.
   *
   * @param {*} tab
   */
  onTabClick = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab }, () => {
        if (typeof this.props.onTabChange === "function") {
          this.props.onTabChange(tab);
        }
      });
    }
  };

  /**
   * Takes the children passed to Tabs and enhance them with some extra props
   * to keep track of their state
   */
  renderTabs() {
    return React.Children.map(this.props.children, (child, index) => {
      if (!child) return null;

      return React.cloneElement(child, {
        index,
        onClick: this.onTabClick,
        isActive: index === this.state.activeTab
      });
    });
  }

  /**
   * If defined it renders the content of the current active children
   */
  renderActiveTabContent() {
    const { children } = this.props;
    const { activeTab } = this.state;

    if (children[activeTab]) {
      return children[activeTab].props.children;
    }
  }

  render() {
    const { className } = this.props;
    const tabClasses = classNames(className, [classes.tabs]);

    return (
      <div className={tabClasses}>
        {this.renderTabs()}
        <div className={classes.content}>{this.renderActiveTabContent()}</div>
      </div>
    );
  }
}
