import path from "path";

export default defineConfig({
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      }
    }
  })

function defineConfig(arg0: { resolve: { alias: { '@': any; }; }; }) {
    throw new Error("Function not implemented.");
}
