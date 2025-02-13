const noButton = document.getElementById('noButton');
const yesButton = document.getElementById('yesButton');
const questionText = document.getElementById('questionText');
const buttonsContainer = document.querySelector('.buttons');
const loveText = document.getElementById('loveText');
const messages = [
    "Ну пожалуйста! Я знаю, ты хотела выбрать другое!",
    "Может, ты хочешь передумать?",
    "Прошу, малыш, сделай другой выбор!",
    "Ты уверена? Давай ещё раз подумаем!",
    "Я знаю, ты хочешь сказать 'Да'!",
    "Попробуй ещё раз, я верю в тебя!",
];
let messageIndex = 0;

function growYesButton() {
    const currentWidth = yesButton.offsetWidth;
    const currentHeight = yesButton.offsetHeight;
    yesButton.style.width = `${currentWidth + 50}px`; /* Уменьшен рост кнопки */
    yesButton.style.height = `${currentHeight + 20}px`;
    questionText.style.marginTop = '10px';
    noButton.style.fontSize = '14px'; /* Уменьшен размер шрифта */
    noButton.style.padding = '5px 10px';
    noButton.style.transform = 'translateX(10px)'; /* Уменьшено смещение */
    buttonsContainer.style.gap = '5px'; /* Уменьшен отступ */
    noButton.style.width = '120px'; /* Уменьшен размер кнопки */
    noButton.style.height = '80px';
}

function showPlaylist() {
    document.getElementById('playlist').style.display = 'flex';
}

function askAgain() {
    growYesButton();
    noButton.textContent = messages[messageIndex];
    messageIndex = (messageIndex + 1) % messages.length;
}

function startLoveAnimation() {
    document.getElementById('question').style.display = 'none';
    const loveText = document.getElementById('loveText');
    loveText.style.display = 'block';
    const text = "I've fallen deeply in love with you, my baby";
    const words = text.split(' ');
    let index = 0;

    function showNextWord() {
        const firstSong = document.getElementById('song1');
        firstSong.play();
        if (index < words.length) {
            loveText.textContent += words[index] + ' ';
            index++;
            setTimeout(showNextWord, 1000);
        } else {
            setTimeout(() => {
                loveText.style.animation = 'fadeOutText 1s forwards';
                document.getElementById('playlist').style.display = 'block';
                setTimeout(() => {
                    playlist.classList.add('visible');
                }, 10);
                const firstRecord = document.querySelector('.record');
                const firstRecordWrapper = firstRecord.parentElement;
                firstRecord.classList.add('playing');
                firstRecordWrapper.classList.add('playing');
            }, 1000);
        }
    }
    showNextWord();
}

function playSong(songId) {
        const audio = document.getElementById(songId);
        const record = document.querySelector(`[onclick="playSong('${songId}')"]`);
        const recordWrapper = record.parentElement;

        // Проверяем, играет ли текущее аудио
        const isPlaying = !audio.paused;

        // Останавливаем все другие аудио и сбрасываем их состояние
        document.querySelectorAll('audio').forEach(audioElement => {
            if (audioElement !== audio) {
                audioElement.pause();
                audioElement.currentTime = 0;
                const otherRecord = document.querySelector(`[onclick="playSong('${audioElement.id}')"]`);
                const otherRecordWrapper = otherRecord.parentElement;
                otherRecord.classList.remove('playing', 'paused');
                otherRecordWrapper.classList.remove('playing', 'paused');
            }
        });

        // Если текущее аудио уже играет, ставим его на паузу
        if (isPlaying) {
            console.log(`Pausing audio: ${songId}`); // Лог для отладки
            audio.pause();
            record.classList.remove('playing');
            record.classList.add('paused');
            recordWrapper.classList.remove('playing');
            recordWrapper.classList.add('paused');
        } else {
            // Если аудио на паузе или не играло, воспроизводим его
            console.log(`Playing audio: ${songId}`); // Лог для отладки
            audio.play();
            record.classList.remove('paused');
            record.classList.add('playing');
            recordWrapper.classList.remove('paused');
            recordWrapper.classList.add('playing');
        }
    }

    function createFirefly() {
        const firefly = document.createElement('div');
        firefly.classList.add('firefly');
        firefly.style.left = Math.random() * 100 + 'vw';
        firefly.style.top = Math.random() * 100 + 'vh';
        document.body.appendChild(firefly);

        setTimeout(() => {
            firefly.remove();
        }, 3000);
    }

    setInterval(createFirefly, 500);    
    yesButton.addEventListener('click', startLoveAnimation);
    noButton.addEventListener('click', askAgain);
