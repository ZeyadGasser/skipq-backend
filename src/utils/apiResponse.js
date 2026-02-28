export class ApiResponse {
  static success(
    res,
    status = "",
    message = "Success",
    data = {},
    statusCode = 200,
  ) {
    return res.status(statusCode).json({
      status,
      message,
      data,
    });
  }

  static error(res, status = "", message = "Error", statusCode = 500) {
    return res.status(statusCode).json({
      status,
      message,
    });
  }
}
