/* ═══════════════════════════════════════════════════════════
   GDS — configuration

   Ce fichier est le SEUL à modifier avec tes propres valeurs.
   Les pages le lisent au chargement.

   Une fois rempli, ne le remplace plus : les nouvelles versions
   de index.html et sommaire.html n'y touchent pas.
   ═══════════════════════════════════════════════════════════ */

var GDS = {

  /* Adresse de la fonction Supabase */
  API: 'https://bnpsqbcuuvoxbhkywxoo.supabase.co/functions/v1/gds-api',

  /* Clé publique Supabase (publishable key).
     Prévue pour être visible : elle ne donne accès à rien. */
  CLE_PUBLIQUE: 'sb_publishable_nZb2iulM5j2WGaFfADeHHA_o91Fyzcb',

  /* Dossier des outils. Vide = même dossier que les pages. */
  BASE: '',

  /* Onglet de demande d'accès sur la page de connexion */
  DEMANDE_ACCES: false

};

/* ═══════════════════════════════════════════════════════════
   Modules permanents du sommaire
   Chargés ici pour ne jamais disparaître quand sommaire.html
   est remplacé par une nouvelle version.
   - gds_stockstatus.js : chaque StockStatus déposé est aussi
     sauvegardé dans Archive/StockStatus/ (un par jour) et la
     tuile « Seuil max stockage » est ajoutée à Implantation.
   ═══════════════════════════════════════════════════════════ */
window.addEventListener('load', function(){
  if(typeof envoyer !== 'function' || typeof FAMILLES === 'undefined') return;   // pages autres que le sommaire
  if(window.__gdsStockStatus) return;
  var s = document.createElement('script');
  s.src = (GDS.BASE || '') + 'gds_stockstatus.js?v=' + Date.now();
  document.head.appendChild(s);
});
