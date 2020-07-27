import {pageBeranda,pageBeranda2,pageKlasemen,pagePertandingan,pageTeam} from './data_pages.js'
import {detailTeamJson} from './rincian_data.js'

const apiToken = 'c815bdd229554853b81077f8327ce9b4'
const liga_ID = 2014
const base_url = "https://api.football-data.org/v2/";
const klasemen = `${base_url}competitions/${liga_ID}/standings?standingType=TOTAL`
const Matches = `${base_url}competitions/${liga_ID}/matches`
const teamData= `${base_url}competitions/${liga_ID}/teams`
const teamsALL = `${base_url}teams/`  // untuk detail team
const Beranda = `${base_url}teams/81/matches?status=SCHEDULED&limit=2` // untuk khusus barcelona
const Beranda2 = `${base_url}teams/86/matches?status=SCHEDULED&limit=2` // untuk khusus real madrid


const fetchApi = url => {
  return fetch(url, {
    headers: {
      'X-Auth-Token': apiToken
    }
  });
}

// Blok kode jika fetch berhasil
const status =(response) => {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    //reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise supaya "di-then-kan"
    return Promise.resolve(response);
  }
}

//untuk memparsing json ke array JavaScript
const json = (response) => {
  return response.json();
}

//untuk meng-handle kesalahan di blok catch
const error =(error) => {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}

//fungsi untuk halaman beranda
const getBeranda = () => {
  if ("caches" in window) {
    caches.match(Beranda).then(function(response) {
      if (response) {
        response.json().then(function(data) {
          pageBeranda(data)
        });
      }
    });
  }

  fetchApi(Beranda)
  .then(status)
  .then(json)
  .then(function(data) {
    pageBeranda(data)
  })
  .catch(error);
}

const getBeranda2 = () => {
  if ("caches" in window) {
    caches.match(Beranda2).then(function(response) {
      if (response) {
        response.json().then(function(data) {
          pageBeranda2(data)
        });
      }
    });
  }

  fetchApi(Beranda2)
  .then(status)
  .then(json)
  .then(function(data) {
    pageBeranda2(data)
  })
  .catch(error);
}


//untuk daftar klasemen
const getKlasemen = () => {
  if ("caches" in window) {
    caches.match(klasemen).then(function(response) {
      if (response) {
        response.json().then(function(data) {
          pageKlasemen(data)
        });
      }
    });
  }

  fetchApi(klasemen)
  .then(status)
  .then(json)
  .then(function(data) {
    pageKlasemen(data)
  })
  .catch(error);
}

//untuk riwayat pertandingan
const getMatches =()=> {
  if ("caches" in window) {
    caches.match(Matches).then(function(response) {
      if (response) {
        response.json().then(function(data) {
          pagePertandingan(data)
        });
      }
    });
  }

  fetchApi(Matches)
  .then(status)
  .then(json)
  .then(function(data) {
    pagePertandingan(data)
  })
  .catch(error);
}

//untuk data team
const getTeam = () => {
  if ("caches" in window) {
    caches.match(teamData).then(function(response) {
      if (response) {
        response.json().then(function(data) {
          pageTeam(data)
        });
      }
    });
  }

  fetchApi(teamData)
  .then(status)
  .then(json)
  .then(function(data) {
    pageTeam(data)
  })
  .catch(error);
}


const getDetailTeamById = () => {
  return new Promise(function (resolve, reject) {
    let urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get("id");
    let DataPemainHTML = ''
    let dftrPemainHTML = ''
    if ("caches" in window) {
      caches.match(teamsALL + idParam).then(function (response) {
        if (response) {
          response.json().then(function (data) {
            // let detailTeamJson;
            detailTeamJson(data)
            data.squad.forEach(function (squad, index) {
              let DataPemainJSON;
              DataPemainJSON = squad;
              DataPemainHTML += `
                <tr>
                  <td>${index+1}. </td>
                  <td class="font2-bold">${squad.name}</td>
                  <td class="red-text">${squad.position}</td>
                </tr>
              `
            });
            dftrPemainHTML += `
            `
            document.getElementById("dftrSquad").innerHTML = dftrPemainHTML;
            resolve(data);
          });
        }
      });
    }

    fetch(teamsALL + idParam,{
      headers: {
        'X-Auth-Token': apiToken
      }
    })
      .then(status)
      .then(json)
      .then(function (data) {
        detailTeamJson(data)
        let dataTeamJSON;
        dataTeamJSON = data;
        data.squad.forEach(function (squad, index) {
          let DataPemainJSON;
          DataPemainJSON = squad;
          DataPemainHTML += `
            <tr>
              <td>${index+1}. </td>
              <td class="font2-bold">${squad.name}</td>
              <td class="red-text">${squad.position}</td>
            </tr>
          `
        });
        dftrPemainHTML += `
          <table>
            <thead>
              <tr class="black white-text">
                <td class="font2-bold">No</td>
                <td class="font2-bold">Name</td>
                <td class="font2-bold">Position</td>
              </tr>
            </thead>
            <tbody> ${DataPemainHTML}  </tbody>
          </table>
        `

        document.getElementById("dftrSquad").innerHTML = dftrPemainHTML;
        resolve(data);
      })
      .catch(error);
  });
  
}


export {
  getBeranda,
  getBeranda2,
  getKlasemen,
  getMatches,
  getTeam,
  getDetailTeamById
}

