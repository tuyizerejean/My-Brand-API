export const welcome = (req, res, next) => {
  return res
    .status(200)
    .json({ status: 200, message: "Welcome to my api", data: "" });
};
