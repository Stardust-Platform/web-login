export const LoginUrl = {
  url: "https://bddtm60cbd.execute-api.us-east-1.amazonaws.com/v1/player/login",
  // used whenever default Amplify Environment is overwritten
  update(url: string) {
    this.url = url;
  },
};
