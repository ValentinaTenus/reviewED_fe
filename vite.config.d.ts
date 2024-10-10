import { ConfigEnv, defineConfig } from "vite";
declare const config: ({ mode, }: ConfigEnv) => ReturnType<typeof defineConfig>;
export default config;
