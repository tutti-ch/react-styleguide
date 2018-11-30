const path = require("path");

module.exports = {
  styleguideDir: "docs",

  // template: "src/templates/index.html",

  // @see https://react-styleguidist.js.org/docs/components.html#sections
  //
  // You can group components into sections or add extra Markdown documents
  // to your style guide. Each section consists of (all fields are optional):
  // -- name: section title
  // -- content: A glob pattern string or a function returning a list of components.
  //             The same rule apply as for the root components option.
  // -- sections: Array of subsections (can be nested)

  template: {
    favicon: "./favicon.ico"
  },

  sections: [
    {
      name: "💗  Brand",
      components: "src/brand/**/[A-Z]*.js"
    },
    {
      name: "🎨  UI Styles",
      components: "src/styles/**/[A-Z]*.js"
    },
    {
      name: "📐  UI Components",
      components: "src/components/**/[A-Z]*.js"
    }
  ],

  theme: {
    color: {
      link: "#0099e5",
      linkHover: "#005b89"
    },
    fontFamily: {
      base: "'Roboto-Light',sans-serif"
    }
  },

  styles: {
    StyleGuide: {
      content: {
        margin: "0",
        "max-width": "none",
        padding: "16px 32px"
      },
      sidebar: {
        background: "#ffffff",
        width: "250px"
      },
      logo: {
        padding: "20px"
      },
      hasSidebar: {
        "padding-left": "250px"
      },

      ReactComponent: {
        root: {
          "margin-bottom": "0 !important"
        }
      }
    },
    Logo: {
      logo: {
        background:
          "url('data:image/png;base64,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') no-repeat",
        "background-size": "100%",
        color: "transparent",
        height: "62px"
      }
    },
    ReactComponent: {
      root: {
        position: "relative",
        "margin-bottom": "30px",
        "padding-bottom": "30px",
        "min-height": "100vh"
      }
    },
    TabButton: {
      button: {
        position: "absolute",
        top: "95px",
        right: "0",
        "text-transform": "capitalize"
      },
      "rsg-usage": {
        top: "0"
      }
    },
    ToolbarButton: {
      button: {
        display: "none"
      }
    },
    Pathline: {
      pathline: {
        display: "none"
      }
    },
    Table: {
      table: {
        position: "absolute",
        "box-shadow": "0 5px 5px rgba(0, 0, 0, 0.1)",
        "background-color": "#ffffff",
        "max-width": "800px",
        right: "0",
        top: "145px",
        "z-index": "99999",
        "box-sizing": "border-box",
        display: "block",
        padding: "20px",
        border: "1px solid #e5e5e5"
      }
    },
    Heading: {
      heading: {
        "margin-top": "0 !important"
      },
      heading2: {
        "font-weight": "bold"
      },
      heading1: {
        "font-weight": "bold"
      }
    },
    ComponentsList: {
      list: {
        "padding-left": " 16px !important"
      },
      isChild: {
        "padding-left": " 8px !important"
      }
    }
  },

  require: [
    // Include our main scss file.
    path.join(__dirname, "src/styles/Typography/fonts/_Roboto.scss"),
    path.join(__dirname, "src/index.scss"),
    path.join(__dirname, "src/normalize.scss")
  ]
};
