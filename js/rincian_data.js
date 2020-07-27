const detailTeamJson = (data) => {
    data = JSON.parse(JSON.stringify(data).replace(/http:/g, 'https:'));
    document.getElementById("namaClubALL").innerHTML = data.name;
    document.getElementById("logoClubALL").src = data.crestUrl;
    document.getElementById("nameALL").innerHTML = data.name;
    document.getElementById("namaPendek").innerHTML = data.shortName;
    document.getElementById("TLAclub").innerHTML = data.tla;
    document.getElementById("foundedClubALL").innerHTML = data.founded;
    document.getElementById("colorsClubALL").innerHTML = data.clubColors;
    document.getElementById("venueClubALL").innerHTML = data.venue;
    document.getElementById("venue1ClubALL").innerHTML = data.venue;
    document.getElementById("alamatClub").innerHTML = data.address;
    document.getElementById("phoneClubALL").innerHTML = data.phone;
    document.getElementById("webClubALL").innerHTML = data.website;
    document.getElementById("mailClubALL").innerHTML = data.email;
}
export {detailTeamJson}
  