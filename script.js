const channelsData = {
    "beIN MAX": [
        { name: "beIN MAX 1 HD", url: "https://www.w3schools.com/html/mov_bbb.mp4" },
        { name: "beIN MAX 2 HD", url: "https://media.w3.org/2010/05/sintel/trailer_hd.mp4" },
        { name: "beIN MAX 3 HD", url: "https://www.w3schools.com/html/movie.mp4" }
    ],
    "beIN 4K": [
        { name: "beIN SPORTS 4K", url: "https://media.w3.org/2010/05/sintel/trailer_hd.mp4" }
    ],
    "beIN HD": [
        { name: "beIN SPORTS 1 HD", url: "https://www.w3schools.com/html/movie.mp4" }
    ]
};

function switchScreen(screenId, element) {
    closeNetflixVideo();
    document.getElementById('back-btn').style.display = 'none';
    document.getElementById('menu-btn').style.display = 'flex';
    document.getElementById('main-app-title').innerText = "OHTMAN TV";

    document.querySelectorAll('.app-screen').forEach(screen => screen.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    
    document.getElementById('screen-' + screenId).classList.add('active');
    if(element) element.classList.add('active');
}

function openSubCategory(categoryName) {
    const channels = channelsData[categoryName];
    if (!channels) return;

    document.getElementById('main-app-title').innerText = categoryName;
    document.getElementById('menu-btn').style.display = 'none';
    document.getElementById('back-btn').style.display = 'flex';

    const grid = document.getElementById('sub-channels-grid');
    grid.innerHTML = ''; 

    channels.forEach(chan => {
        const card = document.createElement('div');
        card.className = 'card-item';
        card.onclick = () => startNetflixStream(chan.name, chan.url);
        card.innerHTML = `
            <div class="card-thumb purple-thumb">beIN SPORTS</div>
            <div class="card-name">${chan.name}</div>
        `;
        grid.appendChild(card);
    });

    document.querySelectorAll('.app-screen').forEach(s => s.classList.remove('active'));
    document.getElementById('screen-sub-channels').classList.add('active');
}

function goBack() {
    switchScreen('home', document.querySelector('.nav-item'));
}

function startNetflixStream(title, url) {
    const playerOverlay = document.getElementById('netflix-fullscreen-player');
    const videoElement = document.getElementById('netflix-video-element');
    
    document.getElementById('player-active-title').innerText = title;
    videoElement.src = url;
    playerOverlay.style.display = 'flex';
    
    videoElement.load();
    videoElement.play().catch(err => console.log(err));
}

function closeNetflixVideo() {
    const playerOverlay = document.getElementById('netflix-fullscreen-player');
    const videoElement = document.getElementById('netflix-video-element');
    
    if(videoElement) {
        videoElement.pause();
        videoElement.src = "";
    }
    playerOverlay.style.display = 'none';
}
