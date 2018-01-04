import React from "react";
import Input from "./_Input";
import InputCheckbox from "./_InputCheckbox";
import InputRadio from "./_InputRadio";
import Textarea from "./_Textarea";
import Slider from "./_Slider";
import Table from "../Table";
import InputRadioGroup from "./_InputRadioGroup";
import Select from "./_Select";

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
          <Input label="Block text input" />
          <Input label="Inline text input" inline />
          <Input
            label="Number"
            type="number"
            min="100"
            max="1000"
            step="50"
            value="150"
          />
          <Input label="Password" type="password" />
          <Input label="Email" type="email" />
          <Input label="Phone" type="phone" />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <h3>Slider</h3>
        </Table.Cell>
        <Table.Cell colSpan={4}>
          <div style={{ marginTop: "2rem", marginBottom: "4rem" }}>
            <Slider
              label="Slider { step: 750, minDistance: 2000 }"
              min={1000}
              max={10000}
              values={[1300, 5780]}
              minDistance={2000}
              prefix={["From ", "To "]}
              suffix=".-"
              step={750}
              multiple
            />
          </div>
          <div style={{ marginTop: "2rem", marginBottom: "4rem" }}>
            <Slider
              label="Slider { step: 1000, minDistance: 0 }"
              min={1000}
              max={10000}
              values={[1300, 5780]}
              minDistance={0}
              prefix={["From ", "To "]}
              suffix=".-"
              step={1000}
              multiple
            />
          </div>
          <div style={{ marginTop: "2rem", marginBottom: "4rem" }}>
            <Slider
              label="Slider single"
              range={[
                { value: "1", label: "OMG! SAVAS <3" },
                { value: "2", label: "Wow! Savas is great" },
                { value: "3", label: "It is great, Thanks Savas " },
                {
                  value: "4",
                  label: "I like it very much, Savas is fantastic"
                },
                { value: "5", label: "I love it, Savas is awesome." }
              ]}
              values={["5"]}
            />
          </div>
          <div style={{ marginTop: "2rem", marginBottom: "4rem" }}>
            <Slider
              label="Slider { range: Array, minDistance: 1, step: 1 }"
              range={[
                { value: "1", label: "CHF 25" },
                { value: "2", label: "CHF 35" },
                { value: "3", label: "CHF 50" },
                { value: "4", label: "CHF 100" },
                { value: "5", label: "CHF 500" },
                { value: "6", label: "CHF 1'000" }
              ]}
              values={["2", "5"]}
              minDistance={1}
              prefix={["From ", "To "]}
              step={1}
              multiple
            />
          </div>
          <div>
            <Slider
              label="Slider { range: Array, minDistance: 0, step: 1, extremes, mouseThreshold: 10 }"
              range={[
                { value: "1", label: "CHF 25" },
                { value: "2", label: "CHF 35" },
                { value: "3", label: "CHF 50" },
                { value: "4", label: "CHF 100" },
                { value: "5", label: "CHF 500" },
                { value: "6", label: "CHF 1'000" }
              ]}
              values={[null, null]}
              minDistance={0}
              prefix={["From ", "To "]}
              mouseThreshold={10}
              step={1}
              extremes
              multiple
            />
          </div>
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <h3>Checkbox</h3>
        </Table.Cell>
        <Table.Cell colSpan={4}>
          <InputCheckbox value="red" label="Red" checked />
          <InputCheckbox value="blue" label="Blue" checked />
          <InputCheckbox value="green" label="Green" />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <h3>Button Group</h3>
        </Table.Cell>
        <Table.Cell colSpan={4}>
          <InputRadioGroup>
            <InputRadio checked value={10} label="React.js" name="r1" />
            <InputRadio value={10} label="Vue.js" name="r1" />
            <InputRadio value={10} label="Angular.js" name="r1" />
          </InputRadioGroup>
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <h3>Textarea</h3>
        </Table.Cell>
        <Table.Cell colSpan={4}>
          <Textarea label="This is a textarea" />
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>Dropdown</Table.Cell>
        <Table.Cell colSpan={4}>
          <Select
            label="Block select input"
            placeholder="Favorite framework"
            options={[
              { value: "React.js", text: "React.js" },
              { value: "Vue.js", text: "Vue.js" },
              { value: "Angular.js", text: "Angular.js" },
              { value: "jQuery", text: "jQuery" },
              { value: "Knockout", text: "Knockout" },
              { value: "Backbone", text: "Backbone" },
              { value: "Ember", text: "Ember" },
              { value: "Bootstrap", text: "Bootstrap" },
              { value: "Other", text: "Other" }
            ]}
          />
          <Select
            label="Default Value for Select"
            placeholder="Favorite framework"
            selected="React.js"
            options={[
              { value: "React.js", text: "React.js" },
              { value: "Vue.js", text: "Vue.js" },
              { value: "Angular.js", text: "Angular.js" },
              { value: "jQuery", text: "jQuery" },
              { value: "Knockout", text: "Knockout" },
              { value: "Backbone", text: "Backbone" },
              { value: "Ember", text: "Ember" },
              { value: "Bootstrap", text: "Bootstrap" },
              { value: "Other", text: "Other" }
            ]}
          />
          <Select
            label="Multiple select input"
            multiple
            placeholder="Favorite framework"
            options={[
              { value: "React.js", text: "React.js" },
              { value: "Vue.js", text: "Vue.js" },
              { value: "Angular.js", text: "Angular.js" },
              { value: "jQuery", text: "jQuery" },
              { value: "Knockout", text: "Knockout" },
              { value: "Backbone", text: "Backbone" },
              { value: "Ember", text: "Ember" },
              { value: "Bootstrap", text: "Bootstrap" },
              { value: "Other", text: "Other" }
            ]}
          />
          <Select
            label="Inline select input"
            inline
            placeholder="Favorite framework"
            options={[
              { value: "React.js", text: "React.js" },
              { value: "Vue.js", text: "Vue.js" },
              { value: "Angular.js", text: "Angular.js" },
              { value: "jQuery", text: "jQuery" },
              { value: "Knockout", text: "Knockout" },
              { value: "Backbone", text: "Backbone" },
              { value: "Ember", text: "Ember" },
              { value: "Bootstrap", text: "Bootstrap" },
              { value: "Other", text: "Other" }
            ]}
          />
        </Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
);
