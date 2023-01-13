import axios from "axios";
export const GET_F_NATION = "GET_F_NATION";
export const GET_F_ADMIN = "GET_F_ADMIN";
export const GET_F_NAT_ADMIN = "GET_F_NAT_ADMIN";
export const GET_F_PLAN = "GET_F_PLAN";
export const GET_F_PLAN_ADMIN = "GET_F_PLAN_ADMIN";
export const GET_F_PLAN_NAT = "GET_F_PLAN_NAT";
export const GET_F_PLAN_NAT_ADMIN = "GET_F_PLAN_NAT_ADMIN";

export const getByFilter = (name, nationality, isAdmin, page, limit) => {
  return async function (dispatch) {
    if (nationality && !name && !isAdmin) {
      try {
        const response = await axios.get(
          `http://localhost:3001/users/filter?nationality=${nationality}&limit=${limit}&page=${page}`
        );
        dispatch({
          type: GET_F_NATION,
          payload: response.data,
        });
      } catch (err) {
        console.log(`error en el filtro Nacionalidad: ${err} `);
      }
    }
    if (!nationality && !name && isAdmin) {
      try {
        const response = await axios.get(
          `http://localhost:3001/users/filter?isAdmin=${isAdmin}&limit=${limit}&page=${page}`
        );
        dispatch({
          type: GET_F_ADMIN,
          payload: response.data,
        });
      } catch (err) {
        console.log(`error en el filtro Admin: ${err}`);
      }
    }
    if (nationality && !name && isAdmin) {
      try {
        const response = await axios.get(
          `http://localhost:3001/users/filter?isAdmin=${isAdmin}&nationality=${nationality}&limit=${limit}&page=${page}`
        );
        dispatch({
          type: GET_F_NAT_ADMIN,
          payload: response.data,
        });
      } catch (err) {
        console.log(`error en el filtro Nation y Admin: ${err}`);
      }
    }
    if (!nationality && name && !isAdmin) {
      try {
        const response = await axios.get(
          `http://localhost:3001/users/filter?name=${name}&limit=${limit}&page=${page}`
        );
        dispatch({
          type: GET_F_PLAN,
          payload: response.data,
        });
      } catch (err) {
        console.log(`error en el filtro Nation y Admin: ${err}`);
      }
    }
    if (!nationality && name && isAdmin) {
      try {
        const response = await axios.get(
          `http://localhost:3001/users/filter?name=${name}&isAdmin=${isAdmin}&limit=${limit}&page=${page}`
        );
        dispatch({
          type: GET_F_PLAN_ADMIN,
          payload: response.data,
        });
      } catch (err) {
        console.log(`error en el filtro Plan y Admin: ${err}`);
      }
    }
    if (nationality && name && !isAdmin) {
      try {
        const response = await axios.get(
          `http://localhost:3001/users/filter?name=${name}&nationality=${nationality}&limit=${limit}&page=${page}`
        );
        dispatch({
          type: GET_F_PLAN_NAT,
          payload: response.data,
        });
      } catch (err) {
        console.log(`error en el filtro Plan y Nation: ${err}`);
      }
    }
    if (nationality && name && isAdmin) {
      try {
        const response = await axios.get(
          `http://localhost:3001/users/filter?name=${name}&nationality=${nationality}&isAdmin=${isAdmin}&limit=${limit}&page=${page}`
        );
        dispatch({
          type: GET_F_PLAN_NAT_ADMIN,
          payload: response.data,
        });
      } catch (err) {
        console.log(`error en el filtro Plan y Nation: ${err}`);
      }
    }
  };
};

export const getByNationality = (nationality, limit, page) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `http://localhost:3001/users/filter?nationality=${nationality}&limit=${limit}&page=${page}`
      );
      dispatch({
        type: GET_F_NATION,
        payload: response.data,
      });
    } catch (err) {
      console.log(`error en el filtro Nacionalidad: ${err} `);
    }
  };
};

export const getByAdmin = (isAdmin, limit, page) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `http://localhost:3001/users/filter?isAdmin=${isAdmin}&limit=${limit}&page=${page}`
      );
      dispatch({
        type: GET_F_ADMIN,
        payload: response.data,
      });
    } catch (err) {
      console.log(`error en el filtro Admin: ${err}`);
    }
  };
};

export const getByNatAdmin = (isAdmin, nationality, limit, page) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `http://localhost:3001/users/filter?isAdmin=${isAdmin}&nationality=${nationality}&limit=${limit}&page=${page}`
      );
      dispatch({
        type: GET_F_NAT_ADMIN,
        payload: response.data,
      });
    } catch (err) {
      console.log(`error en el filtro Nation y Admin: ${err}`);
    }
  };
};

export const getByPlan = (name, limit, page) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `http://localhost:3001/users/filter?name=${name}&limit=${limit}&page=${page}`
      );
      dispatch({
        type: GET_F_PLAN,
        payload: response.data,
      });
    } catch (err) {
      console.log(`error en el filtro Nation y Admin: ${err}`);
    }
  };
};

export const getByPlanAdmin = (name, isAdmin, limit, page) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `http://localhost:3001/users/filter?name=${name}&isAdmin=${isAdmin}&limit=${limit}&page=${page}`
      );
      dispatch({
        type: GET_F_PLAN_ADMIN,
        payload: response.data,
      });
    } catch (err) {
      console.log(`error en el filtro Plan y Admin: ${err}`);
    }
  };
};

export const getByPlanNation = (name, nationality, limit, page) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `http://localhost:3001/users/filter?name=${name}&nationality=${nationality}&limit=${limit}&page=${page}`
      );
      dispatch({
        type: GET_F_PLAN_NAT,
        payload: response.data,
      });
    } catch (err) {
      console.log(`error en el filtro Plan y Nation: ${err}`);
    }
  };
};

export const getByPlanNationAdmin = (
  name,
  nationality,
  isAdmin,
  limit,
  page
) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `http://localhost:3001/users/filter?name=${name}&nationality=${nationality}&isAdmin=${isAdmin}&limit=${limit}&page=${page}`
      );
      dispatch({
        type: GET_F_PLAN_NAT_ADMIN,
        payload: response.data,
      });
    } catch (err) {
      console.log(`error en el filtro Plan y Nation: ${err}`);
    }
  };
};
