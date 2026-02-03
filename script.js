document.addEventListener('DOMContentLoaded', function() {
    const texts = [
            "『保持热爱，奔赴山海。』",
            "『在这个世界难免会迷茫，但别再把小刀带在身上』",
            "『生命是一万次的谎话，吊唁着梦和童话』"
            ];

            const textElement = document.getElementById('motto-text');
            const speed = 100; // 打字速度
            const pauseTime = 500; // 停顿时间

            let currentIndex = 0;

            function typeWriter(text, element, speed, callback) {
            let i = 0;
            element.textContent = '';
            const typing = setInterval(() => {
                if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                } else {
                clearInterval(typing);
                setTimeout(callback, pauseTime);
                }
            }, speed);
            }

            function deleteWriter(element, speed, callback) {
            let text = element.textContent;
            let i = text.length;
            const deleting = setInterval(() => {
                if (i > 0) {
                i--;
                element.textContent = text.substring(0, i);
                } else {
                clearInterval(deleting);
                setTimeout(callback, pauseTime);
                }
            }, speed);
            }

            function nextText() {
            const text = texts[currentIndex];
            typeWriter(text, textElement, speed, () => {
                deleteWriter(textElement, speed, () => {
                currentIndex = (currentIndex + 1) % texts.length;
                nextText();
                });
            });
            }

            nextText();
            
            const blurBg = document.getElementById('blur-bg');
            const themeBtn = document.getElementById("theme-change");
            let isDark = true;
            themeBtn.addEventListener("click", () => {
                if (isDark) {
                    document.documentElement.style.setProperty("--rosewater", "#dc8a78");
                    document.documentElement.style.setProperty("--flamingo", "#dd7878");
                    document.documentElement.style.setProperty("--pink", "#ea76cb");
                    document.documentElement.style.setProperty("--mauve", "#8839ef");
                    document.documentElement.style.setProperty("--red", "#d20f39");
                    document.documentElement.style.setProperty("--maroon", "#e64553");
                    document.documentElement.style.setProperty("--peach", "#fe640b");
                    document.documentElement.style.setProperty("--yellow", "#df8e1d");
                    document.documentElement.style.setProperty("--green", "#40a02b");
                    document.documentElement.style.setProperty("--teal", "#179299");
                    document.documentElement.style.setProperty("--sky", "#04a5e5");
                    document.documentElement.style.setProperty("--sapphire", "#209fb5");
                    document.documentElement.style.setProperty("--blue", "#1e66f5");
                    document.documentElement.style.setProperty("--lavender", "#7287fd");
                    document.documentElement.style.setProperty("--text", "#4c4f69");
                    document.documentElement.style.setProperty("--subtext1", "#5c5f77");
                    document.documentElement.style.setProperty("--subtext0", "#6c6f85");
                    document.documentElement.style.setProperty("--overlay2", "#7c7f93");
                    document.documentElement.style.setProperty("--overlay1", "#8c8fa1");
                    document.documentElement.style.setProperty("--overlay0", "#9ca0b0");
                    document.documentElement.style.setProperty("--surface2", "#acb0be");
                    document.documentElement.style.setProperty("--surface1", "#bcc0cc");
                    document.documentElement.style.setProperty("--surface0", "#ccd0da");
                    document.documentElement.style.setProperty("--base", "#eff1f5");
                    document.documentElement.style.setProperty("--mantle", "#e6e9ef");
                    document.documentElement.style.setProperty("--crust", "#dce0e8");
                    themeBtn.textContent = "🌙";
                    blurBg.style.display = 'block';
                    document.body.classList.add('light-mode');
                    isDark = false;
                } 
                else {
                    document.documentElement.removeAttribute("style");
                    themeBtn.textContent = "☀️";
                    blurBg.style.display = 'none';
                    document.body.classList.remove('light-mode');
                    isDark = true;
                }
            });

            function updateTime() {
                const now = new Date();
                const year = now.getFullYear();
                const month = (now.getMonth() + 1).toString().padStart(2, '0');
                const day = now.getDate().toString().padStart(2, '0');
                const hours = now.getHours().toString().padStart(2, '0');
                const minutes = now.getMinutes().toString().padStart(2, '0');
                document.getElementById('top-time').textContent = `${year}年${month}月${day}日 ${hours}:${minutes}`;
            }

            updateTime();
            setInterval(updateTime, 1000);

    const musicBtn = document.getElementById('music-btn');
    const monitorBtn = document.getElementById('monitor-btn');
    const bgmPopup = document.getElementById('bgm-popup');
    const monitorPopup = document.getElementById('monitor-popup');
    const bgmAudio = document.getElementById('bgm-audio');
    const bgmToggle = document.getElementById('bgm-toggle');
    const bgmToggleIcon = document.getElementById('bgm-toggle-icon');
    const bgmReplay = document.getElementById('bgm-replay');
    const bgmBar = document.getElementById('bgm-bar');
    const bgmBarContainer = document.getElementById('bgm-bar-container');
    const bgmTime = document.getElementById('bgm-time');

    // 初始化弹窗状态
    bgmPopup.style.display = 'none';
    monitorPopup.style.display = 'none';
    
    // 显示/隐藏弹窗(BGM)
    musicBtn.addEventListener('click', () => {
        bgmPopup.style.display = bgmPopup.style.display === 'none' ? 'block' : 'none';
    });

    // 显示/隐藏弹窗(视奸)
    monitorBtn.addEventListener('click', () => {
        monitorPopup.style.display = monitorPopup.style.display === 'none' ? 'block' : 'none';
    });



    // 播放/暂停切换
    bgmToggle.addEventListener('click', () => {
        if (bgmAudio.paused) {
            bgmAudio.play();
        } else {
            bgmAudio.pause();
        }
    });

    // 重播
    bgmReplay.addEventListener('click', () => {
        bgmAudio.currentTime = 0;
        bgmAudio.play();
    });

    // 更新播放状态按钮
    bgmAudio.addEventListener('play', () => {
        bgmToggleIcon.innerHTML = '<path d="M6 19h4V5H6zm8-14v14h4V5z"/>'; // 暂停图标
    });
    bgmAudio.addEventListener('pause', () => {
        bgmToggleIcon.innerHTML = '<path d="M8 5v14l11-7z"/>'; // 播放图标
    });

    // 更新进度条和时间
    bgmAudio.addEventListener('timeupdate', () => {
        if (bgmAudio.duration) {
            const percent = (bgmAudio.currentTime / bgmAudio.duration) * 100;
            bgmBar.style.width = percent + '%';
            bgmTime.textContent = formatTime(bgmAudio.currentTime) + ' / ' + formatTime(bgmAudio.duration);
        }
    });

    // 点击进度条跳转
    bgmBarContainer.addEventListener('click', e => {
        const rect = bgmBarContainer.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const percent = clickX / rect.width;
        bgmAudio.currentTime = percent * bgmAudio.duration;
    });

    // 格式化时间 mm:ss
    function formatTime(seconds) {
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60);
        return `${m}:${s.toString().padStart(2,'0')}`;
    }

    let ws = new WebSocket("wss://monitor.mahiro.space/ws");
    ws.onmessage = function(event) {
      document.getElementById("leonxie-status").innerText = event.data;
    };
    ws.onclose = function() {
      document.getElementById("leonxie-status").innerText = "似了";
    };
});