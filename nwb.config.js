module.exports = {
  type: 'react-component',
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
