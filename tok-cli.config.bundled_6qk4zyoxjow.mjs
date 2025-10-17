// tok-cli.config.ts
import { commit } from "@toktokhan-dev/cli-plugin-commit";
import { genApi } from "@toktokhan-dev/cli-plugin-gen-api-react-query";
import { genIcon } from "@toktokhan-dev/cli-plugin-gen-icon-chakra";
import { genImg } from "@toktokhan-dev/cli-plugin-gen-img";
import { genRoutePage } from "@toktokhan-dev/cli-plugin-gen-route-pages";
import { genSitemap } from "@toktokhan-dev/cli-plugin-gen-sitemap-next-page";
import { genSource } from "@toktokhan-dev/cli-plugin-gen-source";
import { genTheme } from "@toktokhan-dev/cli-plugin-gen-theme-chakra";
var config = {
  plugins: [
    genImg,
    genRoutePage,
    genApi,
    genTheme,
    genIcon,
    genSource,
    commit,
    genSitemap
  ],
  "gen:img": {
    input: "public/images",
    oneDepth: true,
    basePath: "/images"
  },
  "gen:route": {
    oneDepth: true
  },
  "gen:api": {
    swaggerSchemaUrl: "https://api.piwoom.com/openapi.json/"
  },
  "gen:theme": {
    tokenModes: {
      colors: {
        light: "light",
        dark: "dark"
      },
      textStyles: {
        base: "mobile",
        sm: "tablet",
        md: "desktop"
      }
    }
  },
  "gen:icon": {
    input: "public/icons"
  },
  "gen:source": {
    appName: "toktokhan-dev"
  },
  "gen:sitemap": {
    domain: "https://piwoom.com",
    input: "./src/pages",
    output: "public/sitemap.json",
    ignored: [
      "**/api/**",
      "**/_app.{ts,tsx}",
      "**/_document.{ts,tsx}",
      "**/_error.{ts,tsx}"
    ],
    routeMapper: {
      "/goods/[id]": [
        "/goods/0",
        "/goods/1",
        "/goods/2",
        "/goods/3",
        ..."/goods/99"
      ]
    }
  }
};
var tok_cli_config_default = config;
export {
  tok_cli_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidG9rLWNsaS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9faW5qZWN0ZWRfZmlsZW5hbWVfXyA9IFwiL1VzZXJzL3Rva3Rva2hhbi9Eb3dubG9hZHMvdG9rdG9rL3Bpd29vbS1uZXh0L3Rvay1jbGkuY29uZmlnLnRzXCI7Y29uc3QgX19pbmplY3RlZF9kaXJuYW1lX18gPSBcIi9Vc2Vycy90b2t0b2toYW4vRG93bmxvYWRzL3Rva3Rvay9waXdvb20tbmV4dFwiO2NvbnN0IF9faW5qZWN0ZWRfaW1wb3J0X21ldGFfdXJsX18gPSBcImZpbGU6Ly8vVXNlcnMvdG9rdG9raGFuL0Rvd25sb2Fkcy90b2t0b2svcGl3b29tLW5leHQvdG9rLWNsaS5jb25maWcudHNcIjtpbXBvcnQgeyBSb290Q29uZmlnIH0gZnJvbSAnQHRva3Rva2hhbi1kZXYvY2xpJ1xuaW1wb3J0IHsgY29tbWl0IH0gZnJvbSAnQHRva3Rva2hhbi1kZXYvY2xpLXBsdWdpbi1jb21taXQnXG5pbXBvcnQgeyBnZW5BcGkgfSBmcm9tICdAdG9rdG9raGFuLWRldi9jbGktcGx1Z2luLWdlbi1hcGktcmVhY3QtcXVlcnknXG5pbXBvcnQgeyBnZW5JY29uIH0gZnJvbSAnQHRva3Rva2hhbi1kZXYvY2xpLXBsdWdpbi1nZW4taWNvbi1jaGFrcmEnXG5pbXBvcnQgeyBnZW5JbWcgfSBmcm9tICdAdG9rdG9raGFuLWRldi9jbGktcGx1Z2luLWdlbi1pbWcnXG5pbXBvcnQgeyBnZW5Sb3V0ZVBhZ2UgfSBmcm9tICdAdG9rdG9raGFuLWRldi9jbGktcGx1Z2luLWdlbi1yb3V0ZS1wYWdlcydcbmltcG9ydCB7IGdlblNpdGVtYXAgfSBmcm9tICdAdG9rdG9raGFuLWRldi9jbGktcGx1Z2luLWdlbi1zaXRlbWFwLW5leHQtcGFnZSdcbmltcG9ydCB7IGdlblNvdXJjZSB9IGZyb20gJ0B0b2t0b2toYW4tZGV2L2NsaS1wbHVnaW4tZ2VuLXNvdXJjZSdcbmltcG9ydCB7IGdlblRoZW1lIH0gZnJvbSAnQHRva3Rva2hhbi1kZXYvY2xpLXBsdWdpbi1nZW4tdGhlbWUtY2hha3JhJ1xuXG5jb25zdCBjb25maWc6IFJvb3RDb25maWc8e1xuICBwbHVnaW5zOiBbXG4gICAgdHlwZW9mIGdlbkltZyxcbiAgICB0eXBlb2YgZ2VuUm91dGVQYWdlLFxuICAgIHR5cGVvZiBnZW5BcGksXG4gICAgdHlwZW9mIGdlblRoZW1lLFxuICAgIHR5cGVvZiBnZW5JY29uLFxuICAgIHR5cGVvZiBnZW5Tb3VyY2UsXG4gICAgdHlwZW9mIGNvbW1pdCxcbiAgICB0eXBlb2YgZ2VuU2l0ZW1hcCxcbiAgXVxufT4gPSB7XG4gIHBsdWdpbnM6IFtcbiAgICBnZW5JbWcsXG4gICAgZ2VuUm91dGVQYWdlLFxuICAgIGdlbkFwaSxcbiAgICBnZW5UaGVtZSxcbiAgICBnZW5JY29uLFxuICAgIGdlblNvdXJjZSxcbiAgICBjb21taXQsXG4gICAgZ2VuU2l0ZW1hcCxcbiAgXSxcbiAgJ2dlbjppbWcnOiB7XG4gICAgaW5wdXQ6ICdwdWJsaWMvaW1hZ2VzJyxcbiAgICBvbmVEZXB0aDogdHJ1ZSxcbiAgICBiYXNlUGF0aDogJy9pbWFnZXMnLFxuICB9LFxuICAnZ2VuOnJvdXRlJzoge1xuICAgIG9uZURlcHRoOiB0cnVlLFxuICB9LFxuICAnZ2VuOmFwaSc6IHtcbiAgICBzd2FnZ2VyU2NoZW1hVXJsOiAnaHR0cHM6Ly9hcGkucGl3b29tLmNvbS9vcGVuYXBpLmpzb24vJyxcbiAgfSxcbiAgJ2dlbjp0aGVtZSc6IHtcbiAgICB0b2tlbk1vZGVzOiB7XG4gICAgICBjb2xvcnM6IHtcbiAgICAgICAgbGlnaHQ6ICdsaWdodCcsXG4gICAgICAgIGRhcms6ICdkYXJrJyxcbiAgICAgIH0sXG4gICAgICB0ZXh0U3R5bGVzOiB7XG4gICAgICAgIGJhc2U6ICdtb2JpbGUnLFxuICAgICAgICBzbTogJ3RhYmxldCcsXG4gICAgICAgIG1kOiAnZGVza3RvcCcsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gICdnZW46aWNvbic6IHtcbiAgICBpbnB1dDogJ3B1YmxpYy9pY29ucycsXG4gIH0sXG4gICdnZW46c291cmNlJzoge1xuICAgIGFwcE5hbWU6ICd0b2t0b2toYW4tZGV2JyxcbiAgfSxcbiAgJ2dlbjpzaXRlbWFwJzoge1xuICAgIGRvbWFpbjogJ2h0dHBzOi8vcGl3b29tLmNvbScsXG4gICAgaW5wdXQ6ICcuL3NyYy9wYWdlcycsXG4gICAgb3V0cHV0OiAncHVibGljL3NpdGVtYXAuanNvbicsXG4gICAgaWdub3JlZDogW1xuICAgICAgJyoqL2FwaS8qKicsXG4gICAgICAnKiovX2FwcC57dHMsdHN4fScsXG4gICAgICAnKiovX2RvY3VtZW50Lnt0cyx0c3h9JyxcbiAgICAgICcqKi9fZXJyb3Iue3RzLHRzeH0nLFxuICAgIF0sXG4gICAgcm91dGVNYXBwZXI6IHtcbiAgICAgICcvZ29vZHMvW2lkXSc6IFtcbiAgICAgICAgJy9nb29kcy8wJyxcbiAgICAgICAgJy9nb29kcy8xJyxcbiAgICAgICAgJy9nb29kcy8yJyxcbiAgICAgICAgJy9nb29kcy8zJyxcbiAgICAgICAgLi4uJy9nb29kcy85OScsXG4gICAgICBdLFxuICAgIH0sXG4gIH0sXG59XG5leHBvcnQgZGVmYXVsdCBjb25maWdcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFDQSxTQUFTLGNBQWM7QUFDdkIsU0FBUyxjQUFjO0FBQ3ZCLFNBQVMsZUFBZTtBQUN4QixTQUFTLGNBQWM7QUFDdkIsU0FBUyxvQkFBb0I7QUFDN0IsU0FBUyxrQkFBa0I7QUFDM0IsU0FBUyxpQkFBaUI7QUFDMUIsU0FBUyxnQkFBZ0I7QUFFekIsSUFBTSxTQVdEO0FBQUEsRUFDSCxTQUFTO0FBQUEsSUFDUDtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBQUEsRUFDQSxXQUFXO0FBQUEsSUFDVCxPQUFPO0FBQUEsSUFDUCxVQUFVO0FBQUEsSUFDVixVQUFVO0FBQUEsRUFDWjtBQUFBLEVBQ0EsYUFBYTtBQUFBLElBQ1gsVUFBVTtBQUFBLEVBQ1o7QUFBQSxFQUNBLFdBQVc7QUFBQSxJQUNULGtCQUFrQjtBQUFBLEVBQ3BCO0FBQUEsRUFDQSxhQUFhO0FBQUEsSUFDWCxZQUFZO0FBQUEsTUFDVixRQUFRO0FBQUEsUUFDTixPQUFPO0FBQUEsUUFDUCxNQUFNO0FBQUEsTUFDUjtBQUFBLE1BQ0EsWUFBWTtBQUFBLFFBQ1YsTUFBTTtBQUFBLFFBQ04sSUFBSTtBQUFBLFFBQ0osSUFBSTtBQUFBLE1BQ047QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsWUFBWTtBQUFBLElBQ1YsT0FBTztBQUFBLEVBQ1Q7QUFBQSxFQUNBLGNBQWM7QUFBQSxJQUNaLFNBQVM7QUFBQSxFQUNYO0FBQUEsRUFDQSxlQUFlO0FBQUEsSUFDYixRQUFRO0FBQUEsSUFDUixPQUFPO0FBQUEsSUFDUCxRQUFRO0FBQUEsSUFDUixTQUFTO0FBQUEsTUFDUDtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxJQUNBLGFBQWE7QUFBQSxNQUNYLGVBQWU7QUFBQSxRQUNiO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQSxHQUFHO0FBQUEsTUFDTDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0Y7QUFDQSxJQUFPLHlCQUFROyIsCiAgIm5hbWVzIjogW10KfQo=
