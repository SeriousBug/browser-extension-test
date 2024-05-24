// vite.config.ts
import react from "file:///home/kaan/Projects/browser-extension-test/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { resolve } from "path";
import fs from "fs";
import { defineConfig } from "file:///home/kaan/Projects/browser-extension-test/node_modules/vite/dist/node/index.js";
import { crx } from "file:///home/kaan/Projects/browser-extension-test/node_modules/@crxjs/vite-plugin/dist/index.mjs";

// manifest.json
var manifest_default = {
  manifest_version: 3,
  name: "Browser Extension Test",
  description: "I am just testing out browser extensions right now",
  options_ui: {
    page: "src/pages/options/index.html"
  },
  background: {
    service_worker: "src/pages/background/index.ts",
    type: "module"
  },
  action: {
    default_popup: "src/pages/popup/index.html",
    default_icon: {
      "32": "icon-32.png"
    }
  },
  icons: {
    "128": "icon-128.png"
  },
  permissions: ["activeTab"],
  content_scripts: [
    {
      matches: ["http://*/*", "https://*/*", "<all_urls>"],
      js: ["src/pages/content/index.tsx"],
      css: []
    }
  ],
  web_accessible_resources: [
    {
      resources: ["contentStyle.css", "icon-128.png", "icon-32.png"],
      matches: []
    }
  ]
};

// manifest.dev.json
var manifest_dev_default = {
  action: {
    default_icon: "public/dev-icon-32.png",
    default_popup: "src/pages/popup/index.html"
  },
  icons: {
    "128": "public/dev-icon-128.png"
  },
  web_accessible_resources: [
    {
      resources: [
        "contentStyle.css",
        "dev-icon-128.png",
        "dev-icon-32.png"
      ],
      matches: []
    }
  ]
};

// package.json
var package_default = {
  name: "vite-web-extension",
  version: "1.2.0",
  description: "A simple chrome extension template with Vite, React, TypeScript and Tailwind CSS.",
  license: "MIT",
  repository: {
    type: "git",
    url: "https://github.com/JohnBra/web-extension.git"
  },
  scripts: {
    build: "vite build",
    dev: "nodemon"
  },
  type: "module",
  dependencies: {
    lodash: "^4.17.21",
    react: "^18.3.1",
    "react-dom": "^18.3.1",
    "webextension-polyfill": "^0.11.0"
  },
  devDependencies: {
    "@crxjs/vite-plugin": "^2.0.0-beta.23",
    "@types/chrome": "^0.0.268",
    "@types/lodash": "^4.17.4",
    "@types/node": "^20.12.11",
    "@types/react": "^18.3.1",
    "@types/react-dom": "^18.3.0",
    "@types/webextension-polyfill": "^0.10.7",
    "@typescript-eslint/eslint-plugin": "^7.8.0",
    "@typescript-eslint/parser": "^7.8.0",
    "@vitejs/plugin-react": "^4.2.1",
    autoprefixer: "^10.4.19",
    eslint: "^8.57.0",
    "eslint-config-prettier": "^9.1.0",
    "eslint-plugin-import": "^2.29.1",
    "eslint-plugin-jsx-a11y": "^6.8.0",
    "eslint-plugin-react": "^7.34.1",
    "eslint-plugin-react-hooks": "^4.6.2",
    "fs-extra": "^11.2.0",
    nodemon: "^3.1.0",
    postcss: "^8.4.38",
    tailwindcss: "^3.4.3",
    "ts-node": "^10.9.2",
    typescript: "^5.4.5",
    vite: "^5.2.11"
  }
};

// vite.config.ts
var __vite_injected_original_dirname = "/home/kaan/Projects/browser-extension-test";
var root = resolve(__vite_injected_original_dirname, "src");
var pagesDir = resolve(root, "pages");
var assetsDir = resolve(root, "assets");
var outDir = resolve(__vite_injected_original_dirname, "dist");
var publicDir = resolve(__vite_injected_original_dirname, "public");
var isDev = process.env.__DEV__ === "true";
var extensionManifest = {
  ...manifest_default,
  ...isDev ? manifest_dev_default : {},
  name: isDev ? `DEV: ${manifest_default.name}` : manifest_default.name,
  version: package_default.version
};
function stripDevIcons(apply) {
  if (apply)
    return null;
  return {
    name: "strip-dev-icons",
    resolveId(source) {
      return source === "virtual-module" ? source : null;
    },
    renderStart(outputOptions, inputOptions) {
      const outDir2 = outputOptions.dir;
      fs.rm(
        resolve(outDir2, "dev-icon-32.png"),
        () => console.log(`Deleted dev-icon-32.png frm prod build`)
      );
      fs.rm(
        resolve(outDir2, "dev-icon-128.png"),
        () => console.log(`Deleted dev-icon-128.png frm prod build`)
      );
    }
  };
}
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      "@src": root,
      "@assets": assetsDir,
      "@pages": pagesDir
    }
  },
  plugins: [
    react(),
    crx({
      manifest: extensionManifest,
      contentScripts: {
        injectCss: false
      }
    }),
    stripDevIcons(isDev)
  ],
  publicDir,
  build: {
    outDir,
    sourcemap: isDev,
    emptyOutDir: !isDev
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAibWFuaWZlc3QuanNvbiIsICJtYW5pZmVzdC5kZXYuanNvbiIsICJwYWNrYWdlLmpzb24iXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9rYWFuL1Byb2plY3RzL2Jyb3dzZXItZXh0ZW5zaW9uLXRlc3RcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9ob21lL2thYW4vUHJvamVjdHMvYnJvd3Nlci1leHRlbnNpb24tdGVzdC92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vaG9tZS9rYWFuL1Byb2plY3RzL2Jyb3dzZXItZXh0ZW5zaW9uLXRlc3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCI7XG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSBcInBhdGhcIjtcbmltcG9ydCBmcyBmcm9tIFwiZnNcIjtcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgeyBjcngsIE1hbmlmZXN0VjNFeHBvcnQgfSBmcm9tIFwiQGNyeGpzL3ZpdGUtcGx1Z2luXCI7XG5cbmltcG9ydCBtYW5pZmVzdCBmcm9tIFwiLi9tYW5pZmVzdC5qc29uXCI7XG5pbXBvcnQgZGV2TWFuaWZlc3QgZnJvbSBcIi4vbWFuaWZlc3QuZGV2Lmpzb25cIjtcbmltcG9ydCBwa2cgZnJvbSBcIi4vcGFja2FnZS5qc29uXCI7XG5cbmNvbnN0IHJvb3QgPSByZXNvbHZlKF9fZGlybmFtZSwgXCJzcmNcIik7XG5jb25zdCBwYWdlc0RpciA9IHJlc29sdmUocm9vdCwgXCJwYWdlc1wiKTtcbmNvbnN0IGFzc2V0c0RpciA9IHJlc29sdmUocm9vdCwgXCJhc3NldHNcIik7XG5jb25zdCBvdXREaXIgPSByZXNvbHZlKF9fZGlybmFtZSwgXCJkaXN0XCIpO1xuY29uc3QgcHVibGljRGlyID0gcmVzb2x2ZShfX2Rpcm5hbWUsIFwicHVibGljXCIpO1xuXG5jb25zdCBpc0RldiA9IHByb2Nlc3MuZW52Ll9fREVWX18gPT09IFwidHJ1ZVwiO1xuXG5jb25zdCBleHRlbnNpb25NYW5pZmVzdCA9IHtcbiAgLi4ubWFuaWZlc3QsXG4gIC4uLihpc0RldiA/IGRldk1hbmlmZXN0IDogKHt9IGFzIE1hbmlmZXN0VjNFeHBvcnQpKSxcbiAgbmFtZTogaXNEZXYgPyBgREVWOiAke21hbmlmZXN0Lm5hbWV9YCA6IG1hbmlmZXN0Lm5hbWUsXG4gIHZlcnNpb246IHBrZy52ZXJzaW9uLFxufTtcblxuLy8gcGx1Z2luIHRvIHJlbW92ZSBkZXYgaWNvbnMgZnJvbSBwcm9kIGJ1aWxkXG5mdW5jdGlvbiBzdHJpcERldkljb25zKGFwcGx5OiBib29sZWFuKSB7XG4gIGlmIChhcHBseSkgcmV0dXJuIG51bGw7XG5cbiAgcmV0dXJuIHtcbiAgICBuYW1lOiBcInN0cmlwLWRldi1pY29uc1wiLFxuICAgIHJlc29sdmVJZChzb3VyY2U6IHN0cmluZykge1xuICAgICAgcmV0dXJuIHNvdXJjZSA9PT0gXCJ2aXJ0dWFsLW1vZHVsZVwiID8gc291cmNlIDogbnVsbDtcbiAgICB9LFxuICAgIHJlbmRlclN0YXJ0KG91dHB1dE9wdGlvbnM6IGFueSwgaW5wdXRPcHRpb25zOiBhbnkpIHtcbiAgICAgIGNvbnN0IG91dERpciA9IG91dHB1dE9wdGlvbnMuZGlyO1xuICAgICAgZnMucm0ocmVzb2x2ZShvdXREaXIsIFwiZGV2LWljb24tMzIucG5nXCIpLCAoKSA9PlxuICAgICAgICBjb25zb2xlLmxvZyhgRGVsZXRlZCBkZXYtaWNvbi0zMi5wbmcgZnJtIHByb2QgYnVpbGRgKSxcbiAgICAgICk7XG4gICAgICBmcy5ybShyZXNvbHZlKG91dERpciwgXCJkZXYtaWNvbi0xMjgucG5nXCIpLCAoKSA9PlxuICAgICAgICBjb25zb2xlLmxvZyhgRGVsZXRlZCBkZXYtaWNvbi0xMjgucG5nIGZybSBwcm9kIGJ1aWxkYCksXG4gICAgICApO1xuICAgIH0sXG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgXCJAc3JjXCI6IHJvb3QsXG4gICAgICBcIkBhc3NldHNcIjogYXNzZXRzRGlyLFxuICAgICAgXCJAcGFnZXNcIjogcGFnZXNEaXIsXG4gICAgfSxcbiAgfSxcbiAgcGx1Z2luczogW1xuICAgIHJlYWN0KCksXG4gICAgY3J4KHtcbiAgICAgIG1hbmlmZXN0OiBleHRlbnNpb25NYW5pZmVzdCBhcyBNYW5pZmVzdFYzRXhwb3J0LFxuICAgICAgY29udGVudFNjcmlwdHM6IHtcbiAgICAgICAgaW5qZWN0Q3NzOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgfSksXG4gICAgc3RyaXBEZXZJY29ucyhpc0RldiksXG4gIF0sXG4gIHB1YmxpY0RpcixcbiAgYnVpbGQ6IHtcbiAgICBvdXREaXIsXG4gICAgc291cmNlbWFwOiBpc0RldixcbiAgICBlbXB0eU91dERpcjogIWlzRGV2LFxuICB9LFxufSk7XG4iLCAie1xuICBcIm1hbmlmZXN0X3ZlcnNpb25cIjogMyxcbiAgXCJuYW1lXCI6IFwiQnJvd3NlciBFeHRlbnNpb24gVGVzdFwiLFxuICBcImRlc2NyaXB0aW9uXCI6IFwiSSBhbSBqdXN0IHRlc3Rpbmcgb3V0IGJyb3dzZXIgZXh0ZW5zaW9ucyByaWdodCBub3dcIixcbiAgXCJvcHRpb25zX3VpXCI6IHtcbiAgICBcInBhZ2VcIjogXCJzcmMvcGFnZXMvb3B0aW9ucy9pbmRleC5odG1sXCJcbiAgfSxcbiAgXCJiYWNrZ3JvdW5kXCI6IHtcbiAgICBcInNlcnZpY2Vfd29ya2VyXCI6IFwic3JjL3BhZ2VzL2JhY2tncm91bmQvaW5kZXgudHNcIixcbiAgICBcInR5cGVcIjogXCJtb2R1bGVcIlxuICB9LFxuICBcImFjdGlvblwiOiB7XG4gICAgXCJkZWZhdWx0X3BvcHVwXCI6IFwic3JjL3BhZ2VzL3BvcHVwL2luZGV4Lmh0bWxcIixcbiAgICBcImRlZmF1bHRfaWNvblwiOiB7XG4gICAgICBcIjMyXCI6IFwiaWNvbi0zMi5wbmdcIlxuICAgIH1cbiAgfSxcbiAgXCJpY29uc1wiOiB7XG4gICAgXCIxMjhcIjogXCJpY29uLTEyOC5wbmdcIlxuICB9LFxuICBcInBlcm1pc3Npb25zXCI6IFtcImFjdGl2ZVRhYlwiXSxcbiAgXCJjb250ZW50X3NjcmlwdHNcIjogW1xuICAgIHtcbiAgICAgIFwibWF0Y2hlc1wiOiBbXCJodHRwOi8vKi8qXCIsIFwiaHR0cHM6Ly8qLypcIiwgXCI8YWxsX3VybHM+XCJdLFxuICAgICAgXCJqc1wiOiBbXCJzcmMvcGFnZXMvY29udGVudC9pbmRleC50c3hcIl0sXG4gICAgICBcImNzc1wiOiBbXVxuICAgIH1cbiAgXSxcbiAgXCJ3ZWJfYWNjZXNzaWJsZV9yZXNvdXJjZXNcIjogW1xuICAgIHtcbiAgICAgIFwicmVzb3VyY2VzXCI6IFtcImNvbnRlbnRTdHlsZS5jc3NcIiwgXCJpY29uLTEyOC5wbmdcIiwgXCJpY29uLTMyLnBuZ1wiXSxcbiAgICAgIFwibWF0Y2hlc1wiOiBbXVxuICAgIH1cbiAgXVxufVxuIiwgIntcbiAgXCJhY3Rpb25cIjoge1xuICAgIFwiZGVmYXVsdF9pY29uXCI6IFwicHVibGljL2Rldi1pY29uLTMyLnBuZ1wiLFxuICAgIFwiZGVmYXVsdF9wb3B1cFwiOiBcInNyYy9wYWdlcy9wb3B1cC9pbmRleC5odG1sXCJcbiAgfSxcbiAgXCJpY29uc1wiOiB7XG4gICAgXCIxMjhcIjogXCJwdWJsaWMvZGV2LWljb24tMTI4LnBuZ1wiXG4gIH0sXG4gIFwid2ViX2FjY2Vzc2libGVfcmVzb3VyY2VzXCI6IFtcbiAgICB7XG4gICAgICBcInJlc291cmNlc1wiOiBbXG4gICAgICAgIFwiY29udGVudFN0eWxlLmNzc1wiLFxuICAgICAgICBcImRldi1pY29uLTEyOC5wbmdcIixcbiAgICAgICAgXCJkZXYtaWNvbi0zMi5wbmdcIlxuICAgICAgXSxcbiAgICAgIFwibWF0Y2hlc1wiOiBbXVxuICAgIH1cbiAgXVxufVxuIiwgIntcbiAgXCJuYW1lXCI6IFwidml0ZS13ZWItZXh0ZW5zaW9uXCIsXG4gIFwidmVyc2lvblwiOiBcIjEuMi4wXCIsXG4gIFwiZGVzY3JpcHRpb25cIjogXCJBIHNpbXBsZSBjaHJvbWUgZXh0ZW5zaW9uIHRlbXBsYXRlIHdpdGggVml0ZSwgUmVhY3QsIFR5cGVTY3JpcHQgYW5kIFRhaWx3aW5kIENTUy5cIixcbiAgXCJsaWNlbnNlXCI6IFwiTUlUXCIsXG4gIFwicmVwb3NpdG9yeVwiOiB7XG4gICAgXCJ0eXBlXCI6IFwiZ2l0XCIsXG4gICAgXCJ1cmxcIjogXCJodHRwczovL2dpdGh1Yi5jb20vSm9obkJyYS93ZWItZXh0ZW5zaW9uLmdpdFwiXG4gIH0sXG4gIFwic2NyaXB0c1wiOiB7XG4gICAgXCJidWlsZFwiOiBcInZpdGUgYnVpbGRcIixcbiAgICBcImRldlwiOiBcIm5vZGVtb25cIlxuICB9LFxuICBcInR5cGVcIjogXCJtb2R1bGVcIixcbiAgXCJkZXBlbmRlbmNpZXNcIjoge1xuICAgIFwibG9kYXNoXCI6IFwiXjQuMTcuMjFcIixcbiAgICBcInJlYWN0XCI6IFwiXjE4LjMuMVwiLFxuICAgIFwicmVhY3QtZG9tXCI6IFwiXjE4LjMuMVwiLFxuICAgIFwid2ViZXh0ZW5zaW9uLXBvbHlmaWxsXCI6IFwiXjAuMTEuMFwiXG4gIH0sXG4gIFwiZGV2RGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcIkBjcnhqcy92aXRlLXBsdWdpblwiOiBcIl4yLjAuMC1iZXRhLjIzXCIsXG4gICAgXCJAdHlwZXMvY2hyb21lXCI6IFwiXjAuMC4yNjhcIixcbiAgICBcIkB0eXBlcy9sb2Rhc2hcIjogXCJeNC4xNy40XCIsXG4gICAgXCJAdHlwZXMvbm9kZVwiOiBcIl4yMC4xMi4xMVwiLFxuICAgIFwiQHR5cGVzL3JlYWN0XCI6IFwiXjE4LjMuMVwiLFxuICAgIFwiQHR5cGVzL3JlYWN0LWRvbVwiOiBcIl4xOC4zLjBcIixcbiAgICBcIkB0eXBlcy93ZWJleHRlbnNpb24tcG9seWZpbGxcIjogXCJeMC4xMC43XCIsXG4gICAgXCJAdHlwZXNjcmlwdC1lc2xpbnQvZXNsaW50LXBsdWdpblwiOiBcIl43LjguMFwiLFxuICAgIFwiQHR5cGVzY3JpcHQtZXNsaW50L3BhcnNlclwiOiBcIl43LjguMFwiLFxuICAgIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3RcIjogXCJeNC4yLjFcIixcbiAgICBcImF1dG9wcmVmaXhlclwiOiBcIl4xMC40LjE5XCIsXG4gICAgXCJlc2xpbnRcIjogXCJeOC41Ny4wXCIsXG4gICAgXCJlc2xpbnQtY29uZmlnLXByZXR0aWVyXCI6IFwiXjkuMS4wXCIsXG4gICAgXCJlc2xpbnQtcGx1Z2luLWltcG9ydFwiOiBcIl4yLjI5LjFcIixcbiAgICBcImVzbGludC1wbHVnaW4tanN4LWExMXlcIjogXCJeNi44LjBcIixcbiAgICBcImVzbGludC1wbHVnaW4tcmVhY3RcIjogXCJeNy4zNC4xXCIsXG4gICAgXCJlc2xpbnQtcGx1Z2luLXJlYWN0LWhvb2tzXCI6IFwiXjQuNi4yXCIsXG4gICAgXCJmcy1leHRyYVwiOiBcIl4xMS4yLjBcIixcbiAgICBcIm5vZGVtb25cIjogXCJeMy4xLjBcIixcbiAgICBcInBvc3Rjc3NcIjogXCJeOC40LjM4XCIsXG4gICAgXCJ0YWlsd2luZGNzc1wiOiBcIl4zLjQuM1wiLFxuICAgIFwidHMtbm9kZVwiOiBcIl4xMC45LjJcIixcbiAgICBcInR5cGVzY3JpcHRcIjogXCJeNS40LjVcIixcbiAgICBcInZpdGVcIjogXCJeNS4yLjExXCJcbiAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFnVCxPQUFPLFdBQVc7QUFDbFUsU0FBUyxlQUFlO0FBQ3hCLE9BQU8sUUFBUTtBQUNmLFNBQVMsb0JBQW9CO0FBQzdCLFNBQVMsV0FBNkI7OztBQ0p0QztBQUFBLEVBQ0Usa0JBQW9CO0FBQUEsRUFDcEIsTUFBUTtBQUFBLEVBQ1IsYUFB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
