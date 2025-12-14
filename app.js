// Splash screen
setTimeout(() => {
  document.getElementById('splash').style.display = 'none';
  document.getElementById('app').classList.remove('hidden');
  loadServerInfo();
}, 2000);

// Menu
document.getElementById('menuBtn').onclick = () => {
  document.getElementById('menu').classList.toggle('hidden');
};

function changePage(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
  document.getElementById(page).classList.remove('hidden');
  document.getElementById('menu').classList.add('hidden');
}

// Jouer
function play() {
  window.open('https://ninjabloxionschool.github.io/CalvinSMP/Connexion', '_blank');
}

// Copier IP
function copyIP() {
  navigator.clipboard.writeText('node1.snxhosting.fr:7790');
  const toast = document.getElementById('toast');
  toast.style.display = 'block';
  setTimeout(() => toast.style.display = 'none', 3000);
}

// Infos serveur
async function loadServerInfo() {
  try {
    const res = await fetch('https://api.mcsrvstat.us/2/node1.snxhosting.fr:7790');
    const data = await res.json();

    const status = document.getElementById('status');
    const statusText = document.getElementById('statusText');
    const count = document.getElementById('playerCount');
    const list = document.getElementById('playersList');

    if (data.online) {
      status.className = 'online';
      statusText.textContent = 'En ligne';
      count.textContent = 'Joueurs en ligne : ' + data.players.online;

      if (data.players.list) {
        data.players.list.forEach(p => {
          const li = document.createElement('li');
          li.innerHTML = `<img src="https://mc-heads.net/avatar/${p}"><span>${p}</span>`;
          list.appendChild(li);
        });
      }
    }
  } catch(e) {
    console.log('Serveur hors ligne');
  }
}
