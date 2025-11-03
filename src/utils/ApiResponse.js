export const successResponse = (res, message, data = {}, code = 200) => {
  return res.status(code).json({ success: true, message, data });
};

export const errorResponse = (res, message, code = 500) => {
  return res.status(code).json({ success: false, message });
};
