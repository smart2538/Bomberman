var Bomber = cc.Sprite.extend({
	ctor: function( x , y ) {
		this._super();
		this.initWithFile( 'images/character2.png' );
		this.nextDirection = Bomber.DIR.STILL;
		this.nextPositionX = 0;
		this.nextPositionY = 0;
		this.bomb = 5 ;
        this.direction = Bomber.DIR.STILL;
        this.setAnchorPoint( cc.p( 0, 0 ) );
		this.x = x;
        this.y = y;
        this.setPosition(this.x,this.y);
        this.isRight = false;
        this.isLeft = false;
        this.isUp = false;
        this.isDown = false;

	},

	closeTo: function( mapArr ) {
		var mapPos = mapArr.getPosition();
  		return  (Math.abs( this.nextPositionX - mapPos.x ) <= 30 ) && ( Math.abs(this.nextPositionY - mapPos.y) <= 30 );
    },

    setNextDirection: function( dir,map ) {

    	this.nextDirection = dir;
    	var mapArray = map.arr;
    	this.nextPositionX = this.x;
    	this.nextPositionY = this.y;
    	
    	if(dir == Bomber.DIR.LEFT) this.nextPositionX = this.x-Bomber.MOVE_STEP;
    	if(dir == Bomber.DIR.RIGHT) this.nextPositionX = this.x+Bomber.MOVE_STEP;
    	if(dir == Bomber.DIR.DOWN) this.nextPositionY = this.y-Bomber.MOVE_STEP;
    	if(dir == Bomber.DIR.UP) this.nextPositionY = this.y+Bomber.MOVE_STEP;
    	
    	for(var i = 0 ; i < mapArray.length ; i++ ){
    		if( this.closeTo(mapArray[i]) ){
				this.nextDirection = Bomber.DIR.STILL;
				break;
			}
    	}
  		this.direction = this.nextDirection;
        this.move();
    },

    placeBomb: function(map){
    	var mapArray = map.arr;
    	for(var i = 0 ; i < mapArray.length ; i++ ){
    		if((this.closeTo(mapArray[i]) )|| this.bomb == 0 ){
				return false;
			}
    	}
    	this.bomb--;
    	return true;
    },

    setBomb: function(){
        this.bomb++;
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

        this.moveAction = cc.MoveTo.create( 0.05, cc.p(this.x,this.y));
        this.runAction(this.moveAction);
    },

})

Bomber.MOVE_STEP = 5;
Bomber.DIR = {
	LEFT: 1,
	RIGHT: 2,
	UP: 3,
	DOWN: 4,
	STILL: 0
};