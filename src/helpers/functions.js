/**
 * This function will remove the properties that are already defined in propTypes and return
 * the undefined ones. This way we can directly filter props and pass the extra props to the root element in
 * a component.
 *
 * @param {Object} propTypes The list of defined properties.
 * @param {Object} props The instance props.
 */
export const filterProps = (propTypes, props) => {
  const filteredProps = {};

  Object.keys(props)
    .filter(k => propTypes[k] === undefined)
    .forEach(k => (filteredProps[k] = props[k]));

  return filteredProps;
};
