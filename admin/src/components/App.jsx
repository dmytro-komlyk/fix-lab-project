"use client"; // only needed if you choose App Router
import { Admin, Resource } from "react-admin";
import authProvider from "../authProvider";
import MyAuthPage from "../components/Auth/MyAuthPage";
import dataProvider from "../dataProvider";
import { CreateContact, EditContact, ListContacts } from "./Contact";
import { CreateGadget, EditGadget, ListGadgets } from "./Gadget";
import { CreateIssue, EditIssue, ListIssues } from "./Issue";
const AdminApp = () => (
  <Admin
    loginPage={MyAuthPage}
    dataProvider={dataProvider}
    authProvider={authProvider}
  >
    <Resource
      name="gadgets"
      list={ListGadgets}
      edit={EditGadget}
      create={CreateGadget}
    />
    <Resource
      name="issues"
      list={ListIssues}
      edit={EditIssue}
      create={CreateIssue}
    />
    {/* <Resource name="brands" list={ListBrands} edit={EditBrand} /> */}
    <Resource
      name="contacts"
      list={ListContacts}
      edit={EditContact}
      create={CreateContact}
    />
  </Admin>
);

export default AdminApp;
