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
