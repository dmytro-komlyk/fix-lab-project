import { RichTextInput } from "ra-input-rich-text";
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
  TabbedForm,
  TextField,
  TextInput,
  useRecordContext,
} from "react-admin";

const TitleIssue = ({ text }) => {
  const record = useRecordContext();
  return (
    <span>
      {text} {record ? `"${record.title}"` : ""}
    </span>
  );
};

const ListIssues = () => {
  return (
    <List title="Послуги">
      <Datagrid rowClick="edit">
        <ImageField source="image.src" title="Зображення" />
        <TextField source="slug" label="Slug" />
        <TextField source="title" label="Заголовок" />
        <BooleanField label="Активний" source="isActive" />
      </Datagrid>
    </List>
  );
};

const EditIssue = () => {
  const transform = (data) => {
    return {
      ...data,
      benefits: data.benefits.filter((benefit) => typeof benefit === "string"),
    };
  };

  return (
    <Edit
      title={<TitleIssue text="Редагування послуги" />}
      transform={transform}
    >
      <TabbedForm>
        <TabbedForm.Tab label="Контент">
          <TextInput disabled source="id" />
          <TextInput source="slug" label="Slug" />
          <TextInput source="title" label="Заголовок" fullWidth />
          <TextInput source="price" label="Ціна" />
          <ReferenceArrayInput
            source="benefits"
            label="Бенефіти"
            reference="benefits"
          >
            <CheckboxGroupInput optionValue="id" optionText="title" />
          </ReferenceArrayInput>
          <RichTextInput source="info" label="Інфо" />
          <ReferenceInput
            source="image"
            label="Картинка"
            reference="images/pictures"
          >
            <RadioButtonGroupInput
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
            >
              <TextField source="id" />
            </RadioButtonGroupInput>
          </ReferenceInput>
          <RichTextInput source="description" label="Опис" />
          <BooleanInput source="isActive" label="Активний" />
        </TabbedForm.Tab>
        <TabbedForm.Tab label="SEO">
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

const CreateIssue = () => {
  return (
    <Create title={<TitleIssue text="Нова послуга" />}>
      <TabbedForm>
        <TabbedForm.Tab label="Контент">
          <TextInput source="slug" label="Slug" />
          <TextInput source="title" label="Заголовок" fullWidth />
          <TextInput source="price" label="Ціна" />
          <ReferenceArrayInput
            source="benefits"
            label="Бенефіти"
            reference="benefits"
          >
            <CheckboxGroupInput optionValue="_id" optionText="title" />
          </ReferenceArrayInput>
          <RichTextInput source="info" label="Інфо" />
          <ReferenceInput
            source="image"
            label="Картинка"
            reference="images/pictures"
          >
            <RadioButtonGroupInput
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
            >
              <TextField source="id" />
            </RadioButtonGroupInput>
          </ReferenceInput>
          <RichTextInput source="description" label="Опис" />
          <BooleanInput
            source="isActive"
            label="Активний"
            defaultChecked={true}
          />
        </TabbedForm.Tab>
        <TabbedForm.Tab label="SEO">
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

export { CreateIssue, EditIssue, ListIssues };
