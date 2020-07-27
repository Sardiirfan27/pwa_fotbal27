import {pushNotitifikasi,dftrTeamFavorit} from './data_pages.js'

// pengoperasian database 
let dbP = idb.open('fotbal', 1, upgradeDb => {
    switch (upgradeDb.oldVersion) {
      case 0:
        upgradeDb.createObjectStore('TimFav', { 'keyPath': 'id' })
    }
  });

const saveTeam = (TimFav) => {
    dbP.then(db => {
      let tx = db.transaction('TimFav', 'readwrite');
      let store = tx.objectStore('TimFav')
      TimFav.TimeDate = new Date().getTime()
      store.put(TimFav)
      return tx.complete;
    }).then(() => {
      M.toast({ html: `${TimFav.name} berhasil disimpan!` })
      console.log('Team Berhasil Disimpan');
    }).catch(err => {
      console.error('Team gagal disimpan', err);
    });
  }
  
  const deleteTeam = (TimFav) => {
    dbP.then(db => {
      let tx = db.transaction('TimFav', 'readwrite');
      let store = tx.objectStore('TimFav');
      store.delete(TimFav);
      return tx.complete;
    }).then(() => {
      M.toast({ html: 'Tim Berhasil Di Hapus!' });
      pushNotitifikasi(`Berhasil delete Tim`)
      dftrTeamFavorit();
    }).catch(err => {
      console.error('Error: ', err);
    });
  }
  
  const getTeamfav = () => {
    return dbP.then(db => {
      let tx = db.transaction('TimFav', 'readonly');
      let store = tx.objectStore('TimFav');
      return store.getAll();
    })
  }



  export {saveTeam,getTeamfav,deleteTeam}