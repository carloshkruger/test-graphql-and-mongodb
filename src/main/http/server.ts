import { mongoHelper } from "@infra/mongodb/utils/MongoHelper";

(async () => {
  try {
    await mongoHelper.connect();

    const { app } = await import("./app");

    app.listen(3333, () => console.log("Server online"));
  } catch (error) {
    console.error(error);
  }
})();
