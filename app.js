const boxesHot = document.querySelectorAll('.hot');
const boxesCold = document.querySelectorAll('.cold');

boxesHot.forEach((box) =>{
    box.addEventListener("click", function(e){
        e.target.style.visibility = "hidden";
    })
})
boxesCold.forEach((box) =>{
    box.addEventListener("click", function(e){
        e.target.style.visibility = "hidden";
    })
})


const countdownMinutes = 1;
const countdownDisplay = document.getElementById('countdown');

// Geri sayım süresini saniye cinsinden hesapla
let totalTimeInSeconds = countdownMinutes * 60;

function updateCountdown() {
    const minutes = Math.floor(totalTimeInSeconds / 60);
    const seconds = totalTimeInSeconds % 60;

    // Dakika ve saniyeleri iki basamaklı göster
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');

    // Geri sayımı ekranda göster
    countdownDisplay.textContent = `${formattedMinutes}:${formattedSeconds}`;

    // Süreyi bir saniye azalt
    totalTimeInSeconds--;

    // Geri sayım bitene kadar devam et
    if (totalTimeInSeconds < 0) {
        // 'fade-out' sınıfını ekleyerek opacity'yi azalt
        countdownDisplay.classList.add('fade-out');
        clearInterval(countdownInterval);
    }
}

// Her saniye geri sayımı güncelle
const countdownInterval = setInterval(updateCountdown, 1000);

// Başlangıçta geri sayımı güncelle
updateCountdown();