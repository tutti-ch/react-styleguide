import test from 'ava';
import React from 'react';
import { parse } from 'react-docgen';
import Group from 'react-group';
import Code from '../Code';
import Markdown from '../Markdown';
import PropsRenderer from './PropsRenderer';
import { unquote, getType } from './util';

function render(propTypes, defaultProps = []) {
	const props = parse(`
		import { Component, PropTypes } from 'react';
		export default class Cmpnt extends Component {
			static propTypes = {
				${propTypes.join(',')}
			}
			static defaultProps = {
				${defaultProps.join(',')}
			}
			render() {
			}
		}
	`);
	return shallow(<PropsRenderer props={props.props} />);
}

test('should render PropTypes.string', () => {
	const actual = render(['color: PropTypes.string']);

	expect(actual.node, 'to contain',
		<tr>
			<td><Code>color</Code></td>
			<td><Code>string</Code></td>
			<td></td>
			<td><Group /></td>
		</tr>
	);
});

test('should render PropTypes.string with a default value', () => {
	const actual = render(['color: PropTypes.string'], ['color: "pink"']);

	expect(actual.node, 'to contain',
		<tr>
			<td><Code>color</Code></td>
			<td><Code>string</Code></td>
			<td><Code>pink</Code></td>
			<td><Group /></td>
		</tr>
	);
});

test('should render PropTypes.string.isRequired', () => {
	const actual = render(['color: PropTypes.string.isRequired']);

	expect(actual.node, 'to contain',
		<tr>
			<td><Code>color</Code></td>
			<td><Code>string</Code></td>
			<td><span>Required</span></td>
			<td><Group /></td>
		</tr>
	);
});

test('should render PropTypes.arrayOf', () => {
	const actual = render(['colors: PropTypes.arrayOf(PropTypes.string)']);

	expect(actual.node, 'to contain',
		<tr>
			<td><Code>colors</Code></td>
			<td><Code>string[]</Code></td>
			<td></td>
			<td><Group /></td>
		</tr>
	);
});

test('should render PropTypes.instanceOf', () => {
	const actual = render(['num: PropTypes.instanceOf(Number)']);

	expect(actual.node, 'to contain',
		<tr>
			<td><Code>num</Code></td>
			<td><Code>Number</Code></td>
			<td></td>
			<td><Group /></td>
		</tr>
	);
});

test('should render PropTypes.shape', () => {
	const actual = render(['foo: PropTypes.shape({bar: PropTypes.number.isRequired, baz: PropTypes.any})']);
	expect(actual.node, 'to contain',
		<tr>
			<td><Code>foo</Code></td>
			<td><Code>shape</Code></td>
			<td></td>
			<td>
				<Group>
					<div>
						<Code>bar</Code>: <Code>number</Code> — <span>Required</span>
					</div>
					<div>
						<Code>baz</Code>: <Code>any</Code>
					</div>
				</Group>
			</td>
		</tr>
	);
});

test('should render description in Markdown', () => {
	const actual = render(['/**\n * Label\n */\ncolor: PropTypes.string']);

	expect(actual.node, 'to contain',
		<tr>
			<td><Code>color</Code></td>
			<td><Code>string</Code></td>
			<td></td>
			<td><Group><Markdown text="Label" /></Group></td>
		</tr>
	);
});

test('should render unknown proptype for a prop when a relevant proptype is not assigned', () => {
	const actual = render([], ['color: "pink"']);

	expect(actual.node, 'to contain',
		<tr>
			<td><Code>color</Code></td>
			<td><Code>unknown</Code></td>
			<td><Code>pink</Code></td>
			<td><Group /></td>
		</tr>
	);
});

test('unquote() should remove double quotes around the string', t => {
	const result = unquote('"foo"');
	t.is(result, 'foo');
});

test('unquote() should remove single quotes around the string', t => {
	const result = unquote("'foo'");
	t.is(result, 'foo');
});

test('unquote() should not remove quotes in the middle of the string', t => {
	const result = unquote('foo"bar');
	t.is(result, 'foo"bar');
});

test('getType() should return .type or .flowType property', t => {
	const result = getType({
		type: 'foo',
		flowType: 'bar',
	});
	t.is(result, 'bar');
});

