const awsExports = {
  Auth: {
    region: "eu-north-1",
    userPoolId: "eu-north-1_vcXKxrYk5", // ← тот, что ты уже используешь
    userPoolWebClientId: "21tgfqv26mks41gscps8g1fi7b", // ← твой app client ID
    oauth: {
      domain: "eu-north-1vcxkxryk5.auth.eu-north-1.amazoncognito.com", // ← ТОТ САМЫЙ!
      scope: ["email", "openid"],
      redirectSignIn: "https://d1bdaso729tx0i.cloudfront.net/",
      redirectSignOut: "https://d1bdaso729tx0i.cloudfront.net/",
      responseType: "code"
    }
  }
};

export default awsExports;
