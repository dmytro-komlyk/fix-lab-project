const authProvider = {
  register: async ({ userLogin, email, password, name }) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      login: userLogin,
      password,
      email,
      name,
    });

    const requestOptions = {
      method: "POST",
      headers,
      body: raw,
    };

    return fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_URL}/auth/register`,
      requestOptions
    )
      .then(async (response) => {
        const result = await response.text();

        if (!response.ok) {
          return Promise.reject("Invalid credentials");
        }

        localStorage.setItem("token", result);
        return { result: "ok" };
      })
      .catch((error) => {
        console.log("error", error);
        return Promise.reject(error);
      });
  },

  login: async ({ userLogin, password }) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      login: userLogin,
      password: password,
    });

    const requestOptions = {
      method: "POST",
      headers,
      body: raw,
    };

    return fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_URL}/auth/login`,
      requestOptions
    )
      .then(async (response) => {
        const result = await response.text();

        if (!response.ok) {
          return Promise.reject("Invalid credentials");
        }

        localStorage.setItem("token", result);
        return { redirectTo: "/#/gadgets" };
      })
      .catch((error) => {
        console.log("error", error);
        return Promise.reject(error);
      });
  },
  logout: () => {
    localStorage.removeItem("token");
    return Promise.resolve();
  },

  checkAuth: () => {
    return localStorage.getItem("token") ? Promise.resolve() : Promise.reject();
  },

  checkError: (error) => {
    const status = error.status;

    if (status === 401 || status === 403) {
      localStorage.removeItem("token");
      return Promise.reject();
    }

    return Promise.resolve();
  },

  getIdentity: () => {},

  getPermissions: () => Promise.resolve(""),
};

export default authProvider;
