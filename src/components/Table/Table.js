import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import classes from './Table.scss'

export default class Table extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.array])
  }

  static Caption = props => <caption {...props}>{props.children}</caption>
  static Body = ({ children }) => <tbody>{children}</tbody>
  static Head = ({ children }) => <thead>{children}</thead>
  static Foot = ({ children }) => <tfoot>{children}</tfoot>
  static Row = ({ children }) => <tr>{children}</tr>
  static Cell = props => <td {...props}>{props.children}</td>
  static HCell = props => <th {...props}>{props.children}</th>

  render() {
    const { className, children } = this.props

    return (
      <table className={classNames(className, classes.table)}>
        {children}
      </table>
    )
  }
}