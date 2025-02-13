interface WebsiteConfig {
  tokenHeader: string
  clientId: string
  clientSecret: string
  accesstokenkey: string
  storeKey: string
  tokenKey: string
}

const website: WebsiteConfig = {
  tokenHeader: 'Authorization',
  clientId: 'clientId', // 客户端id
  clientSecret: 'clientSecret', // 客户端密钥
  accesstokenkey: 'accessToken', // token key
  storeKey: 'storeKey',
  tokenKey: 'token',
}

export default website
