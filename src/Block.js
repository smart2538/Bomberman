var Block = cc.Sprite.extend({
	ctor: function() {
		this._super();
		this.initWithFile( 'images/block.png' );
		this.setScale(0.8);
	},
	closeTo: function( obj ) {
		var myPos = this.getPosition();
		var oPos = obj.getPosition();
  		return ( ( Math.abs( myPos.x - oPos.x ) <= 30 ) && ( Math.abs( myPos.y - oPos.y ) <= 30 ) );
    }
})