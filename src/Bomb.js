var Bomb = cc.Sprite.extend({
	ctor: function() {
		this._super();
		this.initWithFile( 'images/bomb2.png' );
	},
	closeTo: function( obj ) {
		var myPos = this.getPosition();
		var oPos = obj.getPosition();
  		return ( ( Math.abs( myPos.x - oPos.x ) <= 30 ) && ( Math.abs( myPos.y - oPos.y ) <= 30 ) );
    }
})