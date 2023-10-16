import {
  ArrayInput,
  Datagrid,
  Edit,
  List,
  NumberInput,
  SaveButton,
  SimpleFormIterator,
  TabbedForm,
  TextField,
  TextInput,
  Toolbar,
  useRecordContext,
} from "react-admin";

const TitleContact = () => {
  const record = useRecordContext();
  return <span>Контакт {record ? `"${record.area}"` : ""}</span>;
};

const ListContacts = () => {
  return (
    <List title="Контакти">
      <Datagrid bulkActionButtons={false} rowClick="edit">
        <TextField source="area" label="Список контактів" />
      </Datagrid>
    </List>
  );
};

const EditContact = () => {
  const UserEditToolbar = (props) => (
    <Toolbar {...props}>
      <SaveButton />
    </Toolbar>
  );
  return (
    <Edit title={<TitleContact />}>
      <TabbedForm toolbar={<UserEditToolbar />}>
        <TabbedForm.Tab label="Редагувати контакт">
          <TextInput fullWidth required label="Район" source="area" />
          <TextInput required label="Адрес" source="address" />
          <TextInput label="Комментар" source="comment" />
          <TextInput
            label="Номер телефону"
            source="phones"
            helperText="В форматі +38 050 227 27 28"
          />
          <ArrayInput required label="Станції метро" source="subways">
            <SimpleFormIterator>
              <TextInput />
            </SimpleFormIterator>
          </ArrayInput>

          <NumberInput
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
          />
        </TabbedForm.Tab>
        <TabbedForm.Tab label="Редагувати загальні дані">
          <TextInput required label="Робочий час" source="workingTime" />
          <TextInput required label="Робочі дні" source="workingDate" />
        </TabbedForm.Tab>
      </TabbedForm>
    </Edit>
  );
};

export { EditContact, ListContacts };
