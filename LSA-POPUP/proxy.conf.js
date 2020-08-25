var HttpsProxyAgent = require('https-proxy-agent');
var proxyConfig = [{
    "/sap/*" : {
      "target": "http://rrnwgwdev.ril.com:80/",
      "secure": false,
      "pathRewrite": {
        "http://localhost:4200/": "http://rrnwgwdev.ril.com:80/"
      },
      "changeOrigin": true,
      "logLevel": "debug"
    }
  }];

function setupForCorporateProxy(proxyConfig) {
  var proxyServer = process.env.http_proxy || process.env.HTTP_PROXY;
  if (proxyServer) {
    var agent = new HttpsProxyAgent(proxyServer);
    console.log('Using corporate proxy server: ' + proxyServer);
    proxyConfig.forEach(function(entry) {
      entry.agent = agent;
    });
  }
  return proxyConfig;
}

module.exports = setupForCorporateProxy(proxyConfig);