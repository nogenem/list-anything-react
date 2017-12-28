export default err => {
  if (err.response.status === 500) return { global: "Internal server error" };
  return err.response.data.errors || { global: "Internal server error" };
};
