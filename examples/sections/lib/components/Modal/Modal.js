import React, { Component, PropTypes } from 'react';
import ReactModal from 'react-modal';

/**
 * Modal dialog (actually just a [react-modal](https://github.com/rackt/react-modal) wrapper).
 */
export default class Modal extends Component {
	static propTypes = {
		isOpen: PropTypes.bool,
		children: PropTypes.node.isRequired,
	};

	render() {
		const { isOpen, children } = this.props;
		const style = {
			overlay: {
				zIndex: 999,
			},
		};
		return (
			<ReactModal isOpen={isOpen} style={style}>{children}</ReactModal>
		);
	}
}
