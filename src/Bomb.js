var Bomb = cc.Sprite.extend({
	ctor: function(player) {
		this.player = player;
		this._super();
		this.initWithFile( 'images/bomb2.png' );
		this.setAnchorPoint(cc.p(0,0));
        this.setPosition(this.player.getPosition().x,this.player.getPosition().y);
		setTimeout( this.explode.bind(this) , 5000 );
	},

	explode: function(){
		console.log("Hello");
		this.removeFromParent();
		this.player.setBomb();
	},
	

	closeTo: function( obj ) {
		var myPos = this.getPosition();
		var oPos = obj.getPosition();
  		return ( ( Math.abs( myPos.x - oPos.x ) <= 30 ) && ( Math.abs( myPos.y - oPos.y ) <= 30 ) );
    }
})