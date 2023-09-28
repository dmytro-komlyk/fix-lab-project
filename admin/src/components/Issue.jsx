import {
  BooleanField,
  BooleanInput,
  Create,
  Datagrid,
  Edit,
  List,
  TabbedForm,
  TextField,
  TextInput,
  useRecordContext,
} from "react-admin";

const TitleIssue = () => {
  const record = useRecordContext();
  return <span>Послуга {record ? `"${record.title}"` : ""}</span>;
};

const ListIssues = () => {
  return (
    <List title="Issues">
      <Datagrid rowClick="edit">
        <TextField source="title" label="Послуга" />
        <TextField source="slug" label="Slug" />
        <BooleanField label="isActive" source="isActive" />
      </Datagrid>
    </List>
  );
};

const EditIssue = (props) => {
  console.log(props);
  return (
    <Edit title={<TitleIssue />} {...props}>
      <TabbedForm>
        <TabbedForm.Tab label="Контент">
          <TextInput disabled source="slug" />
          {/* <ImageInput source="icon" label="Related icon">
          <ImageField source="src" title="title" />
        </ImageInput> */}
          <TextInput source="slug" label="Slug" required />
          <TextInput source="title" label="Title" required fullWidth />
          <TextInput
            source="description"
            label="Description"
            required
            fullWidth
          />
          <BooleanInput
            label="isActive"
            source="isActive"
            defaultChecked={true}
          />
        </TabbedForm.Tab>
      </TabbedForm>
    </Edit>
  );
};

const CreateIssue = () => (
  <Create>
    <TabbedForm>
      <TabbedForm.Tab label="Контент">
        <TextInput source="slug" label="Slug" />
        <TextInput source="title" label="Title" />
        <TextInput source="description" label="Description" />
        <TextInput source="price" label="Price" />
        <TextInput source="info.diagnostic" label="Diagnostic Info" />
        <TextInput source="info.gaurantee" label="Guarantee Info" />
        <TextInput source="info.repair" label="Repair Info" />
        <BooleanInput source="isActive" label="Is Active" />
      </TabbedForm.Tab>
      <TabbedForm.Tab label="SEO">
        <TextInput source="metadata.title" label="SEO Title" />
        <TextInput source="metadata.description" label="SEO Description" />
        <TextInput source="metadata.keywords" label="SEO Keywords" />
      </TabbedForm.Tab>
    </TabbedForm>
  </Create>
);

export { CreateIssue, EditIssue, ListIssues };
