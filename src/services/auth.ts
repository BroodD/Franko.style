import api from "./api";

interface UserAuth {
  email: string;
  password: string;
  phone: string;
}

export default {
  login(params: Partial<UserAuth>) {
    return api().post("auth/login", params);
  },
  signUp(params: Partial<UserAuth>) {
    return api().post("auth/signup", params);
  },
};
