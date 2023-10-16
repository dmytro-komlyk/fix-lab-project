import {
  BooleanField,
  BooleanInput,
  CheckboxGroupInput,
  Create,
  Datagrid,
  Edit,
  ImageField,
  List,
  RadioButtonGroupInput,
  ReferenceArrayInput,
  ReferenceInput,
  ReferenceManyField,
  SelectArrayInput,
  TabbedForm,
  TextField,
  TextInput,
  required,
  useRecordContext,
} from "react-admin";
import { ListIssues } from "./Issue";

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
          <ReferenceInput source="icon" label="Icon" reference="images/icons">
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
          <ReferenceArrayInput source="gallery" reference="images/pictures">
            <CheckboxGroupInput
              optionText={
                <ImageField
                  source="src"
                  title="alt"
                  sx={{
                    "& img": {
                      maxWidth: 250,
                      maxHeight: 150,
                      objectFit: "contain",
                    },
                  }}
                />
              }
              optionValue="id"
            />
          </ReferenceArrayInput>
          <ReferenceArrayInput source="issues" reference="issues">
            <SelectArrayInput
              optionValue="id"
              optionText={<TextField source="title" />}
            />
          </ReferenceArrayInput>
          <ReferenceArrayInput source="brands" reference="brands">
            <SelectArrayInput
              optionValue="id"
              optionText={<TextField source="title" />}
            />
          </ReferenceArrayInput>
          <BooleanInput label="isActive" source="isActive" />
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
          <ReferenceInput source="icon" label="Icon" reference="images/icons">
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
          <TextInput source="slug" label="Slug" validate={required()} />
          <TextInput source="title" label="Назва" fullWidth required />
          <TextInput source="description" label="Опис" fullWidth required />
          <ReferenceArrayInput source="gallery" reference="images/pictures">
            <CheckboxGroupInput
              optionText={
                <ImageField
                  source="src"
                  title="alt"
                  sx={{
                    "& img": {
                      maxWidth: 250,
                      maxHeight: 150,
                      objectFit: "contain",
                    },
                  }}
                />
              }
              optionValue="id"
            />
          </ReferenceArrayInput>
          <ReferenceArrayInput source="issues" reference="issues">
            <SelectArrayInput
              optionValue="id"
              optionText={<TextField source="title" />}
            />
          </ReferenceArrayInput>
          <ReferenceArrayInput source="brands" reference="brands">
            <SelectArrayInput
              optionValue="id"
              optionText={<TextField source="title" />}
            />
          </ReferenceArrayInput>
          <BooleanInput
            label="isActive"
            source="isActive"
            defaultChecked={true}
          />
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
