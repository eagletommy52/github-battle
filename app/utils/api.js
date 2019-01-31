const axios = require('axios');
const env = require('../../app-env')

const params = `?client_id=${env.id}&client_secret=${env.sec}`;

const getProfile = username =>{
  return axios.get(`https://api.github.com/users/${username}${params}`)
    .then(user=>{
      return user.data
    })
}
const getRepos = username =>{
  return axios.get(`https://api.github.com/users/${username}/repos${params}&per_page=100`)
}
const getStarCount = repos => {
  return repos.data.reduce((count, repo)=>{
    return (count+repo.stargazers_count)
  },0)
}
const calculateScore = (profile, repos) => {
  const followers = profile.followers;
  const totalStars = getStarCount(repos)
  return (followers*3) + totalStars;
}
handleError = error=>{
  console.warn(error)
  return null;
}

const getUserData = player=>{
  return axios.all([
    getProfile(player),
    getRepos(player)
  ]).then(data=>{
    const [profile, repos] = data
    return {
      profile: profile,
      score: calculateScore(profile, repos)
    } 
  })
}

const sortPlayers = players=>{
  return players.sort((a,b)=>{
    return b.score-a.score
  })
}

module.exports = {
  battle: (players) => {
    return axios.all(players.map(getUserData)).then(sortPlayers)
  },
  fetchPopularRepos: function (language) {
    var encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:' + language + '&sort=starts&order=desc&type=Repositories');
    return axios.get(encodedURI)
      .then(function(response){
        return response.data.items;
      })
  }
}