import { RichTextInput } from "ra-input-rich-text";
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
        <ImageField source="icon.src" title="Зображення" />
        <TextField source="slug" label="Slug" />
        <TextField source="title" label="Назва" />
        <BooleanField label="isActive" source="Активний" />
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
          <TextInput source="slug" label="Slug" />
          <TextInput source="title" label="Заголовок" />
          <ImageInput source="icon" label="Зображення">
            <ImageField source="src" />
          </ImageInput>
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
          <TextInput source="title" label="Заголовок" />
          <ImageInput source="icon" label="Зображення">
            <ImageField source="src" />
          </ImageInput>
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
