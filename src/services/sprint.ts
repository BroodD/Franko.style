import api from "./api";

export default {
  getSprints() {
    return api().get(`sprints`);
  },
};
