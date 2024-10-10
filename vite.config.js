/// <reference types="vitest" />
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { defineConfig, loadEnv } from "vite";
import svgr from "vite-plugin-svgr";
var indexZero = 0;
var indexOne = 1;
var config = function (_a) {
    var mode = _a.mode;
    var env = loadEnv(mode, process.cwd());
    var VITE_BASE_URL = env.VITE_BASE_URL;
    return defineConfig({
        build: {
            outDir: "dist",
            rollupOptions: {
                output: {
                    manualChunks: function (id) {
                        if (id.includes("node_modules")) {
                            return id
                                .toString()
                                .split("node_modules/")[indexOne].split("/")[indexZero].toString();
                        }
                    },
                },
            },
        },
        plugins: [react(), svgr()],
        resolve: {
            alias: [
                {
                    find: "~",
                    replacement: fileURLToPath(new URL("src", import.meta.url)),
                },
            ],
        },
        server: {
            host: true,
            port: Number(VITE_BASE_URL),
        },
    });
};
export default config;
