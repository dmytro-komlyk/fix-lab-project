import {
  ArrayInput,
  BooleanInput,
  Create,
  Datagrid,
  Edit,
  List,
  NumberInput,
  SimpleForm,
  SimpleFormIterator,
  TabbedForm,
  TextField,
  TextInput,
  useRecordContext,
} from "react-admin";

const TitleContact = () => {
  const record = useRecordContext();
  return <span>Контакт {record ? `"${record.area}"` : ""}</span>;
};

const ListContacts = () => {
  return (
    <List title="Contacts">
      <Datagrid rowClick="edit">
        <TextField source="area" label="Район" />
      </Datagrid>
    </List>
  );
};

const EditContact = () => (
  <Edit title={<TitleContact />}>
    <TabbedForm>
      <TabbedForm.Tab label="Seo">
        <TextInput label="Title" source="area" />
      </TabbedForm.Tab>
    </TabbedForm>
    {/* <TextInput fullWidth required label="Район" source="area" /> */}
    {/* <TextInput required label="Адрес" source="address" />
      <TextInput label="Комментар" source="comment" /> */}

    {/* <ArrayInput required label="Станції метро" source="subways">
        <SimpleFormIterator>
          <TextInput />
        </SimpleFormIterator>
      </ArrayInput>

      <ArrayInput
        required
        label="Номера телефонів"
        source="phones"
        helperText="В форматі +38 050 227 27 28"
      >
        <SimpleFormIterator>
          <TextInput />
        </SimpleFormIterator>
      </ArrayInput> */}
    {/* 
      <TextInput required label="Робочий час" source="workingTime" />
      <TextInput required label="Робочі дні" source="workingDate" /> */}

    {/* <NumberInput
        required
        label="Latitude"
        source="coords.lat"
        helperText="50.44930083819644"
      />
      <NumberInput
        required
        label="Longitude"
        source="coords.lang"
        helperText="30.523043428894475"
      /> */}
    {/* <BooleanInput label="Is Active" source="isActive" defaultValue={true} /> */}
  </Edit>
);

const CreateContact = () => (
  <Create>
    <SimpleForm>
      <TextInput fullWidth required label="Район" source="area" />
      <TextInput required label="Адрес" source="address" />
      <TextInput label="Комментар" source="comment" />

      <ArrayInput required label="Станції метро" source="subways">
        <SimpleFormIterator>
          <TextInput />
        </SimpleFormIterator>
      </ArrayInput>

      <ArrayInput
        required
        label="Номера телефонів"
        source="phones"
        helperText="В форматі +38 050 227 27 28"
      >
        <SimpleFormIterator>
          <TextInput />
        </SimpleFormIterator>
      </ArrayInput>

      <TextInput required label="Робочий час" source="workingTime" />
      <TextInput required label="Робочі дні" source="workingDate" />
      <NumberInput
        required
        label="Latitude"
        source="coords.lat"
        helperText="50.44930083819644"
        step={1}
      />
      <NumberInput
        required
        label="Longitude"
        source="coords.lang"
        helperText="30.523043428894475"
        step={1}
      />
      <BooleanInput label="Активувати" source="isActive" defaultValue={true} />
    </SimpleForm>
  </Create>
);

export { CreateContact, EditContact, ListContacts };
