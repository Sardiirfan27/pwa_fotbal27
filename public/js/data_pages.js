import {saveTeam,deleteTeam,getTeamfav} from './op_database.js'

let dataTeams;
const pageBeranda = (data) => {
  let berandaHTML = ''
  //data.macthes = diambil dari json API
  data.matches.forEach(dataMatches => {
    berandaHTML += `
    <section class="col s12 white-text card grey darken-4">
      <div class="card-content">
        <div class="center-align">
          <div>
            <h5 class="collection-header" style="border: 7px double #2a4aeb;">Upcoming Match Team Real Madrid CF</h5>
          </div>
          <div class="col s12 m12">
            <ul>
              <li class="font2-bold">${dataMatches.homeTeam.name}</li>
              <li>VS</li>
              <li class="font2-bold">${dataMatches.awayTeam.name}</li>
            </ul>
            <ul class=>
              <li>${dataMatches.competition.name}</li>
            </ul>
            <ul>
              <li>${dateToDMY(new Date(dataMatches.utcDate))}</li>
            </ul>
          </div>
        </div>
      </div> 
    </section>
    `
  });
  // masukan komponen ke dalam elemen dengan id pada page #content
  document.getElementById("BerandaHal").innerHTML = berandaHTML;
}

const pageBeranda2 = (data) => {
  let berandaHTML = ''
  //data.macthes = diambil dari json API
  data.matches.forEach(dataMatches => {
    berandaHTML += `
    <section class="col s12 white-text card grey darken-4">
      <div class="card-content">
        <div class="center-align">
          <div>
            <h5 class="collection-header" style="border: 7px double #2a4aeb;">Upcoming Match Team FC Barcelona</h5>
          </div>
          <div class="col s12 m12">
            <ul>
              <li class="font2-bold">${dataMatches.homeTeam.name}</li>
              <li>VS</li>
              <li class="font2-bold">${dataMatches.awayTeam.name}</li>
            </ul>
            <ul class=>
              <li>${dataMatches.competition.name}</li>
            </ul>
            <ul>
              <li>${dateToDMY(new Date(dataMatches.utcDate))}</li>
            </ul>
          </div>
        </div>
      </div> 
    </section>
    `
  });
  // masukan komponen ke dalam elemen dengan id pada page #content
  document.getElementById("BerandaHal2").innerHTML = berandaHTML;
}

const pageKlasemen = (data) => {
  let KlasemenHtml = ''
  //data.standings = diambil dari url API
  data.standings.forEach(klasemen => {
    let detail = ''
    klasemen.table.forEach(dataTeams => {
      detail += `<tr>
        <td>${dataTeams.position}</td>
        <td><a href="./rincian_team.html?id=${dataTeams.team.id}">
        <img class="responsive-img" width="30" height="30" alt="logoTeam" src="${ dataTeams.team.crestUrl || 'img/empty_badge.svg'}">
        </a>
        </td>
        <td><a class="white-text" href="./rincian_team.html?id=${dataTeams.team.id}">${dataTeams.team.name}</a></td>
        <td>${dataTeams.playedGames}</td>
        <td>${dataTeams.won}</td>
        <td>${dataTeams.draw}</td>
        <td>${dataTeams.lost}</td>
        <td>${dataTeams.goalsFor}</td>
        <td>${dataTeams.goalsAgainst}</td>
        <td>${dataTeams.goalDifference}</td>
        <td>${dataTeams.points}</td>
      </tr>`
    })

    KlasemenHtml += `
      <section class="col s12 m12 white-text">
        <div class="card grey darken-4">
          <div class="card-content">
            <table class="highlight responsive-table ">
              <thead>
                <tr class="black darken-2 z-depth-5">
                  <th>Position</th>
                  <th>Logo</th>
                  <th>Team</th>
                  <th>Matches</th>
                  <th>Win</th>
                  <th>Draw</th>
                  <th>Lose</th>
                  <th>GF</th>
                  <th>GA</th>
                  <th>GD</th>
                  <th>Point</th>
                </tr>
              </thead>
              <tbody>` + detail + `</tbody>
            </table>
          </div>
        </div>
      </section>
    `
  });
  document.getElementById("klasemen").innerHTML = KlasemenHtml;
}


const pagePertandingan = (data) => {
  let Matcheshtml = '<div class="row">'
  //data.matches = diambil dari url API
  data.matches.forEach(dataPertandingan => {
    Matcheshtml += `
      <section class="col s12 m6 l6 white-text">
        <div class="card grey darken-4">
          <div class="card-content">
            <div class="center-align">
              <div class="center-align" style="margin-bottom:20px">Tanggal : ${dateToDMY(new Date(dataPertandingan.utcDate))}</div>
              <div class="row" style="margin-bottom:20px">
                <div class="col s5 truncate right-align">
                  <p style="margin-bottom:20px">  ${dataPertandingan.homeTeam.name}</p>
                  <div style="margin-left:20px"> ${dataPertandingan.score.fullTime.homeTeam}</div>
                </div>
                <div class="col s2">
                  &nbsp;VS
                </div>
                <div class="col s5 truncate left-align">
                  <p style="margin-bottom:20px">${dataPertandingan.awayTeam.name}</p>
                  <div style=""> ${dataPertandingan.score.fullTime.awayTeam}</div>
                </div> 
              </div>
              <div class="center-align">
              </div>
            </div>
          </div>
        </div>
      </section>
    `
  });

  if(data.length == 0) matcheshtml += '<h5 class="center-align">Harap Refresh Web Apabila Data Tidak Muncul!</h5>'
  document.getElementById("matchesPage").innerHTML = Matcheshtml;
}


const pageTeam = (data) => {
  dataTeams = data
  let Teamhtml = '<div class="row">'
  data.teams.forEach(TimFav => {
    Teamhtml += `
    <section class="col s12 m6 l6 white-text">
      <div class="card grey darken-4">
        <div class="card-content">
          <div class="center"><img width="64" height="64" alt="logoTeamAll" src="${TimFav.crestUrl || 'img/empty_badge.svg'}"></div>
          <div class="center flow-text">${TimFav.name}</div>
          <div class="center">${TimFav.area.name}</div>
          <div class="center">${TimFav.venue}</div>
        </div>
        <div class=" grey card-action right-align">
          <a class="waves-effect waves-blue btn" href="./rincian_team.html?id=${TimFav.id}"><i>Details</i></a>  
          <a class="waves-effect waves-blue btn" onclick="saveTeamConfirm(${TimFav.id})"> <i><i class="material-icons">save</i> Favorite</i></a>
        </div>
      </div>
    </section>`
  });

  document.getElementById("dftrTeam").innerHTML = Teamhtml;
}


const dftrTeamFavorit = () => {
  let teams = getTeamfav()
  teams.then(data => {
    dataTeams = data;
    //untuk isi dari pages
    let Favhtml = ''
    Favhtml += '<div class="row">'
    data.forEach(Timfav => {
      Favhtml += `
      <section class="col s12 m6 l6">
        <div class="card">
          <div class="card-content grey darken-4 white-text">
            <div class="center"><img width="64" height="64" alt="logoTeam" src="${Timfav.crestUrl || 'img/empty_badge.svg'}"></div>
            <div class="center flow-text">${Timfav.name}</div>
            <div class="center">${Timfav.area.name}</div>
          </div>
          <div class="card-action grey right-align">
            <a class="waves-effect waves-blue btn" href="./rincian_team.html?id=${Timfav.id}">Details</a>  
            <a class="waves-effect waves-blue btn" onclick="deleteTeamConfim(${Timfav.id})">Delete</a>
          </div>
        </div>
      </section>
    `
    })
    
    if(data.length == 0) Favhtml += '<h5 class="center-align">Belum ada Team yang Difavoritkan!</h5>'
    document.getElementById('teamFavku').innerHTML = Favhtml;
  })
}

//fungsi notif push
const pushNotitifikasi = msg => {
  const title = 'Notifikasi';
  const options = {
      'body': msg,
      'image': '../image/icon192.png',
      'icon': '../image/icon.png'
  };
  if (Notification.permission === 'granted') {
      navigator.serviceWorker.ready.then(function(registration) {
          registration.showNotification(title, options);
      });
  } else {
      console.error('Fitur notifikasi tidak diijinkan.');
  }
}

const saveTeamConfirm = TimFav => {
  let confirmation = confirm("Yakin Tambahkan Team?")
  let saveTeamFav = dataTeams.teams.filter(el => el.id == TimFav)[0]
  if (confirmation == true) {
  saveTeam(saveTeamFav);
  }
}

const deleteTeamConfim = TimFav => {
  let confirmation = confirm("Yakin Mau Hapus?")
  if (confirmation == true) {
    deleteTeam(TimFav);
  }
}

let dateToDMY = date => {
  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
}


export {
  pageBeranda,
  pageBeranda2,
  pageKlasemen,
  pagePertandingan,
  pageTeam,
  dftrTeamFavorit,
  saveTeamConfirm,
  deleteTeamConfim,
  pushNotitifikasi,
}