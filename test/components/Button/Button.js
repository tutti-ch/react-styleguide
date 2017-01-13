import React, { PropTypes } from 'react';

/**
 * The only true button.
 */
export default function Button({
	color,
	size,
	children,
}) {
	const styles = {
		color,
		fontSize: Button.sizes[size],
	};

	return (
		<button style={styles}>{children}</button>
	);
}
Button.propTypes = {
	/**
	 * Button label.
	 */
	children: PropTypes.string.isRequired,
	color: PropTypes.string,
	size: PropTypes.oneOf(['small', 'normal', 'large']),
};
Button.defaultProps = {
	color: '#333',
	size: 'normal',
};
Button.sizes = {
	small: '10px',
	normal: '14px',
	large: '18px',
};
