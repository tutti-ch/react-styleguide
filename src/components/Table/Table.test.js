/* global describe, expect, test, jest */
import React from 'react'
import Table from './index'
import renderer from 'react-test-renderer'

describe('(Component) Table', () => {
  test('should render correctly', () => {
    const tree = renderer.create(
      <Table>
        <Table.Caption>This is the table caption</Table.Caption>
        <Table.Head>
          <Table.Row>
            <Table.HCell colSpan={2}>Wide column</Table.HCell>
            <Table.HCell>Narrow column</Table.HCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell>R1C1</Table.Cell>
            <Table.Cell>R1C2</Table.Cell>
            <Table.Cell>R1C3</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>R2C1</Table.Cell>
            <Table.Cell>R2C2</Table.Cell>
            <Table.Cell>R2C3</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>R3C1</Table.Cell>
            <Table.Cell>R3C2</Table.Cell>
            <Table.Cell>R3C3</Table.Cell>
          </Table.Row>
        </Table.Body>
        <Table.Foot>
          <Table.Row>
            <Table.Cell style={{ color: 'red' }}>Narrow column</Table.Cell>
            <Table.Cell colSpan={2} className='table-cell-styled'>Extra styles</Table.Cell>
          </Table.Row>
        </Table.Foot>
      </Table>
    )

    expect(tree).toMatchSnapshot()
  })
})
