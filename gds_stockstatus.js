/* ═══════════════════════════════════════════════════════════
   GDS — archivage automatique des exports

   Chaque export listé dans EXPORTS et déposé depuis le sommaire
   est aussi copié dans son dossier de l'Archive, sous un nom
   propre daté. Un seul fichier par jour : le premier déposé est
   gardé, les suivants du même jour sont ignorés (« déjà archivé »).

   Chargé automatiquement par config.js sur le sommaire : il
   survit donc aux nouvelles versions de sommaire.html.
   Il ajoute aussi la tuile « Seuil max stockage » si elle manque.

   Ajouter un export = ajouter une entrée dans EXPORTS.

   Fichiers refusés au dépôt (REFUSES) : ils n'arrivent jamais
   sur le serveur, plus de ménage à faire.
   ═══════════════════════════════════════════════════════════ */
(function(){
  if(window.__gdsStockStatus) return;          // déjà chargé
  if(typeof window.envoyer !== 'function' || typeof FAMILLES === 'undefined') return;   // pas le sommaire
  window.__gdsStockStatus = true;

  /* tuile Implantation → Seuil max stockage */
  var imp = FAMILLES.filter(function(f){ return f.id === 'implantation'; })[0];
  if(imp && !imp.outils.some(function(o){ return o.f === 'SEUIL_MAX_2026.html'; })){
    imp.outils.push({ nom:'Seuil max stockage', f:'SEUIL_MAX_2026.html', ico:'courbe', roles:['admin','admin_restreint'] });
    if(location.hash === '#implantation' && typeof ouvrirVue === 'function') ouvrirVue('implantation');
  }

  /* ── dates ── */
  function aujourdhui(){                         // AAAA-MM-JJ, heure de Paris
    return new Date().toLocaleDateString('sv-SE', { timeZone:'Europe/Paris' });
  }
  function dateDuNom(nom){                       // JJ-MM-AAAA dans le nom -> AAAA-MM-JJ
    var m = /(\d{2})-(\d{2})-(\d{4})/.exec(nom);
    return m ? m[3] + '-' + m[2] + '-' + m[1] : null;
  }
  function depot(nom){ var m = /_FR_STOREDEPOT_(\d+)/i.exec(nom); return m ? m[1] : '00171'; }
  var fr = function(j){ return j.split('-').reverse().join('/'); };

  /* ── exports archivés ──
     jour(nom, lireTexte) renvoie la journée du fichier (AAAA-MM-JJ)
     nom(jour, fichier)   renvoie le chemin dans l'Archive          */
  var EXPORTS = [
    { libelle:'StockStatus', dossier:'StockStatus/',
      motif:/^StockStatus_FR_STOREDEPOT_\d+_\d{2}-\d{2}-\d{4}.*\.csv$/i,
      jour: function(n){ return dateDuNom(n); },
      nom:  function(j, n){ return 'StockStatus/StockStatus_FR_STOREDEPOT_' + depot(n) + '_' + j.split('-').reverse().join('-') + '.csv'; } },

    /* même dossier et même nom que l'outil Mouvements CT PREP :
       la journée est la dernière date de mouvement contenue dans le fichier */
    { libelle:'Mouvements', dossier:'MVTS/',
      motif:/^M_DEPOT[ _]?report_Mvt[ _]?stock_Table.*\.csv$/i,
      jour: async function(n, lire){
        var t = await lire();
        var j = (t.match(/^[^,;\n]*[,;](\d{4}-\d{2}-\d{2})[,;]/gm) || []).map(function(l){ return l.match(/\d{4}-\d{2}-\d{2}/)[0]; }).sort();
        return j.length ? j[j.length - 1] : null;
      },
      nom:  function(j){ return 'MVTS/M_DEPOT report_Mvt stock_Table_' + j + '.csv'; } },

    /* pas de date dans le nom : journée du dépôt */
    { libelle:'Structure', dossier:'Structure/',
      motif:/^M_DEPOT[ _]?report_Emplacement[ _]de[ _]stk.*\.csv$/i,
      jour: function(){ return aujourdhui(); },
      nom:  function(j){ return 'Structure/M_DEPOT report_Emplacement de stk_Table_' + j + '.csv'; } },

    { libelle:'StorageGroupMappings', dossier:'StorageGroupMappings/',
      motif:/^StorageGroupMappings_FR_STOREDEPOT_.*\.csv$/i,
      jour: function(n){ return dateDuNom(n) || aujourdhui(); },
      nom:  function(j, n){ return 'StorageGroupMappings/StorageGroupMappings_FR_STOREDEPOT_' + depot(n) + '_' + j.split('-').reverse().join('-') + '.csv'; } }
  ];

  /* ── fichiers refusés : sélectionnés par erreur dans les téléchargements ── */
  var REFUSES = [
    { motif:/^StockChange/i, raison:'Les fichiers StockChanges ne sont pas utilisés dans GDS.',
      conseil:'Vérifie dans tes téléchargements que tu as pris le bon fichier, puis recommence.' }
  ];

  /* fenêtre d'alerte : reste affichée jusqu'au clic sur « Compris » */
  function alerteRefus(nom, x){
    var ancien = document.getElementById('gds-refus'); if(ancien) ancien.remove();
    var esc = function(t){ return String(t).replace(/[&<>"]/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); };
    var o = document.createElement('div');
    o.id = 'gds-refus';
    o.setAttribute('role', 'alertdialog');
    o.style.cssText = 'position:fixed;inset:0;z-index:99999;background:rgba(20,32,60,.55);display:flex;align-items:center;justify-content:center;padding:16px;font-family:"DM Sans",system-ui,sans-serif';
    o.innerHTML =
      '<div style="background:#fff;border-radius:16px;max-width:460px;width:100%;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,.35)">' +
        '<div style="background:linear-gradient(135deg,#b8342f,#d9534f);color:#fff;padding:18px 22px;display:flex;align-items:center;gap:14px">' +
          '<svg width="34" height="34" viewBox="0 0 48 48"><path d="M24 4 2 43h44z" fill="rgba(255,255,255,.25)"/><path d="M24 4 2 43h44z" fill="none" stroke="#fff" stroke-width="3" stroke-linejoin="round"/><path d="M22 17h4v14h-4zM22 34h4v4h-4z" fill="#fff"/></svg>' +
          '<div><div style="font-size:18px;font-weight:700">Dépôt refusé</div>' +
          '<div style="font-size:13px;opacity:.9">Tentative de dépôt échouée : mauvais fichier</div></div>' +
        '</div>' +
        '<div style="padding:18px 22px;color:#1a2e55;font-size:14px;line-height:1.5">' +
          '<div style="font-family:\'DM Mono\',monospace;font-size:12px;background:#fdecec;color:#8f1d20;border-radius:8px;padding:8px 10px;word-break:break-all;margin-bottom:12px">' + esc(nom) + '</div>' +
          '<div>' + esc(x.raison) + ' Il n\'a pas été envoyé.</div>' +
          (x.conseil ? '<div style="margin-top:8px;color:#51607c">' + x.conseil + '</div>' : '') +
          '<div style="text-align:right;margin-top:18px"><button type="button" style="border:0;border-radius:10px;padding:10px 22px;font:600 14px \'DM Sans\',sans-serif;color:#fff;cursor:pointer;background:linear-gradient(180deg,#2a4576,#1a2e55)">Compris</button></div>' +
        '</div>' +
      '</div>';
    var fermer = function(){ o.remove(); document.removeEventListener('keydown', clavier); };
    var clavier = function(e){ if(e.key === 'Escape' || e.key === 'Enter') fermer(); };
    o.querySelector('button').onclick = fermer;
    document.addEventListener('keydown', clavier);
    document.body.appendChild(o);
    o.querySelector('button').focus();
  }

  function exportDe(nom){ return EXPORTS.filter(function(e){ return e.motif.test(nom || ''); })[0] || null; }

  async function archiver(f, e){
    var jour = await e.jour(f.name, function(){ return f.text(); });
    if(!jour){ dire(e.libelle + ' : date introuvable, non archivé', 'err'); return; }
    var cible = e.nom(jour, f.name);
    var r = await fetch(API + '/archive', {
      method:'POST', headers: auth({'Content-Type':'application/json'}), body: JSON.stringify({prefix: e.dossier})
    });
    if(!r.ok) throw new Error('liste');
    var d = await r.json();
    if((d.files || []).some(function(x){ return x.fileName === cible; })){
      dire(e.libelle + ' du ' + fr(jour) + ' déjà archivé', 'ok'); return;
    }
    r = await fetch(API + '/archive/' + encodeURIComponent(cible), {
      method:'POST', headers: auth({'Content-Type':'text/csv'}), body: f
    });
    if(!r.ok) throw new Error('envoi');
    dire(e.libelle + ' du ' + fr(jour) + ' archivé dans ' + e.dossier.slice(0, -1), 'ok');
    if(typeof charges !== 'undefined') charges.archive = false;
  }

  var origine = window.envoyer;
  window.envoyer = async function(f){
    var refus = f && REFUSES.filter(function(x){ return x.motif.test(f.name); })[0];
    if(refus){
      alerteRefus(f.name, refus);
      var c = document.getElementById('choix-fichier'); if(c) c.value = '';
      return;
    }
    var res = await origine.apply(this, arguments);
    var e = f && exportDe(f.name);
    if(e){
      try { await archiver(f, e); }
      catch(err){ dire(e.libelle + ' non archivé', 'err'); }
    }
    return res;
  };
})();
