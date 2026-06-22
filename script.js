const channelsData = {
    "beIN MAX": [
        { name: "beIN SPORTS MAX 1", url: "http://217.60.15.235:2095/live/omar777/01103978590/460863.ts?token=yafHbHd.yUaXXzX.X.bzHUfy.ydzHyUXaUz.X.y.EG.ts.866cfa228b991abe36738a1fed788ec933479e0342a5c9637242a59d8789169e.37069.T3JhbmdlIEVneXB0.b25lZ2F6YWwyLnh5eg==" },
        { name: "beIN SPORTS MAX 2", url: "http://asmrasmr.live:8080/live/39495727290/01928238338/1246119.m3u8" },
        { name: "beIN SPORTS MAX 3", url: "http://asmrasmr.live:8080/live/39495727290/01928238338/1246120.m3u8" },
        { name: "beIN SPORTS MAX 4", url: "http://asmrasmr.live:8080/live/39495727290/01928238338/1246121.m3u8" },
        { name: "beIN SPORTS MAX 5", url: "http://asmrasmr.live:8080/live/39495727290/01928238338/1246122.m3u8" },
        { name: "beIN SPORTS MAX 6", url: "http://asmrasmr.live:8080/live/39495727290/01928238338/1246123.m3u8" }
    ],
    "beIN 4K": [
        { name: "beIN SPORTS MAX 4K HDR", url: "http://asmrasmr.live:8080/live/39495727290/01928238338/1246124.m3u8" }
    ],
    "beIN HD": [
        { name: "beIN SPORTS 1 HD", url: "http://asmrasmr.live:8080/live/39495727290/01928238338/1246118.m3u8" }
    ]
};

let hlsInstance = null;

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
    playerOverlay.style.setProperty('display', 'flex', 'important');

    // إذا كان الرابط ينتهي بـ .ts أو يحتوي عليه، نقوم بتشغيله مباشرة عبر المتصفح
    if (url.includes('.ts')) {
        if (hlsInstance) {
            hlsInstance.destroy();
            hlsInstance = null;
        }
        videoElement.src = url;
        videoElement.load();
        videoElement.play().catch(err => console.log("Direct TS play failed", err));
    } else {
        // تشغيل روابط m3u8 عبر مكتبة HLS
        if (Hls.isSupported()) {
            if (hlsInstance) hlsInstance.destroy();
            hlsInstance = new Hls({ maxMaxBufferLength: 10 });
            hlsInstance.loadSource(url);
            hlsInstance.attachMedia(videoElement);
            hlsInstance.on(Hls.Events.MANIFEST_PARSED, function() {
                videoElement.play().catch(err => console.log(err));
            });
        } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
            videoElement.src = url;
            videoElement.addEventListener('loadedmetadata', function() {
                videoElement.play().catch(err => console.log(err));
            });
        }
    }
}

function closeNetflixVideo() {
    const playerOverlay = document.getElementById('netflix-fullscreen-player');
    const videoElement = document.getElementById('netflix-video-element');

    if (hlsInstance) {
        hlsInstance.destroy();
        hlsInstance = null;
    }

    if(videoElement) {
        videoElement.pause();
        videoElement.src = "";
        videoElement.load();
    }
    playerOverlay.style.setProperty('display', 'none', 'important');
}
