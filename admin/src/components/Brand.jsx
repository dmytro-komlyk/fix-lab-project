import { RichTextInput } from "ra-input-rich-text";
import {
  BooleanField,
  BooleanInput,
  Create,
  Datagrid,
  Edit,
  ImageField,
  List,
  RadioButtonGroupInput,
  ReferenceInput,
  TabbedForm,
  TextField,
  TextInput,
  required,
  useRecordContext,
} from "react-admin";

const TitleBrand = ({ text }) => {
  const record = useRecordContext();
  return (
    <span>
      {text} {record ? `"${record.title}"` : ""}
    </span>
  );
};

const ListBrands = () => {
  return (
    <List title="Бренди">
      <Datagrid rowClick="edit">
        <ImageField
          source="icon.src"
          label="Зображення"
          sx={{
            "& img": { maxWidth: 40, maxHeight: 40, objectFit: "contain" },
          }}
        />
        <TextField source="slug" label="Slug" />
        <TextField source="title" label="Назва" />
        <BooleanField source="isActive" label="Активний" />
      </Datagrid>
    </List>
  );
};

const EditBrand = () => {
  return (
    <Edit title={<TitleBrand text="Редагування бренду" />}>
      <TabbedForm>
        <TabbedForm.Tab label="Контент">
          <TextInput disabled source="id" />
          <TextInput source="slug" label="Slug" validate={[required()]} />
          <ReferenceInput source="icon" reference="images/icons">
            <RadioButtonGroupInput
              validate={[required()]}
              label="Іконка"
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
          <TextInput source="title" label="Заголовок" />
          <RichTextInput source="article" label="Cтаття" />
          <BooleanInput source="isActive" label="Активний" />
        </TabbedForm.Tab>
        <TabbedForm.Tab label="SEO">
          <TextField source="title" label="Назва" />
          <TextInput source="metadata.title" label="SEO title" fullWidth />
          <TextInput
            source="metadata.description"
            label="SEO description"
            fullWidth
          />
          <TextInput
            source="metadata.keywords"
            label="SEO keywords"
            fullWidth
          />
        </TabbedForm.Tab>
      </TabbedForm>
    </Edit>
  );
};

const CreateBrand = () => {
  return (
    <Create title={<TitleBrand text="Новый бренд" />}>
      <TabbedForm>
        <TabbedForm.Tab label="Контент">
          <TextInput source="slug" label="Slug" />
          <ReferenceInput source="icon" reference="images/icons">
            <RadioButtonGroupInput
              validate={[required()]}
              optionText={
                <ImageField
                  label="Іконка"
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
          <TextInput source="title" label="Заголовок" />
          <RichTextInput source="article" label="Cтаття" />
          <BooleanInput source="isActive" label="Активний" />
        </TabbedForm.Tab>
        <TabbedForm.Tab label="SEO">
          <TextField source="title" label="Назва" />
          <TextInput source="metadata.title" label="SEO title" fullWidth />
          <TextInput
            source="metadata.description"
            label="SEO description"
            fullWidth
          />
          <TextInput
            source="metadata.keywords"
            label="SEO keywords"
            fullWidth
          />
        </TabbedForm.Tab>
      </TabbedForm>
    </Create>
  );
};

export { CreateBrand, EditBrand, ListBrands };
