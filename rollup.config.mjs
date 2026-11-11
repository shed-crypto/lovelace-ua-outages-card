import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/index.ts",
  output: {
    file: "dist/ua-outages-card.js",
    format: "es",
    inlineDynamicImports: true,
  },
  plugins: [
    resolve({
      browser: true,
    }),
    typescript({
      tsconfig: "./tsconfig.json",
      include: ["src/**/*.ts"],
      exclude: ["tests/**/*.ts"],
    }),
    terser({
      format: {
        comments: false,
      },
    }),
  ],
};
