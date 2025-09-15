import express, {} from "express";
const app = express();
import serverRouter from "./routes/server.route.js";
import promptsRouter from "./routes/prompts.route.js";
// Middleware
app.use(express.json());
// Use Router
app.use("/api", serverRouter);
app.use("/api/prompts", promptsRouter);
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
});
export default app;
//# sourceMappingURL=app.js.map