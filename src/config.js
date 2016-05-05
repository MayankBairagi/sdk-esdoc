const config = {
    oauth_token: null,
    baseURL: 'http://localhost:8181',
    client_id: null,
};

module.exports = {
  get(key) {
    return config[key];
  },

  set(key, value) {
    if (value) {
      config[key] = value;
    }
  }
};
