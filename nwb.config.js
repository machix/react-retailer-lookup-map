const path = require('path')
const nodeModulesPath = path.resolve('./node_modules')

module.exports = {
  type: 'react-component',
  webpack: {
    autoprefixer: {
      browsers: [
        '>1%',
        'last 4 versions',
        'Firefox ESR',
        'not ie < 9', // React doesn't support IE8 anyway
      ].join(', '),
      flexbox: 'no-2009'
    },
    rules: {
      'scss': {
        loader: 'sass-loader',
        options: {
          includePaths: [nodeModulesPath]
        }
      }
    },
    define: {
      process: {
        env: {
          GOOGLE_MAPS_API: JSON.stringify(process.env.GOOGLE_MAPS_API)
        }
      }
    }
  },
  npm: {
    esModules: true,
    umd: {
      global: 'REACT_RETAILER_LOOKUP_MAP',
      externals: {
        react: 'React'
      }
    }
  }
}
