var Bomber = cc.Sprite.extend({
	ctor: function( x , y ,map ,gameLayer,type) {
		this._super();
        if(type == 1){
            this.initWithFile( 'images/character1.png' );
		}if(type == 2){
            this.initWithFile( 'images/character2.png' );
        }

        this.nextDirection = Bomber.DIR.STILL;
		this.nextPositionX = 0;
		this.nextPositionY = 0;
		this.bombNum = 5 ;
        this.force = 5;
        this.direction = Bomber.DIR.STILL;
        this.setAnchorPoint( cc.p( 0, 0 ) );
		this.x = x;
        this.y = y;
        this.setPosition(this.x,this.y);
        this.isRight = false;
        this.isLeft = false;
        this.isUp = false;
        this.isDown = false;
        this.map = map;
        this.gameLayer = gameLayer;

	},

	closeTo: function( obj ) {
		var objPos = obj.getPosition();
  		return  (Math.abs( this.nextPositionX - objPos.x ) <= 30 ) && ( Math.abs(this.nextPositionY - objPos.y) <= 30 );
    },

    setNextDirection: function( dir,map ) {

    	this.nextDirection = dir;
    	var mapArray = map.arr;
        var mapBomb = map.bomb;
    	this.nextPositionX = this.x;
    	this.nextPositionY = this.y;
    	
    	if(dir == Bomber.DIR.LEFT) this.nextPositionX = this.x-Bomber.MOVE_STEP;
    	if(dir == Bomber.DIR.RIGHT) this.nextPositionX = this.x+Bomber.MOVE_STEP;
    	if(dir == Bomber.DIR.DOWN) this.nextPositionY = this.y-Bomber.MOVE_STEP;
    	if(dir == Bomber.DIR.UP) this.nextPositionY = this.y+Bomber.MOVE_STEP;
    	
    	for(var i = 0 ; i < mapArray.length ; i++ ){
    		if( this.closeTo(mapArray[i]) ){
				this.nextDirection = Bomber.DIR.STILL;
                this.nextPositionX = this.x;
                this.nextPositionY = this.y;
				break;
			}
            if(i < mapBomb.length){
                if( this.closeTo(mapBomb[i]) ){
                    this.nextDirection = Bomber.DIR.STILL;
                    this.nextPositionX = this.x;
                    this.nextPositionY = this.y;
                    break;
                }
            }
    	}
  		this.direction = this.nextDirection;
        this.move();
    },

    placeBomb: function(map,type){
    	var mapBomb = map.bomb;
    	for(var i = 0 ; i < mapBomb.length ; i++ ){
    		if((this.closeTo(mapBomb[i]) )|| this.bombNum == 0  ) return false;
    	}
        this.bomb = new Bomb(this, this.map,type);
        this.map.bomb.push(this.bomb);
    	this.bombNum--;
        
    },

    setBomb: function(){
        this.bombNum++;
    },

    setDirection: function(isMove, dir ){
        if(dir == Bomber.DIR.UP)This.isUP = true;
        if(dir == Bomber.DIR.LEFT)This.isLeft = true;
        if(dir == Bomber.DIR.RIGHT)This.isRight = true;
        if(dir == Bomber.DIR.DOWN)This.isDown = true;
    },




    move: function( dt ){
    	
        if(this.direction == Bomber.DIR.UP){
            this.y += Bomber.MOVE_STEP;
            this.direction = Bomber.DIR.STILL;
        }
        if(this.direction == Bomber.DIR.DOWN){
            this.y -= Bomber.MOVE_STEP;
            this.direction = Bomber.DIR.STILL;       
        }
        if(this.direction == Bomber.DIR.LEFT){
            this.x -= Bomber.MOVE_STEP;
            this.direction = Bomber.DIR.STILL;
        }
        if(this.direction == Bomber.DIR.RIGHT){
            this.x += Bomber.MOVE_STEP;
            this.direction = Bomber.DIR.STILL;
                
        }
    	this.updatePosition();
    },
    updatePosition: function() {
        if(this.moveAction !== undefined ){
            this.stopAction(this.moveAction);
        }
        this.moveAction = cc.MoveTo.create( 0.001 , cc.p(this.x,this.y));
        this.runAction(this.moveAction);
    },
    gameOver: function(i) {
        this.gameLayer.setPlayerKill(i);
    }

})

Bomber.MOVE_STEP = 40;
Bomber.DIR = {
	LEFT: 1,
	RIGHT: 2,
	UP: 3,
	DOWN: 4,
	STILL: 0
};