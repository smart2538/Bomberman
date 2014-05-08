var Bomb = cc.Sprite.extend({
	ctor: function(player,map,type) {
		this.player = player;
		this.map = map;
		this._super();
		if(type == 1){
			this.initWithFile( blueBomb );
		}
		if(type == 2){
			this.initWithFile( redBomb );
		}
		this.setAnchorPoint(cc.p(0,0));
        this.setPosition(this.player.getPosition().x,this.player.getPosition().y);
        this.map.addChild(this);
		setTimeout( this.explode.bind(this) , 3000 );
	},


	explode: function(){
		this.fire = new Fire(1,this.getPosition(),this.map,this.player,this.player.force);
		this.setPosition(cc.p(850,750));
		this.removeFromParent();
		this.player.setBomb();
	},
});