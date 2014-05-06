var Background = cc.Sprite.extend({
	ctor: function(link) {
		this._super();
		this.initWithFile( link );
		
	}
})