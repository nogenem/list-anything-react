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
    fetchAll: () => axios.get("/api/subjects").then(res => res.data.subjects),
    create: subject =>
      axios.post("/api/subjects", { subject }).then(res => res.data.subject),
    createSubjectData: data =>
      axios
        .post("/api/subjects/data", { ...data })
        .then(res => res.data.subjectData),
    fetchSubject: _id =>
      axios.get(`/api/subjects?_id=${_id}`).then(res => res.data.subject),
    fetchSubjectData: _id =>
      axios
        .get(`/api/subjects/data?tabId=${_id}`)
        .then(res => res.data.subjectData)
  }
};
