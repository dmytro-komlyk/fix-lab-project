"use client"; // only needed if you choose App Router
import { Admin, Resource } from "react-admin";
import dataProvider from "../dataProvider";
import { CreateGadget, EditGadget, ListGadgets } from "./Gadget";

const AdminApp = () => (
  <Admin dataProvider={dataProvider}>
    <Resource
      name="gadgets"
      list={ListGadgets}
      edit={EditGadget}
      create={CreateGadget}
    />
    {/* <Resource name="brands" list={ListBrands} edit={EditBrand} /> */}
    {/* <Resource name="issues" list={ListIssues} edit={EditIssue} />
    <Resource name="contacts" list={ListContacts} edit={EditContact} /> */}
  </Admin>
);

export default AdminApp;
