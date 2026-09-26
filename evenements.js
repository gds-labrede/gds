/* ══════════════════════════════════════════════════════════════
   GDS — ÉVÉNEMENTS DU CALENDRIER
   Animations et phrase du jour selon la date.
   Fichier indépendant : chargé par sommaire.html.
   Test sans attendre la date : sommaire.html?fete=noel
   (anniversaire, noel, nouvelan, octobre, chandeleur, valentin, femmes,
    printemps, poisson, paques, mai, musique, aucune)
   ══════════════════════════════════════════════════════════════ */
(function(){
'use strict';

/* ── Dessins (SVG, aucun emoji) ─────────────────────────────── */
var D = {
  flocon: function(c){ c = c || '#ffffff';
    var b = '<g stroke="'+c+'" stroke-width="3.2" stroke-linecap="round" fill="none">' +
      '<path d="M32 6v52"/><path d="M32 14l-7-6M32 14l7-6M32 50l-7 6M32 50l7 6"/></g>';
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">' +
      '<g filter="drop-shadow(0 0 1.5px rgba(40,80,150,.75))">' +
      b + '<g transform="rotate(60 32 32)">'+b+'</g><g transform="rotate(120 32 32)">'+b+'</g>' +
      '<circle cx="32" cy="32" r="4" fill="'+c+'"/></g></svg>'; },

  boule: function(c1, c2){
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">' +
      '<defs><radialGradient id="g" cx=".35" cy=".35" r=".75"><stop offset="0" stop-color="#fff" stop-opacity=".9"/>' +
      '<stop offset=".18" stop-color="'+c1+'"/><stop offset="1" stop-color="'+c2+'"/></radialGradient></defs>' +
      '<path d="M32 2v8" stroke="#b08a2e" stroke-width="1.5"/>' +
      '<rect x="26" y="9" width="12" height="7" rx="1.5" fill="#d9b44a" stroke="#9c7a22"/>' +
      '<circle cx="32" cy="38" r="22" fill="url(#g)"/>' +
      '<path d="M11 36c7 5 35 5 42 0" stroke="#fff" stroke-width="2.5" fill="none" opacity=".55"/>' +
      '<g fill="#fff" opacity=".7"><circle cx="20" cy="46" r="1.5"/><circle cx="32" cy="48" r="1.5"/><circle cx="44" cy="46" r="1.5"/></g></svg>'; },

  sapin: function(){
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">' +
      '<rect x="28" y="52" width="8" height="9" fill="#7a4a22"/>' +
      '<path d="M32 8L14 30h8L10 44h9L6 56h52L45 44h9L42 30h8z" fill="#2f8a47" stroke="#1d6632" stroke-width="1.5" stroke-linejoin="round"/>' +
      '<path d="M20 36c8 3 16 2 24-3M16 49c11 4 22 3 32-2" stroke="#f2d06b" stroke-width="1.8" fill="none"/>' +
      '<g><circle cx="26" cy="27" r="2.6" fill="#e63946"/><circle cx="38" cy="34" r="2.6" fill="#1d9bf0"/>' +
      '<circle cx="22" cy="44" r="2.6" fill="#f4b400"/><circle cx="40" cy="47" r="2.6" fill="#e63946"/><circle cx="31" cy="40" r="2.2" fill="#fff"/></g>' +
      '<path d="M32 1l2.4 5 5.4.6-4 3.6 1.2 5.3L32 12.8l-5 2.7 1.2-5.3-4-3.6 5.4-.6z" fill="#ffd43b" stroke="#e0a800"/></svg>'; },

  pereNoel: function(){
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">' +
      '<path d="M14 26C16 12 28 5 40 8c6 2 10 8 14 16l-6 3c-2-5-4-8-7-10z" fill="#d62828"/>' +
      '<circle cx="54" cy="26" r="5" fill="#fff" stroke="#dde3ea"/>' +
      '<path d="M18 36c0-5 6-8 14-8s14 3 14 8v6c0 9-6 18-14 18s-14-9-14-18z" fill="#fff" stroke="#dde3ea" stroke-width="1.2"/>' +
      '<ellipse cx="32" cy="36" rx="11" ry="9" fill="#f6c9a8"/>' +
      '<circle cx="27.5" cy="34" r="1.8" fill="#16203a"/><circle cx="36.5" cy="34" r="1.8" fill="#16203a"/>' +
      '<circle cx="24" cy="39" r="2.6" fill="#f29c9c" opacity=".7"/><circle cx="40" cy="39" r="2.6" fill="#f29c9c" opacity=".7"/>' +
      '<ellipse cx="32" cy="38.5" rx="2.6" ry="2.2" fill="#e88a7a"/>' +
      '<path d="M22 43c3-2 6-2 10 0 4-2 7-2 10 0-2 3-6 4-10 2-4 2-8 1-10-2z" fill="#fff" stroke="#dde3ea"/>' +
      '<rect x="12" y="24" width="40" height="8" rx="4" fill="#fff" stroke="#dde3ea"/></svg>'; },

  crepe: function(){ /* crêpe qui saute au-dessus de la poêle */
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">' +
      '<defs><radialGradient id="g" cx=".45" cy=".4" r=".7"><stop offset="0" stop-color="#fae3a8"/>' +
      '<stop offset=".8" stop-color="#eebd6c"/><stop offset="1" stop-color="#cf8a3a"/></radialGradient></defs>' +
      '<g transform="rotate(-10 32 18)"><path d="M6 18c4-7 16-10 26-10s22 3 26 10c-4 5-14 8-26 8S10 23 6 18z" fill="url(#g)" stroke="#b36a24" stroke-width="1.3"/>' +
      '<g fill="#b8702c" opacity=".45"><ellipse cx="20" cy="15" rx="3" ry="1.4"/><ellipse cx="33" cy="13" rx="3.6" ry="1.5"/>' +
      '<ellipse cx="45" cy="17" rx="3" ry="1.3"/><ellipse cx="28" cy="20" rx="2.6" ry="1.1"/><ellipse cx="40" cy="21" rx="2" ry="1"/></g></g>' +
      '<path d="M22 28c-1 2-1 4 0 6M32 28v6M42 27c1 2 1 4 0 6" stroke="#98a1b5" stroke-width="1.4" stroke-linecap="round" fill="none" opacity=".7"/>' +
      '<ellipse cx="30" cy="46" rx="22" ry="7" fill="#3a3f4a"/>' +
      '<path d="M8 46c0 6 10 11 22 11s22-5 22-11" fill="#23262d"/>' +
      '<ellipse cx="30" cy="45" rx="18" ry="5" fill="#16181d"/>' +
      '<path d="M50 48l12 5" stroke="#23262d" stroke-width="4.5" stroke-linecap="round"/>' +
      '<path d="M14 44c4-2 10-3 16-3" stroke="#fff" stroke-width="1.2" opacity=".25" fill="none"/></svg>'; },

  pileCrepes: function(){ /* pile de crêpes sur assiette */
    var c = '';
    for (var k = 0; k < 6; k++){
      var y = 44 - k * 4.2;
      c += '<path d="M10 '+y+'c2-4 12-6 22-6s20 2 22 6c-2 4-12 6-22 6s-20-2-22-6z" fill="'+(k % 2 ? '#f2cb82' : '#eab96a')+'" stroke="#b36a24" stroke-width="1"/>';
    }
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">' +
      '<ellipse cx="32" cy="50" rx="29" ry="8" fill="#fff" stroke="#c9d2e0" stroke-width="1.4"/>' +
      '<ellipse cx="32" cy="49" rx="20" ry="4.5" fill="#eef1f6"/>' + c +
      '<path d="M26 18c-2 4 2 6 0 10M38 17c2 4-2 6 0 10" stroke="#5a2e12" stroke-width="2.4" fill="none" stroke-linecap="round"/>' +
      '<g fill="#fff"><circle cx="24" cy="21" r=".9"/><circle cx="32" cy="20" r="1"/><circle cx="40" cy="22" r=".9"/><circle cx="30" cy="23" r=".8"/></g></svg>'; },

  crepePliee: function(){ /* crêpe pliée en quatre + chocolat */
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">' +
      '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f9dd9c"/>' +
      '<stop offset="1" stop-color="#d9964a"/></linearGradient></defs>' +
      '<path d="M8 54L8 12c0 0 3-1 6 1 20 2 36 18 38 38 2 3 1 3 1 3z" fill="url(#g)" stroke="#b36a24" stroke-width="1.6" stroke-linejoin="round"/>' +
      '<path d="M8 54L14 18c14 4 26 16 30 30z" fill="#efc47c" stroke="#b36a24" stroke-width="1.2" opacity=".9"/>' +
      '<g fill="#b8702c" opacity=".4"><circle cx="20" cy="30" r="3"/><circle cx="30" cy="40" r="3.6"/><circle cx="18" cy="44" r="2.4"/><circle cx="38" cy="30" r="2.2"/></g>' +
      '<path d="M12 22c6 6 4 10 10 12s6 8 12 10 6 6 10 8" stroke="#5a2e12" stroke-width="3" fill="none" stroke-linecap="round"/>' +
      '<g fill="#fff"><circle cx="24" cy="24" r="1"/><circle cx="32" cy="34" r="1.1"/><circle cx="22" cy="40" r=".9"/><circle cx="36" cy="44" r="1"/></g></svg>'; },

  coeur: function(c1, c2){ c1 = c1 || '#e63950'; c2 = c2 || '#a8162e';
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">' +
      '<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+c1+'"/>' +
      '<stop offset="1" stop-color="'+c2+'"/></linearGradient></defs>' +
      '<path d="M32 56S6 40 6 22C6 13 13 7 21 7c5 0 9 3 11 7 2-4 6-7 11-7 8 0 15 6 15 15 0 18-26 34-26 34z" fill="url(#g)"/>' +
      '<path d="M14 18c1-4 4-6 8-6" stroke="#fff" stroke-width="3.5" stroke-linecap="round" fill="none" opacity=".6"/></svg>'; },

  ruban: function(){
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">' +
      '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff9cc2"/>' +
      '<stop offset="1" stop-color="#e0457f"/></linearGradient></defs>' +
      '<path d="M32 6c-8 0-12 6-12 12 0 5 3 10 6 15L14 58l8 2 10-17 10 17 8-2-12-25c3-5 6-10 6-15 0-6-4-12-12-12zm0 8c3 0 4 2 4 4 0 3-2 7-4 10-2-3-4-7-4-10 0-2 1-4 4-4z" fill="url(#g)" stroke="#c7336c" stroke-width="1.2"/>' +
      '<path d="M24 16c1-4 4-6 7-6" stroke="#fff" stroke-width="2.5" stroke-linecap="round" fill="none" opacity=".6"/></svg>'; },

  fleur: function(c, coeur){ coeur = coeur || '#f7c948';
    var p = '';
    for (var i = 0; i < 5; i++)
      p += '<ellipse cx="32" cy="17" rx="9" ry="13" fill="'+c+'" transform="rotate('+(i*72)+' 32 32)"/>';
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">' +
      '<g stroke="rgba(0,0,0,.12)" stroke-width="1">'+p+'</g>' +
      '<circle cx="32" cy="32" r="7.5" fill="'+coeur+'" stroke="#d79a1c" stroke-width="1.2"/>' +
      '<circle cx="30" cy="30" r="2.2" fill="#fff" opacity=".6"/></svg>'; },

  mimosa: function(){
    var b = '', pts = [[32,16],[22,22],[42,22],[27,31],[38,31],[18,33],[46,33],[32,40],[24,42],[40,42]];
    pts.forEach(function(p){
      b += '<circle cx="'+p[0]+'" cy="'+p[1]+'" r="6" fill="#ffd43b" stroke="#e9a800" stroke-width="1"/>' +
           '<circle cx="'+(p[0]-1.8)+'" cy="'+(p[1]-1.8)+'" r="1.8" fill="#fff6c2"/>';
    });
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">' +
      '<path d="M32 60V44M32 50l-10 6M32 52l10 5" stroke="#6b9b3a" stroke-width="2.5" stroke-linecap="round" fill="none"/>' + b + '</svg>'; },

  venus: function(){
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">' +
      '<g fill="none" stroke="#7b3fb4" stroke-width="6" stroke-linecap="round">' +
      '<circle cx="32" cy="24" r="15"/><path d="M32 39v20M22 50h20"/></g>' +
      '<path d="M22 17c2-4 6-6 10-6" stroke="#d7b8f3" stroke-width="3" stroke-linecap="round" fill="none"/></svg>'; },

  poisson: function(c1, c2){
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">' +
      '<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+c1+'"/>' +
      '<stop offset="1" stop-color="'+c2+'"/></linearGradient></defs>' +
      '<path d="M48 32l12-12v24z" fill="'+c2+'"/>' +
      '<path d="M4 32c8-14 22-18 34-14 5 2 9 6 11 14-2 8-6 12-11 14-12 4-26 0-34-14z" fill="url(#g)"/>' +
      '<path d="M26 20c4 6 4 18 0 24M34 20c3 6 3 18 0 24" stroke="#fff" stroke-width="1.6" opacity=".45" fill="none"/>' +
      '<path d="M24 14c6-2 12 0 14 4" fill="'+c2+'"/>' +
      '<circle cx="14" cy="29" r="3.6" fill="#fff"/><circle cx="13.2" cy="29" r="2" fill="#16203a"/>' +
      '<path d="M8 36c2 1 4 1 5 0" stroke="#16203a" stroke-width="1.4" fill="none" stroke-linecap="round"/></svg>'; },

  oeuf: function(c1, c2, c3){
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">' +
      '<defs><clipPath id="c"><path d="M32 4C20 4 12 24 12 38c0 13 9 22 20 22s20-9 20-22C52 24 44 4 32 4z"/></clipPath>' +
      '<radialGradient id="h" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#fff" stop-opacity=".55"/>' +
      '<stop offset=".5" stop-color="#fff" stop-opacity="0"/></radialGradient></defs>' +
      '<g clip-path="url(#c)"><rect width="64" height="64" fill="'+c1+'"/>' +
      '<path d="M0 26l8-6 8 6 8-6 8 6 8-6 8 6 8-6 8 6v7l-8-6-8 6-8-6-8 6-8-6-8 6-8-6-8 6z" fill="'+c2+'"/>' +
      '<rect y="42" width="64" height="5" fill="'+c3+'"/>' +
      '<g fill="'+c3+'"><circle cx="22" cy="14" r="2.5"/><circle cx="36" cy="12" r="2"/><circle cx="30" cy="54" r="2.5"/><circle cx="42" cy="53" r="2"/></g>' +
      '<rect width="64" height="64" fill="url(#h)"/></g>' +
      '<path d="M32 4C20 4 12 24 12 38c0 13 9 22 20 22s20-9 20-22C52 24 44 4 32 4z" fill="none" stroke="rgba(0,0,0,.18)" stroke-width="1.2"/></svg>'; },

  muguet: function(){
    var cl = '', pts = [[40,12],[46,22],[48,33],[46,44]];
    pts.forEach(function(p){
      cl += '<path d="M'+p[0]+' '+(p[1]-6)+'q-4 0-4 4" stroke="#4f8a34" stroke-width="1.4" fill="none"/>' +
        '<path d="M'+(p[0]-11)+' '+(p[1]+6)+'c0-7 3-10 7-10s7 3 7 10c-1.5-1.5-3-1.5-4.6 0-1-1.6-3.8-1.6-4.8 0-1.6-1.5-3.1-1.5-4.6 0z" fill="#fff" stroke="#9cb98c" stroke-width="1.1"/>';
    });
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">' +
      '<path d="M14 62C8 40 12 20 22 6c-3 20-2 38 2 56z" fill="#4f9a45"/>' +
      '<path d="M24 62C26 40 30 20 40 4" stroke="#4f8a34" stroke-width="2.2" fill="none" stroke-linecap="round"/>' +
      cl + '</svg>'; },

  ballon: function(c1, c2){
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">' +
      '<defs><radialGradient id="g" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#fff" stop-opacity=".85"/>' +
      '<stop offset=".2" stop-color="'+c1+'"/><stop offset="1" stop-color="'+c2+'"/></radialGradient></defs>' +
      '<path d="M32 44c-2 6 3 8 0 12s2 6 0 8" stroke="#8a93a6" stroke-width="1.2" fill="none"/>' +
      '<ellipse cx="32" cy="23" rx="15" ry="19" fill="url(#g)"/>' +
      '<path d="M29 41.5l3 3 3-3z" fill="'+c2+'"/></svg>'; },

  confetti: function(){
    var c = ['#e63946', '#f4b400', '#1d9bf0', '#2bb673', '#8e5bd6', '#f07d1a'], h = '';
    for (var k = 0; k < 9; k++){
      var x = 6 + (k * 37) % 52, y = 6 + (k * 23) % 52, r = (k * 47) % 180;
      h += k % 3 ? '<rect x="'+x+'" y="'+y+'" width="7" height="3.4" rx="1" fill="'+c[k % 6]+'" transform="rotate('+r+' '+x+' '+y+')"/>'
                 : '<circle cx="'+x+'" cy="'+y+'" r="2.6" fill="'+c[k % 6]+'"/>';
    }
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">' + h + '</svg>'; },

  gateau: function(){
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">' +
      '<rect x="10" y="32" width="44" height="24" rx="4" fill="#f0c48a"/>' +
      '<path d="M10 40c5 4 10 4 15 0s10-4 14 0 10 4 15 0v-4c0-2-2-4-4-4H14c-2 0-4 2-4 4z" fill="#fff"/>' +
      '<rect x="10" y="50" width="44" height="6" rx="2" fill="#d46c1a"/>' +
      '<g fill="#e63946"><circle cx="20" cy="46" r="2"/><circle cx="32" cy="47" r="2"/><circle cx="44" cy="46" r="2"/></g>' +
      '<path d="M22 32V20M32 32V18M42 32V20" stroke="#1a2e55" stroke-width="3"/>' +
      '<g fill="#f7a531"><path d="M22 10c3 3 3 6 0 8-3-2-3-5 0-8z"/><path d="M32 8c3 3 3 6 0 8-3-2-3-5 0-8z"/><path d="M42 10c3 3 3 6 0 8-3-2-3-5 0-8z"/></g></svg>'; },

  note: function(c){
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">' +
      '<ellipse cx="22" cy="48" rx="10" ry="7.5" transform="rotate(-20 22 48)" fill="'+c+'"/>' +
      '<path d="M30 46V8c6 8 18 10 16 24-2-7-8-9-12-10v24z" fill="'+c+'"/></svg>'; },

  doubleNote: function(c){
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">' +
      '<ellipse cx="16" cy="50" rx="9" ry="6.5" transform="rotate(-20 16 50)" fill="'+c+'"/>' +
      '<ellipse cx="46" cy="44" rx="9" ry="6.5" transform="rotate(-20 46 44)" fill="'+c+'"/>' +
      '<path d="M22 48V14l32-7v35h-4V16l-24 5v27z" fill="'+c+'"/></svg>'; },

  guitare: function(){
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><g transform="rotate(35 32 32)">' +
      '<rect x="29.5" y="2" width="5" height="30" rx="1.5" fill="#6b3f1d"/>' +
      '<rect x="27" y="0" width="10" height="7" rx="2" fill="#3b2412"/>' +
      '<path d="M32 26c-8 0-12 5-11 11 1 3 3 4 3 6-3 2-6 5-5 10 1 6 7 9 13 9s12-3 13-9c1-5-2-8-5-10 0-2 2-3 3-6 1-6-3-11-11-11z" fill="#e39a3b" stroke="#9a5a1c" stroke-width="1.4"/>' +
      '<circle cx="32" cy="42" r="4.5" fill="#3b2412"/><rect x="27" y="53" width="10" height="2.5" fill="#3b2412"/>' +
      '<path d="M31 6v48M33 6v48" stroke="#f3e2c0" stroke-width=".6"/></g></svg>'; },

  tambour: function(){
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">' +
      '<path d="M10 24v22c0 5 10 9 22 9s22-4 22-9V24z" fill="#d1453b"/>' +
      '<path d="M10 24l9 29M22 25l8 30M42 25l-8 30M54 24l-9 29" stroke="#f2d27a" stroke-width="2"/>' +
      '<ellipse cx="32" cy="24" rx="22" ry="8" fill="#f6efe2" stroke="#b9a98b" stroke-width="1.5"/>' +
      '<path d="M40 6l-10 16M52 10L36 22" stroke="#7a4a22" stroke-width="3" stroke-linecap="round"/>' +
      '<circle cx="40" cy="6" r="3" fill="#f6efe2"/><circle cx="52" cy="10" r="3" fill="#f6efe2"/></svg>'; },

  etoile: function(c){
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">' +
      '<path d="M32 4l6 20 20 8-20 8-6 20-6-20-20-8 20-8z" fill="'+c+'"/></svg>'; }
};

/* ── Calendrier ────────────────────────────────────────────── */
var FETES = {
  anniversaire: {
    nom: 'Anniversaire', mouvement: 'monte', nombre: 26, taille: [30, 56], vitesse: [0.4, 1.0], droit: true,
    formes: [], icone: '', phrase: ''
  },
  noel: {
    nom: 'Noël', mouvement: 'chute', nombre: 55, taille: [14, 44], vitesse: [0.5, 1.4],
    formes: [D.flocon('#8dbbef'), D.flocon('#a9ccf3'), D.flocon('#6fa3e0'), D.flocon('#8dbbef'), D.flocon('#a9ccf3'), D.flocon('#6fa3e0'),
             D.boule('#e63946', '#8f1020'), D.boule('#f4c542', '#a87a0c'), D.boule('#3a86ff', '#123f8f'), D.boule('#2bb673', '#0f6b3c'),
             D.sapin(), D.pereNoel()],
    grand: { 10: 1.6, 11: 1.8 },
    phrase: "Joyeux Noël à toute l'équipe GDS La Brède !", icone: D.sapin()
  },
  nouvelan: {
    nom: 'Nouvel An', mouvement: 'artifice', nombre: 0,
    formes: [], icone: D.etoile('#ffd166'),
    phrase: function(d){
      return d.getMonth() === 11
        ? "Bon réveillon à toute l'équipe, rendez-vous en " + (d.getFullYear() + 1) + ' !'
        : 'Bonne année ' + d.getFullYear() + " à toute l'équipe GDS La Brède !";
    }
  },
  octobre: {
    nom: 'Octobre Rose', mouvement: 'monte', nombre: 16, taille: [26, 46], vitesse: [0.25, 0.6],
    formes: [D.ruban()], rose: true, icone: D.ruban(),
    phrase: 'Octobre Rose : tous mobilisés contre le cancer du sein'
  },
  chandeleur: {
    nom: 'Chandeleur', mouvement: 'monte', nombre: 16, taille: [40, 64], vitesse: [0.3, 0.7], droit: true,
    formes: [D.crepe(), D.crepePliee(), D.pileCrepes(), D.crepe()], icone: D.crepe(),
    phrase: "C'est la Chandeleur : bonne dégustation de crêpes à tous !"
  },
  valentin: {
    nom: 'Saint-Valentin', mouvement: 'monte', nombre: 26, taille: [16, 40], vitesse: [0.35, 0.9],
    formes: [D.coeur(), D.coeur('#ff7a9a', '#d63a64'), D.coeur('#ff4d6d', '#b0122f')],
    icone: D.coeur(), phrase: 'Joyeuse Saint-Valentin à tous !'
  },
  femmes: {
    nom: 'Journée des femmes', mouvement: 'monte', nombre: 20, taille: [24, 44], vitesse: [0.3, 0.7],
    formes: [D.mimosa(), D.mimosa(), D.venus()], icone: D.venus(),
    phrase: 'Journée internationale des droits des femmes : merci à toutes nos collègues !'
  },
  printemps: {
    nom: 'Printemps', mouvement: 'monte', nombre: 24, taille: [20, 40], vitesse: [0.3, 0.8],
    formes: [D.fleur('#ff9ec4'), D.fleur('#ffffff'), D.fleur('#c9a7ff'), D.fleur('#ffcf5c', '#e0762b'), D.fleur('#8fd1ff')],
    icone: D.fleur('#ff9ec4'), phrase: 'Le printemps est arrivé ! Belle saison à toute l’équipe.'
  },
  poisson: {
    nom: "Poisson d'avril", mouvement: 'nage', nombre: 14, taille: [34, 58], vitesse: [0.5, 1.2],
    formes: [D.poisson('#ffb347', '#e0761c'), D.poisson('#6ec6ff', '#1f7fc2'), D.poisson('#ff7aa8', '#c93a6d'), D.poisson('#8be07a', '#3d9a2e')],
    icone: D.poisson('#ffb347', '#e0761c'), phrase: "Poisson d'avril ! Méfiez-vous des blagues aujourd'hui…"
  },
  paques: {
    nom: 'Pâques', mouvement: 'monte', nombre: 18, taille: [26, 46], vitesse: [0.3, 0.7],
    formes: [D.oeuf('#ffd1dc', '#ff7aa8', '#ffffff'), D.oeuf('#c8f0d0', '#4cb86a', '#ffe066'),
             D.oeuf('#d6e6ff', '#4a7fe0', '#ffd166'), D.oeuf('#fff0b3', '#f0913f', '#8f5bd6')],
    icone: D.oeuf('#fff0b3', '#f0913f', '#8f5bd6'), phrase: 'Joyeuses Pâques à toute l’équipe !'
  },
  mai: {
    nom: '1er Mai', mouvement: 'monte', nombre: 18, taille: [28, 46], vitesse: [0.3, 0.7],
    formes: [D.muguet(), D.muguet(), D.coeur('#ff7a9a', '#d63a64')], icone: D.muguet(),
    phrase: 'Bonne fête du travail… et bonne fête à toutes les mamans !'
  },
  musique: {
    nom: 'Fête de la musique', mouvement: 'monte', nombre: 22, taille: [26, 48], vitesse: [0.35, 0.9],
    formes: [D.note('#1a2e55'), D.doubleNote('#d46c1a'), D.note('#d46c1a'), D.doubleNote('#1a2e55'), D.guitare(), D.tambour()],
    icone: D.doubleNote('#ffffff'), phrase: "C'est la fête de la musique ! Bonne soirée en musique à tous."
  }
};

function feteDuJour(d){
  var m = d.getMonth() + 1, j = d.getDate();
  if ((m === 12 && (j === 24 || j === 25))) return 'noel';
  if ((m === 12 && j === 31) || (m === 1 && j === 1)) return 'nouvelan';
  if (m === 10) return 'octobre';
  if (m === 2 && j === 2) return 'chandeleur';
  if (m === 2 && j === 14) return 'valentin';
  if (m === 3 && j === 8) return 'femmes';
  if (m === 3 && j === 20) return 'printemps';
  if (m === 4 && j === 1) return 'poisson';
  if (m === 4 && j === 22) return 'paques';
  if (m === 5 && j === 1) return 'mai';
  if (m === 6 && j === 21) return 'musique';
  return null;
}

/* ── Moteur d'animation (canvas plein écran, ne bloque aucun clic) ── */
var toile, ctx, dpr = 1, L = 0, H = 0, parts = [], fusees = [], etincelles = [],
    images = [], fete = null, cle = null, anim = null, actif = true, tNouvelleFusee = 0;

function img(svg){
  var i = new Image();
  i.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  return i;
}
function hasard(a, b){ return a + Math.random() * (b - a); }

function redim(){
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  L = window.innerWidth; H = window.innerHeight;
  toile.width = L * dpr; toile.height = H * dpr;
  toile.style.width = L + 'px'; toile.style.height = H + 'px';
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function nouvellePart(debut){
  var f = fete, t = hasard(f.taille[0], f.taille[1]);
  var ix = Math.floor(Math.random() * images.length);
  t *= (f.grand && f.grand[ix]) || 1;
  var p = { im: images[ix], t: t,
    v: hasard(f.vitesse[0], f.vitesse[1]) * (t / f.taille[1] * 0.5 + 0.5),
    ph: Math.random() * 6.28, amp: hasard(0.3, 1.2), r: hasard(-0.4, 0.4), vr: hasard(-0.008, 0.008),
    a: hasard(0.55, 0.95) };
  if (f.droit){ p.r = hasard(-0.12, 0.12); p.vr = 0; }
  if (f.mouvement === 'chute'){ p.x = Math.random() * L; p.y = debut ? Math.random() * H : -t; }
  else if (f.mouvement === 'nage'){
    p.dir = Math.random() < 0.5 ? 1 : -1;
    p.x = debut ? Math.random() * L : (p.dir > 0 ? -t : L + t);
    p.y = hasard(80, H - 40); p.r = 0; p.vr = 0;
  } else { p.x = Math.random() * L; p.y = debut ? hasard(H * 0.2, H + t) : H + t; }
  return p;
}

var COULEURS_FEU = ['#f4b400', '#e63946', '#1d9bf0', '#8e5bd6', '#2bb673', '#f07d1a', '#e0457f'];
function fusee(){
  fusees.push({ x: hasard(L * 0.12, L * 0.88), y: H + 10, cy: hasard(H * 0.12, H * 0.45),
    v: hasard(7, 10), c: COULEURS_FEU[Math.floor(Math.random() * COULEURS_FEU.length)] });
}
function eclate(x, y, c){
  var n = 70 + Math.floor(Math.random() * 40), c2 = COULEURS_FEU[Math.floor(Math.random() * COULEURS_FEU.length)];
  for (var i = 0; i < n; i++){
    var ang = (i / n) * 6.283 + Math.random() * 0.1, vit = hasard(1.5, 5.2);
    etincelles.push({ x: x, y: y, vx: Math.cos(ang) * vit, vy: Math.sin(ang) * vit,
      vie: 1, dec: hasard(0.010, 0.018), c: Math.random() < 0.75 ? c : c2 });
  }
}

function image(){
  ctx.clearRect(0, 0, L, H);
  var f = fete;
  if (f.mouvement === 'artifice'){
    var now = performance.now();
    if (now > tNouvelleFusee){ fusee(); tNouvelleFusee = now + hasard(450, 1300); }
    for (var i = fusees.length - 1; i >= 0; i--){
      var r = fusees[i]; r.y -= r.v; r.v *= 0.985;
      ctx.fillStyle = r.c; ctx.globalAlpha = 0.9;
      ctx.beginPath(); ctx.arc(r.x, r.y, 2.2, 0, 6.283); ctx.fill();
      ctx.globalAlpha = 0.35; ctx.fillRect(r.x - 0.8, r.y, 1.6, 16);
      if (r.y <= r.cy || r.v < 2){ eclate(r.x, r.y, r.c); fusees.splice(i, 1); }
    }
    for (var k = etincelles.length - 1; k >= 0; k--){
      var e = etincelles[k];
      e.vx *= 0.975; e.vy = e.vy * 0.975 + 0.045; e.x += e.vx; e.y += e.vy; e.vie -= e.dec;
      if (e.vie <= 0){ etincelles.splice(k, 1); continue; }
      ctx.globalAlpha = Math.max(e.vie, 0); ctx.fillStyle = e.c;
      ctx.beginPath(); ctx.arc(e.x, e.y, 2.6 * e.vie + 0.8, 0, 6.283); ctx.fill();
    }
    ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1;
  } else {
    for (var j = 0; j < parts.length; j++){
      var p = parts[j];
      p.ph += 0.012;
      if (f.mouvement === 'chute'){ p.y += p.v; p.x += Math.sin(p.ph) * p.amp * 0.6; if (p.y > H + p.t) parts[j] = nouvellePart(false); }
      else if (f.mouvement === 'nage'){ p.x += p.v * p.dir * 1.4; p.y += Math.sin(p.ph * 2) * 0.5;
        if (p.x < -p.t * 2 || p.x > L + p.t * 2) parts[j] = nouvellePart(false); }
      else { p.y -= p.v; p.x += Math.sin(p.ph) * p.amp * 0.7; if (p.y < -p.t) parts[j] = nouvellePart(false); }
      p.r += p.vr;
      if (!p.im.complete) continue;
      ctx.save(); ctx.globalAlpha = p.a; ctx.translate(p.x, p.y); ctx.rotate(p.r);
      if (f.mouvement === 'nage' && p.dir > 0) ctx.scale(-1, 1);
      if (f.retourne) ctx.scale(Math.cos(p.ph * 2.2), 1);
      ctx.drawImage(p.im, -p.t / 2, -p.t / 2, p.t, p.t);
      ctx.restore();
    }
  }
  anim = requestAnimationFrame(image);
}

function lancer(){
  if (anim || !fete) return;
  toile.style.opacity = '1';
  anim = requestAnimationFrame(image);
}
function arreter(){
  if (anim) cancelAnimationFrame(anim);
  anim = null;
  if (toile){ toile.style.opacity = '0'; ctx.clearRect(0, 0, L, H); }
}

/* ── Pastille : nom de l'événement + pause ─────────────────── */
function pastille(){
  if (!document.getElementById('gds-fete-style')){
  var s = document.createElement('style'); s.id = 'gds-fete-style';
  s.textContent =
    '#gds-fete-toile{position:fixed;inset:0;pointer-events:none;z-index:50;transition:opacity .6s}' +
    '#gds-fete-pastille{position:fixed;left:22px;bottom:22px;z-index:60;display:flex;align-items:center;gap:9px;' +
      'padding:7px 8px 7px 10px;border-radius:30px;background:rgba(26,46,85,.92);color:#fff;' +
      'font:600 12px "DM Sans",sans-serif;box-shadow:0 6px 18px rgba(20,32,60,.25);backdrop-filter:blur(6px)}' +
    '#gds-fete-pastille .ic{width:22px;height:22px;display:flex}#gds-fete-pastille .ic img{width:22px;height:22px}' +
    '#gds-fete-pastille button{border:none;cursor:pointer;border-radius:20px;padding:4px 10px;' +
      'font:600 11px "DM Sans",sans-serif;background:rgba(255,255,255,.14);color:#fff;transition:background .2s}' +
    '#gds-fete-pastille button:hover{background:#d46c1a}' +
    'body.fete-rose{--bg:#fbe9f1;--border:#f3d3e1}' +
    'body.fete-rose .banniere{background:linear-gradient(120deg,#c7336c,#e0629a) !important}' +
    '.b-fete{font-size:13px;color:#ffd9a8;margin-top:3px}' +
    '@media (max-width:600px){#gds-fete-pastille{left:12px;bottom:12px}}';
  document.head.appendChild(s);
  }

  var p = document.createElement('div');
  p.id = 'gds-fete-pastille';
  p.innerHTML = '<span class="ic"><img alt="" src="data:image/svg+xml;charset=utf-8,' +
    encodeURIComponent(fete.icone) + '"></span><span>' + fete.nom + '</span>' +
    '<button type="button" id="gds-fete-bouton"></button>';
  document.body.appendChild(p);
  var b = document.getElementById('gds-fete-bouton');
  function maj(){ b.textContent = actif ? 'Pause' : 'Animer'; }
  b.onclick = function(){
    actif = !actif; maj();
    try { localStorage.setItem('gds_fete_pause', actif ? '' : cle + '|' + new Date().toDateString()); } catch(e){}
    actif ? lancer() : arreter();
  };
  maj();
}

/* ── Démarrage ─────────────────────────────────────────────── */
function demarrer(forcer, anniv){
  var d = new Date();
  var q = null;
  try { q = new URLSearchParams(location.search).get('fete'); } catch(e){}
  cle = forcer || q || feteDuJour(d);
  var jourCle = feteDuJour(d);
  if (!forcer && !q && anniv && anniv.length) cle = 'anniversaire';
  if (cle === 'anniversaire'){
    var a = FETES.anniversaire, prenoms = (anniv && anniv.length) ? anniv : ['Prénom'];
    a.formes = [D.ballon('#ff5c7a', '#c21f45'), D.ballon('#ffd166', '#d89a00'), D.ballon('#4dabf7', '#1864ab'),
                D.ballon('#69db7c', '#2b8a3e'), D.ballon('#b197fc', '#6741d9'), D.confetti(), D.confetti(), D.gateau()];
    a.grand = { 5: 0.8, 6: 0.8, 7: 1.3 };
    a.icone = D.gateau();
    a.nom = 'Anniversaire de ' + prenoms.join(', ');
    /* Le nom est déjà dans le bandeau : la phrase reste celle de la fête du jour, s'il y en a une. */
    a.phrase = (q === 'anniversaire') ? 'Joyeux anniversaire ' + prenoms.join(', ') + ' !'
             : (jourCle && FETES[jourCle] ? FETES[jourCle].phrase : '');
  }
  if (cle === 'aucune' || !FETES[cle]) return null;
  fete = FETES[cle];

  var phrase = typeof fete.phrase === 'function' ? fete.phrase(d) : fete.phrase;
  if (fete.rose) document.body.classList.add('fete-rose');

  toile = document.createElement('canvas');
  toile.id = 'gds-fete-toile';
  toile.setAttribute('aria-hidden', 'true');
  document.body.appendChild(toile);
  ctx = toile.getContext('2d');
  redim();
  window.addEventListener('resize', redim);

  images = fete.formes.map(img);
  parts = [];
  var n = fete.nombre;
  if (L < 700) n = Math.round(n * 0.55);
  for (var i = 0; i < n; i++) parts.push(nouvellePart(true));

  try {
    var pause = localStorage.getItem('gds_fete_pause') || '';
    if (pause === cle + '|' + d.toDateString()) actif = false;
  } catch(e){}
  if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) actif = false;

  pastille();
  if (!window.__gdsFeteVis){ window.__gdsFeteVis = true;
    document.addEventListener('visibilitychange', function(){
      if (!fete) return;
      if (document.hidden) arreter(); else if (actif) lancer();
    });
  }
  if (actif) lancer();

  return { cle: cle, nom: fete.nom, phrase: phrase, icone: fete.icone };
}

function nettoyer(){
  arreter();
  window.removeEventListener('resize', redim);
  ['gds-fete-toile', 'gds-fete-pastille'].forEach(function(id){
    var e = document.getElementById(id); if (e) e.remove();
  });
  document.body.classList.remove('fete-rose');
  fusees = []; etincelles = []; parts = []; fete = null; actif = true;
}

window.GDS_FETES = { demarrer: demarrer, nettoyer: nettoyer, feteDuJour: feteDuJour, liste: Object.keys(FETES) };
})();
