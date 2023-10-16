import {
  ArrayInput,
  CheckboxGroupInput,
  Datagrid,
  Edit,
  ImageField,
  List,
  RadioButtonGroupInput,
  ReferenceArrayInput,
  ReferenceInput,
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
          <ArrayInput
            required
            label="Номер телефону"
            source="phones"
            helperText="В форматі +38 050 227 27 28"
          >
            <SimpleFormIterator>
              <TextInput />
            </SimpleFormIterator>
          </ArrayInput>
          <ArrayInput required label="Станції метро" source="subways">
            <SimpleFormIterator>
              <TextInput />
            </SimpleFormIterator>
          </ArrayInput>
          <TextInput
            fullWidth
            label="Посилання адреси салону на карті"
            source="googleMapLink"
          />
          <TextInput
            fullWidth
            label="Посилання адреси салону для плагіну"
            source="googlePluginLink"
          />
          <ReferenceInput
            source="image"
            label="image"
            reference="images/pictures"
          >
            <RadioButtonGroupInput
              optionText={
                <ImageField
                  source="src"
                  title="alt"
                  sx={{
                    "& img": {
                      maxWidth: 60,
                      maxHeight: 60,
                      objectFit: "contain",
                    },
                  }}
                />
              }
              optionValue="id"
            >
              <TextField source="id" />
            </RadioButtonGroupInput>
          </ReferenceInput>
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
