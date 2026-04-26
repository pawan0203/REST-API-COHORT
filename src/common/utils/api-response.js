class ApiResponse {
  static ok(res, messege, data = null) {
    return res.status(200).json({
      success: true,
      messege,
      data,
    });
  }
  static created(res, messege, data = null) {
    return res.status(201).json({
      success: true,
      messege,
      data,
    });
  }
  static nocontent(res, messege, data = null) {
    return res.status(204).json({
      success: true,
      messege,
      data,
    });
  }
}

export default ApiResponse