import {
  BooleanField,
  BooleanInput,
  Create,
  Datagrid,
  Edit,
  ImageField,
  ImageInput,
  List,
  TabbedForm,
  TextField,
  TextInput,
  required,
  useRecordContext,
} from "react-admin";

const TitleGadget = () => {
  const record = useRecordContext();
  return <span>Гаджет {record ? `"${record.title}"` : ""}</span>;
};

const ListGadgets = () => {
  return (
    <List title="Gadgets">
      <Datagrid rowClick="edit">
        <TextField source="slug" label="Slug" />
        <TextField source="title" label="Title" />
        <BooleanField label="isActive" source="isActive" />
      </Datagrid>
    </List>
  );
};

const EditGadget = () => (
  <Edit title={<TitleGadget />}>
    <TabbedForm>
      <TabbedForm.Tab label="Seo">
        <TextInput label="Title" source="metadata.title" />
        <TextInput label="Description" source="metadata.description" />
        <TextInput label="Keywords" source="metadata.keywords" />
      </TabbedForm.Tab>
      <TabbedForm.Tab label="Content">
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
        <BooleanInput label="isActive" source="isActive" />
      </TabbedForm.Tab>
    </TabbedForm>
  </Edit>
);

const CreateGadget = () => (
  <Create>
    <TabbedForm>
      <TabbedForm.Tab label="SEO">
        <TextInput label="Title" source="metadata.title" />
        <TextInput label="Description" source="metadata.description" />
        <TextInput label="Keywords" source="metadata.keywords" />
      </TabbedForm.Tab>
      <TabbedForm.Tab label="Content">
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
      </TabbedForm.Tab>
    </TabbedForm>
  </Create>
);

export { CreateGadget, EditGadget, ListGadgets };
