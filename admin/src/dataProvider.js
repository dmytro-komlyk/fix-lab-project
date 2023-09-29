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

const saveFileInStorage = (resource, id, rawFile) => {
  const formData = new FormData();
  formData.append("icon", rawFile);

  return httpClient(
    `http://95.217.34.212:30000/api/${resource}/${id}/update-icon`,
    {
      method: "PATCH",
      body: formData,
    }
  );
};

const addUploadFeature = (dataProvider) => ({
  ...dataProvider,
  getList: (resource, params) =>
    dataProvider.getList(`${resource}/all`, params).then(({ data }) => ({
      data: data.map(({ _id, ...rest }) => ({ id: _id, _id, ...rest })),
      total: data.length,
    })),

  getOne: (resource, params) =>
    dataProvider.getOne(resource, params).then(({ data }) => {
      const { _id, ...rest } = data;
      const modifiedData = { id: _id, ...rest };
      return { data: modifiedData };
    }),

  create: (resource, params) => {
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

    if (Boolean(params.data.icon)) {
      const { rawFile, ...restImageData } = params.data.icon;
      if (Boolean(rawFile)) {
        return Promise.resolve(saveFileInStorage(resource, id, rawFile))
          .then((res) => res.body)
          .then((imageData) => {
            console.log(imageData);
            return dataProvider
              .update(resource, {
                ...newParams,
                data: {
                  ...newParams.data,
                  icon: {
                    ...restImageData,
                    src: imageData,
                  },
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
    return dataProvider.update(resource, newParams).then(({ data }) => {
      const { _id, ...rest } = data;
      const modifiedData = { id: _id, _id, ...rest };
      return { data: modifiedData };
    });
  },
});

const dataProvider = simpleRestProvider(
  `http://95.217.34.212:30000/api`,
  httpClient
);

const myDataProvider = addUploadFeature(dataProvider);

export default myDataProvider;
