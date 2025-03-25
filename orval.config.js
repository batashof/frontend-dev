module.exports = {
  rideo: {
    input: {
      target: 'http://0.0.0.0:8000/api/docs/schema'
    },
    output: {
      target: 'src/api/api.ts',
      client: 'react-query',
      mode: 'tags-split',
      indexFiles: false,
      baseUrl: 'http://0.0.0.0:8000',
      override: {
        mutator: {
          path: 'src/api/use-custom-instance.ts',
          name: 'useCustomInstance'
        }
      }
    },
  },
};