import React, { Component, PropTypes } from 'react';
import s from './WrappedButton.css';


/**
 * A button wrapped by a Decorator/Enhancer
 */
const WrappedButton = ({
	color,
	size,
	children,
}) => {
	const styles = {
		color,
		fontSize: WrappedButton.sizes[size],
	};

	return (
		<button className={s.root} style={styles}>{children}</button>
	);
};
WrappedButton.propTypes = {
	/**
	 * Button label.
	 */
	children: PropTypes.string.isRequired,
	color: PropTypes.string,
	size: PropTypes.oneOf(['small', 'normal', 'large']),
};
WrappedButton.defaultProps = {
	color: '#333',
	size: 'normal',
};
WrappedButton.sizes = {
	small: '10px',
	normal: '14px',
	large: '18px',
};


const Decorator = Composed => class MyHOC extends Component {
	render() {
		return <Composed {...this.props} />;
	}
};

export default Decorator(WrappedButton);
