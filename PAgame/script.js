

document.addEventListener("DOMContentLoaded", function () {
    const gameContainer = document.getElementById('game-container');
    const character = document.getElementById('character');
    const square = document.getElementById('square');
    const message = document.getElementById('message');

    // Função para mover o personagem para a posição do clique
    function moveCharacter(event) {
        const x = event.clientX - gameContainer.getBoundingClientRect().left - character.offsetWidth / 2;
        const y = event.clientY - gameContainer.getBoundingClientRect().top - character.offsetHeight / 2;

        const currentX = parseInt(character.style.left) || 0;
        const currentY = parseInt(character.style.top) || 0;

        const distanceX = x - currentX;
        const distanceY = y - currentY;

        const stepX = distanceX / 100; // Adjust the speed by changing the divisor
        const stepY = distanceY / 100; // Adjust the speed by changing the divisor

        let count = 0;
        const moveInterval = setInterval(() => {
            count++;
            if (count > 100) {
                clearInterval(moveInterval);
                character.classList.remove('walking');
                checkCollision();
            } else {
                character.classList.add('walking');
            }

            const newX = currentX + stepX * count;
            const newY = currentY + stepY * count;

            character.style.left = newX + 'px';
            character.style.top = newY + 'px';
        }, 10); // Adjust the interval for smoother or faster movement
    }

    // Função para verificar a colisão entre o personagem e o quadrado
    function checkCollision() {
        const characterRect = character.getBoundingClientRect();
        const squareRect = square.getBoundingClientRect();

        if (
            characterRect.left < squareRect.right &&
            characterRect.right > squareRect.left &&
            characterRect.top < squareRect.bottom &&
            characterRect.bottom > squareRect.top
        ) {
            // Adicione um evento de teclado para a tecla "e"
            document.addEventListener('keydown', function (event) {
                if (event.key === 'e') {
                    showMessage();
                }
            });
        }

    }

    // Função para exibir a mensagem
    function showMessage() {
        message.style.display = 'block';
    }

    // Adicione um evento de clique ao contêiner do jogo
    gameContainer.addEventListener('click', moveCharacter);


    // Verificar se o nome de usuário foi salvo anteriormente
    var username = localStorage.getItem("username");

    // Verificar se o nome de usuário está vazio
    if (username !== null && username.trim() !== "") {
        // Exibir o nome de usuário na página
        document.getElementById("usernameDisplay").innerHTML = username;
    } else {
        // Se não houver nome de usuário salvo, exibir uma mensagem
        document.getElementById("usernameDisplay").innerHTML = "Nenhum nome de usuário foi escolhido.";
    }


});
