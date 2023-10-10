import simpleRestProvider from "ra-data-simple-rest";
import { fetchUtils } from "react-admin";

const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }
  options.headers.set(
    "Authorization",
    `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NTAyZGFiNDVkZGY4ZjJiMDY1YzQwMjEiLCJsb2dpbiI6ImFkbWluIiwiaWF0IjoxNjk0Njg1OTQ0fQ.I0LLv5ihAY4OxR-h4RDfboVEO08pHrr3uUilr91poek`
  );
  return fetchUtils.fetchJson(url, options);
};

const saveFileInStorage = ({ resource, type, alt, file }) => {
  const formData = new FormData();

  formData.append("alt", alt);
  formData.append("type", type);
  formData.append("file", file.rawFile);

  return httpClient(`${process.env.NEXT_PUBLIC_SERVER_API_URL}/${resource}`, {
    method: "POST",
    body: formData,
  });
};

const addUploadFeature = (dataProvider) => ({
  ...dataProvider,
  getList: (resource, params) =>
    dataProvider.getList(`${resource}/all`, params).then(({ data }) => ({
      data: data.map(({ _id, ...rest }) => ({ id: _id, _id, ...rest })),
      total: data.length,
    })),

  getMany: (resource, params) => {
    return dataProvider.getMany(`${resource}/all`, params).then(({ data }) => ({
      data: data.map(({ _id, ...rest }) => ({ id: _id, _id, ...rest })),
    }));
  },

  getOne: (resource, params) =>
    dataProvider.getOne(resource, params).then(({ data }) => {
      const { _id, ...rest } = data;
      const modifiedData = { id: _id, ...rest };
      return { data: modifiedData };
    }),

  create: async (resource, params) => {
    const { meta, data } = params;

    if (resource === "images" && Boolean(params.data.file)) {
      const file = params.data.file;
      const { type, alt } = params.data;
      const updatedResource = `${resource}/${
        type === "icon" ? "upload-icon" : "upload-picture"
      }`;

      if (Boolean(file.rawFile)) {
        return Promise.resolve(
          saveFileInStorage({ resource: updatedResource, type, alt, file })
        )
          .then((res) => res.body)
          .then((imageData) => {
            return dataProvider
              .create(resource, {
                ...params,
                data: {
                  ...params.data,
                  ...JSON.parse(imageData),
                  src: file.src,
                },
              })
              .then(({ data }) => {
                const { _id, ...rest } = data;
                const modifiedData = { id: _id, _id, ...rest };
                return { data: modifiedData };
              });
          });
      }
    }

    return dataProvider
      .create(resource, params)
      .then(({ data }) => {
        const { _id, ...rest } = data;
        const modifiedData = { id: _id, _id, ...rest };
        return { data: modifiedData };
      })
      .catch((err) => console.log(err));
  },

  update: async (resource, params) => {
    const { id, data, previousData } = params;
    const { id: dataId, ...restData } = data;
    const { id: previousDataId, ...restPreviousData } = previousData;
    const newParams = { id, data: restData, previousData: restPreviousData };

    if (resource === "images" && Boolean(params.data.file)) {
      const file = params.data.file;
      const { type, alt } = params.data;
      const updatedResource = `${resource}/${
        type === "icon" ? "upload-icon" : "upload-picture"
      }`;
      if (Boolean(file.rawFile)) {
        return Promise.resolve(
          saveFileInStorage({ resource: updatedResource, type, alt, file })
        )
          .then((res) => res.body)
          .then((imageData) => {
            return dataProvider
              .update(resource, {
                ...newParams,
                data: {
                  ...newParams.data,
                  ...JSON.parse(imageData),
                  src: file.src,
                },
              })
              .then(({ data }) => {
                const { _id, ...rest } = data;
                const modifiedData = { id: _id, _id, ...rest };
                return { data: modifiedData };
              });
          });
      }
      return dataProvider.update(resource, newParams).then(({ data }) => {
        const { _id, ...rest } = data;
        const modifiedData = { id: _id, _id, ...rest };
        return { data: modifiedData };
      });
    }
    console.log(resource, newParams, "UPDATED");
    return dataProvider.update(resource, newParams).then(({ data }) => {
      const { _id, ...rest } = data;
      const modifiedData = { id: _id, _id, ...rest };
      return { data: modifiedData };
    });
  },
});

const dataProvider = simpleRestProvider(
  `${process.env.NEXT_PUBLIC_SERVER_API_URL}`,
  httpClient
);

const myDataProvider = addUploadFeature(dataProvider);

export default myDataProvider;
