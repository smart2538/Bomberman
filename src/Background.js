var Background = cc.Sprite.extend({
	ctor: function() {
		this._super();
		this.initWithFile( 'images/background1.jpg' );
		this.setScale(5);
	}
})