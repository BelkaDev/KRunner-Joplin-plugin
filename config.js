module.exports = {
  runner: {
    show: "10",
    order_by: "created_time",  // title, created_time, updated_time...
    order_dir: "ASC", //ASC, DESC
    prefix: "note",
    joplinPath: "" // Path to run Joplin, either a command or an AppImage
  },
  webClipper: {
    port: "41184",
    token: ""
  },
  sendAction: {
    port: "42420"
  }
};
