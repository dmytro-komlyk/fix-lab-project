import * as React from "react";
import {
  Create,
  Datagrid,
  Edit,
  List,
  TabbedForm,
  useRecordContext,
} from "react-admin";

const TitleContact = () => {
  const record = useRecordContext();
  return <span>Контакт {record ? `"${record.title}"` : ""}</span>;
};

const ListContacts = () => {
  return (
    <List title="Contacts">
      <Datagrid rowClick="edit"></Datagrid>
    </List>
  );
};

const EditContact = () => (
  <Edit title={<TitleContact />}>
    <TabbedForm></TabbedForm>
  </Edit>
);

const CreateContact = () => (
  <Create>
    <TabbedForm></TabbedForm>
  </Create>
);

export { CreateContact, EditContact, ListContacts };
