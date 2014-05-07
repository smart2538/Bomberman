var Bomb = cc.Sprite.extend({
	ctor: function(player,map,type) {
		this.player = player;
		this.map = map;
		this._super();
		if(type == 1){
			this.initWithFile( 'images/bomb1.png' );
		}
		if(type == 2){
			console.log("kljdkdl");
			this.initWithFile( 'images/bomb2.png' );
		}
		this.setAnchorPoint(cc.p(0,0));
        this.setPosition(this.player.getPosition().x,this.player.getPosition().y);
        this.map.addChild(this);
		setTimeout( this.explode.bind(this) , 3000 );
	},


	explode: function(){
		this.fire = new Fire(1,this.getPosition(),this.map,this.player,0);
		this.setPosition(cc.p(850,750));
		this.removeFromParent();
		this.player.setBomb();
	},
});