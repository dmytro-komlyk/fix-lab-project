import * as React from "react";
import {
  Create,
  Datagrid,
  Edit,
  List,
  TabbedForm,
  useRecordContext,
} from "react-admin";

const TitleBrand = () => {
  const record = useRecordContext();
  return <span>Бренд {record ? `"${record.title}"` : ""}</span>;
};

const ListBrands = () => {
  return (
    <List title="Brands">
      <Datagrid rowClick="edit"></Datagrid>
    </List>
  );
};

const EditBrand = () => (
  <Edit title={<TitleBrand />}>
    <TabbedForm></TabbedForm>
  </Edit>
);

const CreateBrand = () => (
  <Create>
    <TabbedForm></TabbedForm>
  </Create>
);

export { CreateBrand, EditBrand, ListBrands };
