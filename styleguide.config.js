const webpack = require('webpack')
const path = require('path')
const glob = require('glob')
const extend = require('util')._extend
const loaders = require('loaders')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const globals = require('./styleguide/internal/globals')

const REACT_MYPAGES_SRC = 'node_modules/react-mypages/src'
const REACT_MYPAGES_HELPERS = REACT_MYPAGES_SRC + '/helpers'
const REACT_STYLEGUIDE_COMPONENTS = 'styleguide'

const ASSET_PATHS = [REACT_MYPAGES_SRC, REACT_STYLEGUIDE_COMPONENTS]
const dir = ASSET_PATHS.concat([REACT_MYPAGES_HELPERS]).map((_path) => path.resolve(__dirname, _path))

const utils_paths = function() {
  const resolve = path.resolve

  const base = function base() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key]
    }

    return resolve.apply(resolve, [path.resolve(__dirname, '.')].concat(args))
  }

  return {
    base: base,
    client: base.bind(null, REACT_MYPAGES_SRC),
    dist: base.bind(null, 'dist')
  }
}()

function getComponents(directory) {
  return function() {
    return glob.sync(path.resolve(__dirname, directory + '/components/**/*.js')).filter(function(module) {
      return /\/[A-Z]\w*\.js$/.test(module)
    })
  };
}

const extractStyles = new ExtractTextPlugin({
  filename: '[name].[contenthash].css',
  allChunks: true,
  disable: true
})

module.exports = {
  template: 'templates/index.html',
  title: 'tutti.ch Style Guide',
  theme: {
    color: {

    }
  },
  styles: {
    Logo: {
      logo: {
         'background-image': 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQ4AAAA9CAYAAABcKIcSAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAD%2B9JREFUeNrsXQuMVNUZ%2FhcWWWCF4bHKw2WHRwQLCYNdW43ozoqPxoqsTYsmEhlKk0Js7JDapk2tDKampo1haGlKUpUxtS3Fpi6Vmooos1WrDZidSTUgxWVWUUCWZWZ57Mpre%2F475y5379zHuc%2BZnfm%2F5GQfc%2B89Z87ju%2F%2F%2F%2Ff89t6q%2Fvx%2B8xspddwXYjwgriS23v5oFAoEwpDHMB9KIsR8ZVjawkmJ%2Ft1C3EwhDG1VeWRycIOKsNGh83MZKlFkfKRoCAoGIAwkjxAmjSeDw5zmBkPtCIFQicXAdA92S71s8NYdEw8gjRsNBIFQQcTDSiHLSGOfgMp2sRBiBJGlYCIQyJg5GGGH2IwHaOoZdtHECydDwEIqB7rnX4bzGm2GY3wzxpoY3tNiE%2FftoXtolDkYYQcjrGEv1jpkxuh5CE2%2BSfu%2FqOw4HelJw7IuTVqrZiANF%2BgfBZ9KIG7jb6FaHGXmkiDgsEAfXMZCJ1%2Bkdc%2FXI8bCkYTncPP2egs%2BOnzkMB06kINX1LuzPvQ%2BnL%2FaaVYkDheJpgqY0wQfSwLm9QWBOBhl5ZIk4xEgjwq0MTR2jdvgouGPqElg8cxmMGXEltB9Jwl8Obh6wMuaNvQ5Ck26E2RNCEAzMLThffbwKaU4gpH8QvCSOLIjpdBsZcUSJOMx1DCSMBXrHNE64AZbNWQ11Y66BTHY%2F%2FPXAZvigZ58puaAFcqL3KNRU1w6Qya6OrbC9c6ueNbKdE0imiJMrxP1deYKtZ5MoVsGLrWj9wepGS3SF%2FDert8qhrrFb8PA0qytUycRRbaJjxJQDo6VjLLt2Ncyd1Ahnzp%2BC59JPwZvHtfv%2BlrpmWDJ7uUQuMt45%2FCq89Mk2iVB%2B09wq%2Fe%2F2mQ%2FATfVfhx0HtsA%2Fj%2FxDfRnUVJaytq2HfAg36%2FMiwaS2BDiLHpUzafhVb4DfzFYU6asvqPSxrzbQMaJGE%2BLBmSulRW5mJaCLcs%2FM5RK5qHHvnFVw0zV3SVaHEmiN3D%2FvEel3DfIArrFEMJ3dL%2F2DTVZ01bYQXRS3PzhpJIu8eDuJOAp1DLQyTMOrMmnoWRloRTww6zuaIqkSaIEorRAZ6MZ8cqbD6FRs4xa5zV7qH2yyxsBAECbS8K1etIJbPSINK5GSZKXPgWGcMEKsJPlkEMrJQDETMWf8%2FILP7qtfBk8t%2BoMpaZgRyqNfiUtRGhNgavtu1v4Ed6%2B88KOJNAb3RzFII8QXtyeWBo%2BSbBQ8PE4WRx644CyJPc%2Ftj8MPRk2WyOHwqQ7JpVCKpFbx9sc7YOtHz0DDmCAsrm%2BBUSNqpf%2BPHo4%2FhfI%2FsP0Bl03iBBjkqlQoaawoQr1hbml4raWgZRk2IaeVlMehiKqI5GiogdbAz278vaRJYDRFK8xqhv1de2FHxwuaURhBuJ7rYdGPLvuoSjH7w4pb5CSqovquWhof6hpRVkcr3UKQOPbUJCSmbezNcAIJgklWqBJoZTx8%2Fc8HdAlZ6NQSQ9UaxssHX9CNwghiUHSlatvHeLcI9y%2BbHnMwcULc0hA1icuaOGyIka71h2BClqvEoWHpIDKUal7oqqyQyt5RfBFKBNIikr8hWQy59wd%2BTx97C%2F7Ykb85sMWseTyGbV%2Fv2AavffaySOaoHgY9z8IIIwiXQ8dtDkkjCRRuLXp%2FFMstUhFRkmaBvsXRrzLH0PoYMPtFnnx9ZN5PYOGUsGllJtmhIhj0BC0jDC2zso1ZHGEbE9Vujga2SeRuFFX6xvyZCCu6UoKdnzBZ5FZFu6iev%2B6ANGz1h8rCsZujIXLTSGllfbJ6rZKE4XhUgsWhhBTiZNZHhBNIki3SOEYswGCvjV9%2F8AtoPLLLUBhFS%2BPf7BibpIE6BoZcBxYGI40ICIaO3fSjNdAg2Aa1cIsLs8lCPUmB6zdZbHughPrDjRyNJgfTwOq5FW2NDDPoxN2MQBKsBFFDYAVZeoYeq%2B%2Ft3gM%2FemcV%2FP3DZyWSkMlCBgqoqIVgBqlFYIgsKJMGI4wQK0mwEDo2IY0YUGKXW6ThpN4gFD%2Bxi2DT4lADzcUWRh5xZn3EuKYQNtpPFFPIUb9YdNVt8Nbnb0DdyEmwZMZyyZVBQbT34mkrZufAvqTcLXE1zbgU%2FOgSI42i9AdpS571q5lVlLL7sF61wDE4mOu4%2BxJlBNLKFjOGpFr5DuYFqekoesqp4qfPfiK5MoBF3EeO8jpkt0SzHoedGibSKJn%2BiBNpeIImry5s5fUIaF28xAgkyYok6vF9QtHEfN6FtqCOsZ5dMyiTBiOMFlYykM8toYlFIJS4xmHGYu2S%2B7J3VIDrH2iNLAT7oVAknpC8YTGGV7mO8RK4uy0hgUDwnDhqFht9ihGWDCOPKLc%2BUqygubsSxJ8eRKJpRuJB%2FQR1DFbQbD3kpZlFIBCcwVjjmL%2BDOb%2BvAXTca6R%2FbODkEeHhW3zYrBWMH82X8kWUaeKMMNzYKd0KUHTVCvFYTWVFaykhWF8pQ68%2FTJMAXegPHHt1eBatWKuai0jIjvaw9Zw4EBPuYMQh2yfTAGq%2FBtDzrJb%2BgeFbntEpZZ%2FGFPkfygmglSZudXI6Bn8aMqn%2Bf%2Ffc66xeKlMOGYYG%2FZH1uj90EsHCNr5DstwWKE9MRE0xrEOCKbk4SYvnOTQtvARUdUjBEOU%2Bq9XCVx7zLYCZTwKMrAfY1wNw5kU9%2FeOQKn09wgmkhRNGRtYxwMIzMZfdJ9bkGuZh9V1i5QJRPwHKkCyENtPiWKo473m2uCM26jOz9rGOOB4nZ8uKEce0zQBTFEbD9B8z8njR6Ix10pdGF6axN8FTxJOcMCw%2FhZunuGEQbaiFDV%2FOk%2BFHuQsw%2B9XPaJYRyo00QvwObycoELRRX0LQJURS2YIWOZKHWFRliuq6Y74EMH6tUEWMPFKYfapwSzJWSeOWqaPh4OLJA6SBOHnukvT%2FnTdfxQyrK2jGEcqFNJLgXySxCazrSGh5BPWJY%2FKvjE%2B%2FZk1e8zDHAgUThsGq%2BMlI4V%2BLJsGscYONo6c7Tkv%2Fv2NaDUQn1tCsI5QLaZR6vhK2L1LoqoxYCDD7mbxVYQTUOq5iHsfRH7rftJpq%2BN2cK2FW7Qh45Whfwccnv7gEk6uH0WwjlBOGUvZsS%2BHqu%2Fg5wIUesdOnPCRqdQgjOmssdN81GVYz4kBrQgt7u87B3ZPJyiCUjbXRAkMrb2lBocVx6VOA%2FzUDjF0FcO0m49OHjwWo%2FyVA54POm8Ksi4M31xW4JARCBSBi4VjMk8ko%2Fg5yCcCJLoJ5VQn53i1i%2BeivUilXY5N5lXXfADi2GKDvdUc9t%2BeGiUKkgdGUpzNn4LfzK%2B7RlRCtr7KFSEoCvga1RS9Xg%2Be92Jkjg0K47DoY0Wk3O8kdoaD%2BMUenT6sbBY11xpER1DV%2Bms7Bc4dOw58bxw8imaMXLhVz0IOC5qjTHdgDDj8vKYJzoT%2B0rlm0uh20OSxoEYSNErww%2BY0VqzvAdarzPngyXps%2FxDHuxnyCmE2smWRMGps%2FPAW3%2Facbvh0cA0%2BGAjB%2B5LBBhLL1WF8xxz4sMDmiILadnuGC1Jvwig2WSwFhs4XJNwvKeFB3i0m9QX5HHWovjE4oszZdhO0xcC80gVmlNjHxCu1mvPZpH8SP9UrRlfZbC0OySBpL93QXO4O0AZNo1IuFT9IYKzg4G8C5Yj5Oa8KXYBgP2xHX6Y8o748tAu21s1CiWndwFB95otMhKL335IS8XOBewZoSeXhTPpKCoqgaGJ6d9DhA1xPi12OEsHPBeDh89oJEArIlgTrGN9Mn4btX10D%2F3VN0T3%2Fi%2FR5487OzpdCP0k7xbHK2KSaDFwt5HV8YSYWb5GTznRbwZu9MN%2FojZZO0drN65Q2TkbyKshUh3wpR%2BdxHSuedLCmXyKWEiQNzNk78CWDqo3lRtEDreJj12LP5yIwAkDTkkOva97Lw%2BPyxEhmMHg7wxlcnDnJJlFbIne91Q%2F%2B9U%2BG9Xk8sDZzsdkNjVs7LOqjDrdBdBE13%2BeEwnOwuvz%2BkWCFG0Q2TvSINzffBsP8bCpwm4xTzyF3xyVU5354Pvx5RbfqFf3fvApiwSuw6NdWD8jTiJ%2Fpg0bsn4Huzawt0DNkKqdp5FO58%2B3PJNal65UipWBt2UQqP2ct36H4skH%2FQieABaXCg9dOqdOMEn%2BjFcUrpCal4PdSNWPFtTtlPmrh4qvDvT1eLn18zmBh2zgtoJnyhC4NWSPwjVVLa6fNeLuimCiEONbRU%2BWQxLAdcUDa2OCg2aQQEyBfJI6Lq6%2B0C2ksDJ%2Fk0nzuyKxYqxvgYE8fFHm09wwNokQZGU9Z8kAPwN9ya8mlh4J0nB6UjanbqvJypmASXhqH1ugRRLadFRRxWtpdYUAp9YuyqpK8HOP433xuFOga6ImvSJ%2F0mDeD7DeR8qq6UXmAc1yM4EN8K0pc2lThx2LKuwMGrS4tFHPo7lKPIiXrGvofyWwh6DNQxbn2rK69j2HNFci4tRr98%2FaiLJIXjuNbB%2BQmTdvoOTuLpIbSenFhnER9vWC4QR2MvNrjZkPFwty%2F9fUddwZP%2FzcHs1486ETylndL7l02PuzBh4%2BDOKx%2BUaNOoJwvWnlPQ%2Fe48A9CutbTdSLHnVsdGr%2FvDpwWV89D9Sgm2NanRx6hZhIcKeeRdlcbeJCvYaCs7lDtD9hxsO3RWcksQjx3pteuWSDulM8KIsJJx8W4X4XfwnAsTdSW7XthgUa50UM9aOW2YL3471kFCoD%2BiDtup7I%2B1ev2hUS8uxqBLpjxeI6STT%2BHGnMkKuFc5A7fQze%2Fqo8aRf0s9%2BmnrTScI5nM4dF%2Fu39Ml5WTsPX6OuSYXbC1IfDM9K0mPJoL8RvmNNhZMmi%2B0oNlbzfnnIYsTBi2iGernE%2Fi1rCzwnOhC4tcOCs2PQnRyIg5afaYCFyQnmvtsLirsq2a8hst5KlptjRlYZ%2FIzJ1mB74pewHaL8229X8RR1d%2Ffr%2F1Jfrs%2Fc7UXn1HBPUhPvmG0qU8zWjX8VY7rXGi3tBkyIwxfE2J4HD3MF3lAx1TFidlqd4IqMg7DGnVkuJnbapYMxEODEd7WoIHJnLS7O7hAf2R4nyR1IjbgoI%2FkerUESeXu30mRxCkbu6pnjMaYPwog97%2FmTuGC3zWg%2BK5BxVhmFfMtqdUWge%2BU1dlhXm88BYjjMoGEQeT1Bbhz2Pl2r4kDGTjqpktCIBCswzwBDPUPZLv8S6f1tzc73%2B5lO9OcMJI0ZARCqWkcxgQi%2B7cbfWyfJKQxwggRaRAIQ5E48uSRZQXV9RngvfKLBBV0I7xKIBD8dlW0CSQDKNjk9Q%2B0RNx8ElF6jSTpGARCuVgchQSC%2BR%2FovriR74Chqvt4eJVIg0AoW%2BK4TCDoTiCB2Mm2RMJZz8gC3ZJWGhICoVKII08eWZ6%2BvhDE9Q8kGiSMGA0FgTB04P5LTBp7MaEE9Q%2F50WEt%2FQOJBcOrKRoCAoGIQ0kgUqYcIxC0JuRsuQzk08QT1PUEwtDF%2FwUYAFUSmJZ7s8RCAAAAAElFTkSuQmCC)',
         'background-repeat': 'no-repeat',
   		   'background-size': 'contain',
   		   'background-position-y': '5px',
   		   'padding-top': '50px',
         'height': '0',
         'text-indent': '-9999px'
      },
      '@keyframes blink': {
        to: { opacity: 0 }
      }
    },
    Playground: {
      preview: {
        position: 'relative !important',
        padding: '50px',
        background: '#fcfcfc'
      },
      controls: {
        'text-align': 'right',
        display: 'block'
      }
    },
    ToolbarButton: {
      button: {
        display: 'none'
      }
    },
    TabButton: {
      button: {
        textTransform: 'none'
      }
    }
  },
  defaultExample: false,
  skipComponentsWithoutExample: true,
  styleguideDir: 'docs', // this allow to publish the styleguide in GH-pages
  sections: [
    {
      name: 'Components',
      components: getComponents(REACT_MYPAGES_SRC)
    },
    {
      name: 'Styleguide',
      components: getComponents(REACT_STYLEGUIDE_COMPONENTS)
    }
  ],
  webpackConfig: {
    resolve: {
      modules: [
        ...ASSET_PATHS.map((path) => utils_paths.base(path)),
        'node_modules'
      ],
      extensions: ['*', '.js', '.jsx', '.json'],
      alias: {
        'rsg-components/Wrapper': path.join(__dirname, 'styleguide/internal/Wrapper')
      }
    },
    plugins: [
      new webpack.DefinePlugin(globals)
    ],
    module: {
      loaders: [
        {
          test: /\.pdf$/,
          loader: 'ignore-loader'
        },
        {
          test: /\.js?$/,
          include: dir,
          use: [{
            loader: 'babel-loader',
            query: {
              cacheDirectory: true,
              plugins: [
                'babel-plugin-transform-class-properties',
                'babel-plugin-syntax-dynamic-import', [
                  'babel-plugin-transform-runtime',
                  {
                    helpers: true,
                    polyfill: true,
                    regenerator: true
                  }
                ],
                [
                  'babel-plugin-transform-object-rest-spread',
                  {
                    useBuiltIns: false
                  }
                ]
              ],
              presets: [
                'stage-0',
                'babel-preset-react', ['babel-preset-env', {
                  targets: {
                    ie9: false,
                    uglify: true,
                    modules: false
                  }
                }]
              ]
            }
          }]
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: 'style-loader'
            },
            {
              loader: 'css-loader',
              options: {
                modules: true,
                import: true,
                localIdentName: '[name]__[local]___[hash:base64:5]',
                importLoaders: 1,
                camelCase: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                includePaths: [
                  utils_paths.base('styles'),
                  utils_paths.client('styles')
                ]
              }
            }
          ]
        },
        {
          test: /\.(png|jpg|eot|woff|woff2|ttf|svg)$/,
          exclude: /.pdf/,
          include: /.*/, // Because styleguidist requires either include or exclude.
          loader: 'url-loader?limit=8192'
        }
      ]
    }
  }
}
