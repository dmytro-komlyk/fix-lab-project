import {
  BooleanField,
  BooleanInput,
  Create,
  Datagrid,
  Edit,
  ImageField,
  ImageInput,
  List,
  ReferenceManyField,
  TabbedForm,
  TextField,
  TextInput,
  required,
  useRecordContext,
} from "react-admin";
import { CreateIssue, ListIssues } from "./Issue";

const TitleGadget = () => {
  const record = useRecordContext();
  return <span>Гаджет {record ? `"${record.title}"` : ""}</span>;
};

const ListGadgets = () => {
  return (
    <List title="Gadgets">
      <Datagrid rowClick="edit">
        <TextField source="title" label="Гаджет" />
        <TextField source="slug" label="Slug" />
        <BooleanField label="isActive" source="isActive" />
      </Datagrid>
    </List>
  );
};

const EditGadget = () => {
  return (
    <Edit title={<TitleGadget />}>
      <TabbedForm>
        <TabbedForm.Tab label="Контент">
          <TextInput disabled source="id" />
          <ImageInput source="icon" label="Related icon">
            <ImageField source="src" title="title" />
          </ImageInput>
          <TextInput source="slug" label="Slug" validate={required()} />
          <TextInput
            source="title"
            label="Title"
            validate={required()}
            fullWidth
          />
          <TextInput
            source="description"
            label="Description"
            validate={required()}
            fullWidth
          />
          <BooleanInput
            label="isActive"
            source="isActive"
            defaultChecked={true}
          />
        </TabbedForm.Tab>
        <TabbedForm.Tab label="Seo">
          <TextInput label="Title" source="metadata.title" />
          <TextInput label="Description" source="metadata.description" />
          <TextInput label="Keywords" source="metadata.keywords" />
        </TabbedForm.Tab>
        <TabbedForm.Tab label="Послуги">
          <ReferenceManyField label="Послуги" reference="issues" target="id">
            <ListIssues />
          </ReferenceManyField>
        </TabbedForm.Tab>
      </TabbedForm>
    </Edit>
  );
};

const CreateGadget = () => {
  return (
    <Create>
      <TabbedForm>
        <TabbedForm.Tab label="Контент">
          <TextInput source="slug" label="Slug" validate={required()} />
          <TextInput source="title" label="Назва" fullWidth required />
          <TextInput source="description" label="Опис" fullWidth required />
          <BooleanInput label="isActive" source="isActive" />
        </TabbedForm.Tab>
        <TabbedForm.Tab label="SEO">
          <TextInput label="Title" source="metadata.title" />
          <TextInput label="Description" source="metadata.description" />
          <TextInput label="Keywords" source="metadata.keywords" />
        </TabbedForm.Tab>
      </TabbedForm>
    </Create>
  );
};

export { CreateGadget, EditGadget, ListGadgets };
