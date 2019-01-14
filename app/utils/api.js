const axios = require('axios');

const id = "clientID";
const sec = "secretID";
const params = `?client_id=${id}&client_secret=${sec}`;

module.exports = {
  battle: () => {

  },
  fetchPopularRepos: function (language) {
    var encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:' + language + '&sort=starts&order=desc&type=Repositories');
    return axios.get(encodedURI)
      .then(function(response){
        return response.data.items;
      })
  }
}