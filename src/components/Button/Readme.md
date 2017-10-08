```jsx noeditor
const classes = require('./preview.scss');
<Table class="">
  <Table.Body>
    <Table.Row>
      <Table.Cell width='20%'>
        Role Warning
      </Table.Cell>
      <Table.Cell>
        <Button level={Button.LEVEL_PRIMARY} role={Button.ROLE_WARNING}>Primary</Button>
      </Table.Cell>
      <Table.Cell>
        <Button level={Button.LEVEL_SECONDARY} role={Button.ROLE_WARNING}>Secondary</Button>
      </Table.Cell>
      <Table.Cell>
        <Button level={Button.LEVEL_TERTIARY} role={Button.ROLE_WARNING}>Tertiary</Button>
      </Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell width='20%'>
        Disabled
      </Table.Cell>
      <Table.Cell>
        <Button level={Button.LEVEL_PRIMARY} disabled>Primary</Button>
      </Table.Cell>
      <Table.Cell>
        <Button level={Button.LEVEL_SECONDARY} disabled>Secondary</Button>
      </Table.Cell>
      <Table.Cell>
        <Button level={Button.LEVEL_TERTIARY} disabled>Tertiary</Button>
      </Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell width='20%'>
        Square borders
      </Table.Cell>
      <Table.Cell>
        <Button level={Button.LEVEL_PRIMARY} rounded={false}>Primary</Button>
      </Table.Cell>
      <Table.Cell>
        <Button level={Button.LEVEL_SECONDARY} rounded={false}>Secondary</Button>
      </Table.Cell>
      <Table.Cell>
        <Button level={Button.LEVEL_TERTIARY} rounded={false}>Tertiary</Button>
      </Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell width='20%'>
        Size Small
      </Table.Cell>
      <Table.Cell>
        <Button level={Button.LEVEL_PRIMARY} size={Button.SIZE_SMALL}>Primary</Button>
      </Table.Cell>
      <Table.Cell>
        <Button level={Button.LEVEL_SECONDARY} size={Button.SIZE_SMALL}>Secondary</Button>
      </Table.Cell>
      <Table.Cell>
        <Button level={Button.LEVEL_TERTIARY} size={Button.SIZE_SMALL}>Tertiary</Button>
      </Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell width='20%'>
        Size Large
      </Table.Cell>
      <Table.Cell>
        <Button level={Button.LEVEL_PRIMARY} size={Button.SIZE_LARGE}>Primary</Button>
      </Table.Cell>
      <Table.Cell>
        <Button level={Button.LEVEL_SECONDARY} size={Button.SIZE_LARGE}>Secondary</Button>
      </Table.Cell>
      <Table.Cell>
        <Button level={Button.LEVEL_TERTIARY} size={Button.SIZE_LARGE}>Tertiary</Button>
      </Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell width='20%'>
        Loading
      </Table.Cell>
      <Table.Cell>
        <Button level={Button.LEVEL_PRIMARY} loading>Primary</Button>
      </Table.Cell>
      <Table.Cell>
        <Button level={Button.LEVEL_SECONDARY} loading>Secondary</Button>
      </Table.Cell>
      <Table.Cell>
        <Button level={Button.LEVEL_TERTIARY} loading>Tertiary</Button>
      </Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell width='20%'>
        Position fullWidth
      </Table.Cell>
      <Table.Cell>
        <Button level={Button.LEVEL_PRIMARY} position={Button.POSITION_FULL_WIDTH}>Primary</Button>
      </Table.Cell>
      <Table.Cell>
        <Button level={Button.LEVEL_SECONDARY} position={Button.POSITION_FULL_WIDTH}>Secondary</Button>
      </Table.Cell>
      <Table.Cell>
        <Button level={Button.LEVEL_TERTIARY} position={Button.POSITION_FULL_WIDTH}>Tertiary</Button>
      </Table.Cell>
    </Table.Row>
  </Table.Body>
</Table>
```