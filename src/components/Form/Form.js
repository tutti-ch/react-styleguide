import React from "react"
import Input from "./_Input"
import InputCheckbox from "./_InputCheckbox"
import InputRadio from "./_InputRadio"
import Textarea from "./_Textarea"
import Slider from "./_Slider"
import Table from "../Table"
import InputRadioGroup from "./_InputRadioGroup"

/**
 * This component is only used by the style guide.
 * It should not be used in production.
 */
export default () => (
  <Table>
    <Table.Body>
      <Table.Row>
        <Table.Cell>
          <h3>Inputs</h3>
        </Table.Cell>
        <Table.Cell colSpan={4}>
          <Input label="Block text input"/>
          <Input label="Inline text input" inline/>
          <Input label="Number" type="number" min="100" max="1000" step="50" value="150"/>
          <Input label="Password" type="password"/>
          <Input label="Email" type="email"/>
          <Input label="Phone" type="phone"/>
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <h3>Slider</h3>
        </Table.Cell>
        <Table.Cell colSpan={4}>
          <Slider label="Slider"
                  min={1000}
                  max={10000}
                  minValue={1300}
                  maxValue={10000}
                  minRange={500}
                  prefix={["From ", "To "]}
                  suffix=".-"
                  step={100}
                  multiple/>
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <h3>Checkbox Group</h3>
        </Table.Cell>
        <Table.Cell colSpan={4}>
          <InputCheckbox value="red" label="Red" checked/>
          <InputCheckbox value="blue" label="Blue" checked/>
          <InputCheckbox value="green" label="Green"/>
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <h3>Button Group</h3>
        </Table.Cell>
        <Table.Cell colSpan={4}>
          <InputRadioGroup>
            <InputRadio checked value={10} label="React.js" name="r1"/>
            <InputRadio value={10} label="Vue.js" name="r1"/>
            <InputRadio value={10} label="Angular.js" name="r1"/>
          </InputRadioGroup>
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <h3>Textarea</h3>
        </Table.Cell>
        <Table.Cell colSpan={4}>
          <Textarea label="This is a textarea"/>
        </Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
)
