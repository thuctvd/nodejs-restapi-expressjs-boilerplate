module.exports = {
  PORT: 4002,
  DB_CONNECTION: {
    crawler: {
      uri: 'mongodb://127.0.0.1:27017/wallet_alo88',
      options: {
        useNewUrlParser: true,
        autoIndex: false,
        useUnifiedTopology: true
      }
    }
  },
  JWT: {
    secret: 'auIJ23#fhheA45rqa'
  }
};