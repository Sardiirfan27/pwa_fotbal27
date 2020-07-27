import "./idb.js"
import {getBeranda,getBeranda2,getKlasemen,getMatches,getTeam} from './get_api.js'
import {dftrTeamFavorit,saveTeamConfirm,deleteTeamConfim} from './data_pages.js' 
import {registrationSW,requestPermission} from './register_notif.js'

registrationSW();
requestPermission();

//Navbar setting
document.addEventListener("DOMContentLoaded", function() {
  // Activate sidebar nav
  let elems = document.querySelectorAll(".sidenav");
  M.Sidenav.init(elems);
  loadNav();

  function loadNav() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status !== 200) return;

        // Muat daftar tautan menu
        document.querySelectorAll(".topnav, .sidenav").forEach(function(elm) {
          elm.innerHTML = xhttp.responseText;
        });

        // Daftarkan event listener untuk setiap tautan menu
        document
          .querySelectorAll(".sidenav a, .topnav a")
          .forEach(function(elm) {
            elm.addEventListener("click", function(event) {
              // Tutup sidenav
              let sidenav = document.querySelector(".sidenav");
              M.Sidenav.getInstance(sidenav).close();

              // Muat konten halaman yang dipanggil
              page = event.target.getAttribute("href").substr(1);
              loadPage(page);
            });
          });
      }
    };
    xhttp.open("GET", "nav.html", true);
    xhttp.send();
  }

  // Load page content
  let page = window.location.hash.substr(1);
  if (page == "") page = "beranda";
  loadPage(page);

  function loadPage(page) {
    // fetch('pages/' + page + '.html')
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        let content = document.querySelector("#body-content");
        
        if (page === "beranda") {
          getBeranda(), getBeranda2();
        } else if (page === "klasemen") {
          getKlasemen();
        }
        else if (page === "pertandingan") {
          getMatches();
        }
        else if (page === "team") {
          getTeam()
          window.saveTeamConfirm = saveTeamConfirm;
        }
        else if (page == "team_favorit") {
          dftrTeamFavorit()
          window.deleteTeamConfim = deleteTeamConfim;
        }

        if (this.status == 200) {
          content.innerHTML = xhttp.responseText;
        } else if (this.status == 404) {
          content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
        } else {
          content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
        }
      }
    };

    xhttp.open("GET", "pages/" + page + ".html", true);
    xhttp.send();
  }

});



