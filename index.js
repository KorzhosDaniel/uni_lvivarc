express = require("express");
app = express();

// app.use(express.static("static"));
app.use(
  "/static",
  express.static(__dirname + "/static", {
    // Add debug options
    setHeaders: (res, path) => {
      console.log("Serving static file:", path);
    },
  }),
);

path = __dirname + "/templates/";
views = require("./views");

app.set("view engine", "ejs");
app.set("views", path);

app.get("/", views.main);

app.get("/obj/:id/", views.arcObject);
app.get("/list/:id/", views.listObjects);

app.use("*", views.error404);

port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server started running on port " + port);
});
