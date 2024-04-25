function status(request, response) {
  response.status(200).json({ status: "ok" });
}

export default status;
