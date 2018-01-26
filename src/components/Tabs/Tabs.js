import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import classes from "./Tabs.scss";
import Tab from "./_Tab";

export default class Tabs extends Component {
  static defaultProps = { defaultActiveTab: 0 };
  static Tab = Tab;

  constructor(props, context) {
    super(props, context);
    this.state = { activeTab: this.props.defaultActiveTab };

    this.onTabClick = this.onTabClick.bind(this);
  }

  /**
   * Handle the tab being clicked.
   *
   * @param {*} tab
   */
  onTabClick(tab) {
    this.setState({ activeTab: tab });
  }

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
    const { className, children } = this.props;
    const tabClasses = classNames(className, [classes.tabs]);

    return (
      <div className={tabClasses}>
        {this.renderTabs()}
        <div className={classes.content}>{this.renderActiveTabContent()}</div>
      </div>
    );
  }
}
