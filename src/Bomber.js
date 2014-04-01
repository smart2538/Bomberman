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
	},
	closeTo: function( obj ) {
		var myPos = this.getPosition();
		var oPos = obj.getPosition();
  		return ( ( Math.abs( myPos.x - oPos.x ) <= 20 ) || ( Math.abs( myPos.y - oPos.y ) <= 20 ) );
    },
    updatePosition: function() {
        this.setPosition( cc.p( this.x, this.y ) );
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
    		if((Math.abs( this.nextPositionX - mapArray[i].getPosition().x ) <= 30 ) && ( Math.abs( this.nextPositionY - mapArray[i].getPosition().y ) <= 30 )){
				this.nextDirection = Bomber.DIR.STILL;
				break;
			}
    	}
  		this.direction = this.nextDirection;
    },
    placeBomb: function(map){
    	var mapArray = map.arr;
    	for(var i = 0 ; i < mapArray.length ; i++ ){
    		if(((Math.abs( this.x - mapArray[i].getPosition().x ) <= 30 ) && ( Math.abs( this.y - mapArray[i].getPosition().y ) <= 30 ) )|| this.bomb == 0 ){
				return false;
			}
    	}
    	this.bomb--;
    	return true;
    },



    update: function( dt ){
    	switch ( this.direction ){
    		case Bomber.DIR.UP:
    			this.y += Bomber.MOVE_STEP;
    			this.direction = Bomber.DIR.STILL;
    			break;
    		case Bomber.DIR.DOWN:
    			this.y -= Bomber.MOVE_STEP;
    			this.direction = Bomber.DIR.STILL;
    			break;
    		case Bomber.DIR.LEFT:
    			this.x -= Bomber.MOVE_STEP;
    			this.direction = Bomber.DIR.STILL;
    			break;
    		case Bomber.DIR.RIGHT:
    			this.x += Bomber.MOVE_STEP;
    			this.direction = Bomber.DIR.STILL;
    			break; 
    		default: break;
    	}
    	this.updatePosition();
    },

})

Bomber.MOVE_STEP = 10;
Bomber.DIR = {
	LEFT: 1,
	RIGHT: 2,
	UP: 3,
	DOWN: 4,
	STILL: 0
};