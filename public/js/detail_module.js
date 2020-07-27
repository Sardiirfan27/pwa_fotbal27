// import "./idb.js"
import {getDetailTeamById} from './get_api.js'
import {registrationSW,requestPermission} from './register_notif.js'

registrationSW();
requestPermission();

document.addEventListener("DOMContentLoaded", function () {
    getDetailTeamById();
});

