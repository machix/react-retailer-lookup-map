
module.exports = {
  type: 'react-component',
  webpack: {
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
