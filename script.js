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

function switchScreen(screenId, element) {
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
        card.onclick = () => startNativePlayer(chan.name, chan.url);
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

// استدعاء مشغل ExoPlayer الأصلي بملء الشاشة
async function startNativePlayer(title, url) {
    try {
        if (window.Capacitor && window.Capacitor.Plugins.CapacitorVideoPlayer) {
            await window.Capacitor.Plugins.CapacitorVideoPlayer.initPlayer({
                mode: "fullscreen",
                url: url,
                title: title,
                playerId: "fullscreen-player",
                componentTag: "div"
            });
        } else {
            alert("سيعمل مشغل ExoPlayer فور انتهاء بناء الـ APK وتثبيته على هاتفك.");
        }
    } catch (error) {
        console.error("Error opening Native Player", error);
    }
}
