import http from "../http-common";

class OwnerDataService {
  getAll() {
    return http.get("/homeowner");
  }

  get(id) {
    return http.get(`/homeowner/${id}`);
  }

  create(data) {
    return http.post("/homeowner", data);
  }

  update(id, data) {
    return http.put(`/homeowner/${id}`, data);
  }

  delete(id) {
    return http.delete(`/homeowner/${id}`);
  }

  deleteAll() {
    return http.delete(`/homeowner`);
  }

  findByAddress(address) {
    return http.get(`/homeowner?address=${address}`);
  }
}

export default new OwnerDataService();
