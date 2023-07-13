let win = false

const canvas = document.querySelector('canvas')
    const c = canvas.getContext('2d')

    canvas.width = 928
    canvas.height = 520


    const gravity = 0.5
    class Player {
        constructor() {
            this.position = {
                x: 100,
                y: 100
            }
            this.velocity = {
                x: 0,
                y: 0
            }
            this.width = 30
            this.height = 30
        }

        draw() {
            c.fillStyle = 'red'
            c.fillRect(this.position.x, this.position.y, this.width, this.height)
        }
        update() {
            this.draw()
            this.position.y += this.velocity.y
            

            if (scrollOffset > 1500){
                win = true 
            } else {
                this.position.x += this.velocity.x
            }
            

            if (this.position.y +this.height +this.velocity.y <= canvas.height)
            this.velocity.y += gravity
            
        }
    }

    class Platform {
        constructor({x, y }) {
            this.position = {
                x: x ,
                y: y
            }

            this.width = 580
            this.height = 20
        }

        draw() {
            const image = new Image();
            image.src = "/img/platform.png"
            c.drawImage(image, this.position.x, this.position.y)
        }
    }

    class Background {
        constructor({x, y }) {
            this.position = {
                x: x ,
                y: y
            }

            this.width = 928
            this.height = 793
        }

        draw() {
            const image = new Image();
            image.src = "/img/BG.png"
            c.drawImage(image, this.position.x, this.position.y, 928, 520)
        }
    }



    const player = new Player()
    const platforms = [new Platform({
        x:-1, y: 475
    }), new Platform({
        x:700, y:475
    }),new Platform({
        x: 1400, y:475
    })]

    const BG = [
        new Background({
            x: 0,
            y: 0,
        })
    ]

    const keys = {
        right:{
            pressed: false
        },
        left: {
            pressed: false
        }
    }
    player.draw()
    
    let scrollOffset = 0

    function animate() {
        requestAnimationFrame(animate)
        c.fillStyle = 'white'
        c.fillRect(0, 0, canvas.width, canvas.height)

        BG.forEach((x) => {
            x.draw()
        })
        

        player.update()
        platforms.forEach((platform) => {
            platform.draw()
        })
   
        
          

        if(keys.right.pressed && player.position.x < 400) {
            player.velocity.x = 5
        } else if ((keys.left.pressed && player.position.x > 100)
        || keys.left.pressed && scrollOffset === 0 && player.position.x > 0) {
            player.velocity.x = -5
        } else {
            player.velocity.x = 0

            if (keys.right.pressed) {
                scrollOffset += 5
                platforms.forEach((platform) => {
                    platform.position.x -= 5
                })
                } else if (keys.left.pressed && scrollOffset > 0) {
                  scrollOffset -= 5
                platforms.forEach((platform) => {
                    platform.position.x += 5
                })
            }
        }

        console.log(scrollOffset)

        //platform collision
        platforms.forEach((platform) => { 
        if (player.position.y + player.height <= platform.position.y && player.position.y + player.height + player.velocity.y >= platform.position.y && player.position.x + player.width >= platform.position.x && player.position.x <= platform.position.x + platform.width ) {
            player.velocity.y = 0
        }
    })
        //howtowin
        if (scrollOffset > 1500) {
            console.log('Win')
        }

        //death
        if (player.position.y > canvas.height) {
            console.log('RIP')
        }
        
        if (win){
            c.font = "200px serif"
            c.fillText('You Win~!', 100, 400)
        }
        
    }

    animate()

    window.addEventListener('keydown', ({ keyCode }) => {
        switch (keyCode) {
            case 87:
                console.log('up')
                player.velocity.y -= 10
                break

                case 83:
                console.log('down')
                break

                case 65:
                console.log('left')
                keys.left.pressed = true
                break

                case 68:
                console.log('right')
                keys.right.pressed = true
                break
        }

        console.log(keys.right.pressed)
    })

        window.addEventListener('keyup', ({ keyCode }) => {
            switch (keyCode) {
                case 87:
                    console.log('up')
                    player.velocity.y -= 10
                    break
    
                    case 83:
                    console.log('down')
                    break
    
                    case 65:
                    console.log('left')
                    keys.left.pressed = false
                    break
    
                    case 68:
                    console.log('right')
                    keys.right.pressed = false
                    break
            }
            console.log(keys.right.pressed)
    })