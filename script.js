window.onload = function() {
    const player = document.querySelector('.player');
    const ground = document.querySelector('.ground');
    const container = document.querySelector('.container');

    function updatePlayerPosition() {
    
        const containerHeight = container.clientHeight;
        const groundHeight = ground.getBoundingClientRect().height;
        const playerHeight = player.getBoundingClientRect().height;

   
        const groundTop = containerHeight - groundHeight;

       
        ground.style.position = 'absolute';
        ground.style.top = `${groundTop}px`;

        player.style.position = 'absolute';
        player.style.top = `${groundTop - playerHeight}px`;
    }

    updatePlayerPosition();

    window.onresize = updatePlayerPosition;
};
