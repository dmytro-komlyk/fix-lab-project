import * as React from "react";
import {
  Create,
  Datagrid,
  Edit,
  List,
  TabbedForm,
  useRecordContext,
} from "react-admin";

const TitleIssue = () => {
  const record = useRecordContext();
  return <span>Послуга {record ? `"${record.title}"` : ""}</span>;
};

const ListIssues = () => {
  return (
    <List title="Issues">
      <Datagrid rowClick="edit"></Datagrid>
    </List>
  );
};

const EditIssue = () => (
  <Edit title={<TitleIssue />}>
    <TabbedForm></TabbedForm>
  </Edit>
);

const CreateIssue = () => (
  <Create>
    <TabbedForm></TabbedForm>
  </Create>
);

export { CreateIssue, EditIssue, ListIssues };
