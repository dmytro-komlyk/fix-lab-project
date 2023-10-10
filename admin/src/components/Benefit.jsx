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
  useRecordContext,
} from "react-admin";

const TitleBenefit = ({ text }) => {
  const record = useRecordContext();
  return (
    <span>
      {text} {record ? `"${record.title}"` : ""}
    </span>
  );
};

const ListBenefits = () => {
  return (
    <List title="Бенефіти">
      <Datagrid rowClick="edit">
        <ImageField
          source="icon.src"
          label="Зображення"
          sx={{
            "& img": { maxWidth: 40, maxHeight: 40, objectFit: "contain" },
          }}
        />
        <TextField source="title" label="Назва" />
        <BooleanField label="Активний" source="isActive" />
      </Datagrid>
    </List>
  );
};

const EditBenefit = () => {
  return (
    <Edit title={<TitleBenefit text="Редагування бенефіту" />}>
      <TabbedForm>
        <TabbedForm.Tab label="Контент">
          <TextInput disabled source="id" />
          <ReferenceInput
            source="icon"
            label="Бенефіти"
            reference="images/icons"
          >
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
          <TextInput source="title" label="Заголовок" />
          <BooleanInput source="isActive" label="Активний" />
        </TabbedForm.Tab>
      </TabbedForm>
    </Edit>
  );
};

const CreateBenefit = () => {
  return (
    <Create title={<TitleBenefit text="Новий бенефіт" />}>
      <TabbedForm>
        <TabbedForm.Tab label="Контент">
          <ReferenceInput
            source="icon"
            label="Бенефіти"
            reference="images/icons"
          >
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
          <TextInput source="title" label="Заголовок" />
          <BooleanInput source="isActive" label="Активний" />
        </TabbedForm.Tab>
      </TabbedForm>
    </Create>
  );
};

export { CreateBenefit, EditBenefit, ListBenefits };
