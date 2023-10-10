import {
  ChipField,
  Create,
  Datagrid,
  Edit,
  ImageField,
  ImageInput,
  List,
  RadioButtonGroupInput,
  SimpleForm,
  TextField,
  TextInput,
  required,
} from "react-admin";

const ListImages = () => {
  return (
    <List title="Зображення">
      <Datagrid>
        <ImageField source="src" title="file.originalname" />
        <TextField source="alt" label="Alt" />
        <ChipField source="type" label="Type" />
      </Datagrid>
    </List>
  );
};

const EditImage = () => {
  return (
    <Edit>
      <SimpleForm>
        <ImageInput source="file" label="Зображення">
          <ImageField source="src" />
        </ImageInput>
        <TextInput source="alt" label="Alt" />
      </SimpleForm>
    </Edit>
  );
};

const CreateImage = () => {
  return (
    <Create>
      <SimpleForm>
        <ImageInput source="file" label="Зображення" validate={[required()]}>
          <ImageField source="src" />
        </ImageInput>
        <TextInput source="alt" label="Alt" validate={[required()]} />
        <RadioButtonGroupInput
          source="type"
          choices={[
            { id: "icon", name: "Icon" },
            { id: "picture", name: "Picture" },
          ]}
          validate={[required()]}
        />
      </SimpleForm>
    </Create>
  );
};

export { CreateImage, EditImage, ListImages };
