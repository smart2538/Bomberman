var Bomb = cc.Sprite.extend({
	ctor: function(player,map) {
		this.player = player;
		this.map = map;
		this._super();
		this.initWithFile( 'images/bomb2.png' );
		this.setAnchorPoint(cc.p(0,0));
        this.setPosition(this.player.getPosition().x,this.player.getPosition().y);
        this.map.addChild(this);
		setTimeout( this.explode.bind(this) , 5000 );
	},

	explode: function(){
		this.removeFromParent();
		this.player.setBomb();
		this.fire = new Fire(1,this.getPosition(),this.map,this.player,0);

	},
	

	// closeTo: function( obj ) {
	// 	var myPos = this.getPosition();
	// 	var oPos = obj.getPosition();
	// 	for
 //  		return ( ( Math.abs( myPos.x - oPos.x ) <= 30 ) && ( Math.abs( myPos.y - oPos.y ) <= 30 ) );
 //    }
});