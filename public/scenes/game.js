var levels = {
  fondo: "nivel1",
  velocidad: -380,
};

export default class Game extends Phaser.Scene {
  constructor() {
    // key of the scene
    // the key will be used to start the scene by other scenes
    super("game");

  }

  init() {
    this.score = 0;
    // this is called before the scene is created
    // init variables
    // take data passed from other scenes
    // data object param {}

  }

  preload() {
    // load assets
    this.load.image("nivel1", "./public/images/nivel1.png");
    this.load.image("nivel2", "./public/images/nivel2.png");
    this.load.image("nivel3", "./public/images/nivel3.jpg");
    this.load.image("pelota", "./public/images/pelota.png");
    this.load.image("cama", "./public/images/cama.png");
    this.load.image("obstaculo","./public/images/plataforma.png");
  }

  create() {
    // create game objects   
    this.add.image(400, 300, levels.fondo).setScale(4);
    this.pelota = this.physics.add.image(400, -350,
      "pelota"
    ).setScale(0.08);
    this.pelota.setCircle(490, 105, 100)
    this.pelota.setCollideWorldBounds(true);
    this.pelota.setBounce(1);
    this.pelota.body.setVelocityY(100, -400);
    this.pelota.setDepth(100);

    this.cama = this.physics.add.image(400, 400,
      "cama"
    ).setScale(0.3);
    this.cama.setSize(740,190);
    this.cama.setOffset(20,30);
    this.cama.setCollideWorldBounds(true);
    this.cama.setBounce(0);
    this.cama.setDepth(100);
    

    this.physics.add.collider(this.pelota, this.cama, this.points, null, this);
    this.cursors = this.input.keyboard.createCursorKeys();

    this.timerEvent = this.time.addEvent({
      delay: 1000,
      callback: this.oneSecond,
      callbackScope: this,
      loop: true,
    })

    this.scoreText = this.add.text(20, 20, "Score: " + this.score, {
      fontSize: "24px",
      fill: "#000000",
    });
    this.nivelText = this.add.text(650,20, "Nivel: 1",{
      fontSize: "24px",
      fill: "#000000",
    })
  }

  update() {
    if (this.score >= 30) {
      this.add.text(400, 300, "¡Has ganado!", {
        fontSize: "60px",
        fill: "#00000",
        align: "center"
      }).setOrigin(0.5).setDepth(101);
      this.physics.pause(); 
      this.cama.setVelocity(0); 
  }

    // update game objects
    if (this.cursors.left.isDown) {
      this.cama.setVelocityX(-200);
    } else if (this.cursors.right.isDown) {
      this.cama.setVelocityX(200);
    } else {
      this.cama.setVelocityX(0);
    }
    if (this.cursors.up.isDown) {
      this.cama.setVelocityY(-200);
    } else if (this.cursors.down.isDown) {
      this.cama.setVelocityY(200);
    } else {
      this.cama.setVelocityY(0);
    }

    if (this.score == 10) {
      levels.fondo = "nivel2";
      levels.velocidad += (levels.velocidad * 0.1);
      this.add.image(400, 300, levels.fondo).setScale(4);
      this.pelota.body.setVelocityY(100, levels.velocidad);
      this.nivelText.setText("Nivel: 2").setDepth(101);
      console.log(levels.velocidad);
      return;
    } else if (this.score > 10 && this.score == 20) {
      levels.fondo = "nivel3";
      levels.velocidad += (levels.velocidad * 0.1);
      this.add.image(400, 300, levels.fondo).setScale(4);
      this.pelota.body.setVelocityY(100, levels.velocidad);
      this.nivelText.setText("Nivel: 3").setDepth(101);
      console.log(levels.velocidad);

      const obstaculoX = Phaser.Math.Between(100, 700); // Generar posición X aleatoria
      const obstaculoY = Phaser.Math.Between(100, 500); // Generar posición Y aleatoria
      const obstaculo = this.physics.add.image(obstaculoX, obstaculoY, "obstaculo").setScale(0.2);
  // Establecer propiedades del obstáculo
      obstaculo.setCollideWorldBounds(true);
      obstaculo.setBounce(0);
      obstaculo.setVelocityX(0, 0);
      obstaculo.setVelocityY(0, 0);
      obstaculo.setDepth(100);
      obstaculo.setSize(900,400);
  // Agregar colisión con la pelota
      this.physics.add.collider(this.pelota, obstaculo,this.hitObstaculo, null, this);
      return;
    }
  }

  points(pelota, cama) {
    this.score++;
    console.log(this.score);
    this.scoreText.setText("Score: " + this.score).setDepth(101);
    if (pelota.body.velocity.x > 0) {
      pelota.setVelocityY( levels.velocidad);
   } else {
     pelota.setVelocityY( levels.velocidad);
     }
  }

  hitObstaculo(pelota, obstaculo) {
    obstaculo.setVelocity(0, 0);
    obstaculo.setAngularVelocity(0);
    obstaculo.setAcceleration(0);
    obstaculo.setAngularAcceleration(0);
    obstaculo.body.immovable = true;
    // Realizar acciones en caso de colisión con el obstáculo
    // Por ejemplo, restar puntos o reiniciar la pelota
  }
}
