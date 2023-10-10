"use client"; // only needed if you choose App Router
import { Admin, Resource } from "react-admin";
import dataProvider from "../dataProvider";
import { CreateBenefit, EditBenefit, ListBenefits } from "./Benefit";
import { CreateBrand, EditBrand, ListBrands } from "./Brand";
import { CreateContact, EditContact, ListContacts } from "./Contact";
import { CreateGadget, EditGadget, ListGadgets } from "./Gadget";
import { CreateImage, EditImage, ListImages } from "./Image";
import { CreateIssue, EditIssue, ListIssues } from "./Issue";

const AdminApp = () => (
  <Admin dataProvider={dataProvider}>
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
    <Resource
      name="benefits"
      list={ListBenefits}
      edit={EditBenefit}
      create={CreateBenefit}
    />
    <Resource
      name="brands"
      list={ListBrands}
      edit={EditBrand}
      create={CreateBrand}
    />
    <Resource
      name="contacts"
      list={ListContacts}
      edit={EditContact}
      create={CreateContact}
    />
    <Resource
      name="images"
      list={ListImages}
      create={CreateImage}
      edit={EditImage}
    />
  </Admin>
);

export default AdminApp;
