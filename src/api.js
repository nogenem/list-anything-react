import axios from "axios";

export default {
  user: {
    login: credentials =>
      axios.post("/api/auth", { credentials }).then(res => res.data.user),
    signup: user =>
      axios.post("/api/users", { user }).then(res => res.data.user),
    confirm: token =>
      axios
        .post("/api/auth/confirmation", { token })
        .then(res => res.data.user),
    resetPasswordRequest: email =>
      axios.post("/api/auth/reset_password_request", { email }),
    validateToken: token => axios.post("/api/auth/validate_token", { token }),
    resetPassword: data => axios.post("/api/auth/reset_password", { data })
  },
  subjects: {
    create: subject =>
      axios.post("/api/subjects", { subject }).then(res => res.data.subject),
    fetchAll: () => axios.get("/api/subjects").then(res => res.data.subjects),
    fetchById: _id =>
      axios.get(`/api/subjects?_id=${_id}`).then(res => res.data.subject),
    delete: _id =>
      axios.delete(`/api/subjects?_id=${_id}`).then(res => res.data)
  },
  subjectData: {
    create: data =>
      axios
        .post("/api/subjects/data", { ...data })
        .then(res => res.data.subjectData),
    fetchByTabId: tabId =>
      axios
        .get(`/api/subjects/data?tabId=${tabId}`)
        .then(res => res.data.subjectData),
    fetchById: _id =>
      axios
        .get(`/api/subjects/data?_id=${_id}`)
        .then(res => res.data.subjectData),
    edit: data =>
      axios
        .put("/api/subjects/data", { ...data })
        .then(res => res.data.subjectData),
    delete: _id =>
      axios.delete(`/api/subjects/data?_id=${_id}`).then(res => res.data),
    search: query =>
      axios
        .get(`/api/subjects/data?query=${query}`)
        .then(res => res.data.subjectData)
  }
};
