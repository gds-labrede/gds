/* ═══════════════════════════════════════════════════════════
   GDS — archivage automatique des StockStatus

   Chaque StockStatus déposé depuis le sommaire est aussi copié
   dans l'Archive, dossier StockStatus/, sous un nom propre :
     StockStatus/StockStatus_FR_STOREDEPOT_00171_JJ-MM-AAAA.csv
   Un seul fichier par jour : le premier déposé est gardé,
   les suivants du même jour sont ignorés.

   À inclure dans sommaire.html, juste avant </body> :
     <script src="gds_stockstatus.js"></script>
   ═══════════════════════════════════════════════════════════ */
(function(){
  var DOSSIER = 'StockStatus/';
  var MOTIF = /StockStatus_FR_STOREDEPOT_(\d+)_(\d{2})-(\d{2})-(\d{4})/i;

  function nomArchive(nom){
    var m = MOTIF.exec(nom || '');
    return m ? DOSSIER + 'StockStatus_FR_STOREDEPOT_' + m[1] + '_' + m[2] + '-' + m[3] + '-' + m[4] + '.csv' : null;
  }

  async function archiver(f){
    var cible = nomArchive(f.name);
    if(!cible || !/\.csv$/i.test(f.name)) return;
    var r = await fetch(API + '/archive', {
      method:'POST', headers: auth({'Content-Type':'application/json'}), body: JSON.stringify({prefix: DOSSIER})
    });
    if(!r.ok) throw new Error('liste');
    var d = await r.json();
    var deja = (d.files || []).some(function(x){ return x.fileName === cible; });
    var jour = cible.slice(-14, -4).replace(/-/g, '/');
    if(deja){ dire('StockStatus du ' + jour + ' déjà dans l\'historique', 'ok'); return; }
    r = await fetch(API + '/archive/' + encodeURIComponent(cible), {
      method:'POST', headers: auth({'Content-Type':'text/csv'}), body: f
    });
    if(!r.ok) throw new Error('envoi');
    dire('StockStatus du ' + jour + ' ajouté à l\'historique', 'ok');
    if(typeof charges !== 'undefined') charges.archive = false;
  }

  if(typeof window.envoyer !== 'function') return;
  var origine = window.envoyer;
  window.envoyer = async function(f){
    var res = await origine.apply(this, arguments);
    if(f && MOTIF.test(f.name)){
      try { await archiver(f); }
      catch(e){ dire('StockStatus non ajouté à l\'historique', 'err'); }
    }
    return res;
  };
})();
