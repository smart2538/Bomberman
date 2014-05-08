var ItemBomb = cc.Sprite.extend({
	ctor: function(map,x,y) {
		this._super();
		this.initWithFile( 'images/itembomb.png' );
		this.map = map;
		this.setAnchorPoint(cc.p(0,0));
        this.setPosition(x,y);
        this.scheduleUpdate();
		
	},
	update: function(dt){
		for(var i = 0 ; i<this.map.player.length ; i++){
			if(Math.abs(this.map.player[i].getPosition().x - this.getPosition().x) <=30 &&
			   Math.abs(this.map.player[i].getPosition().y - this.getPosition().y) <=30){
					this.map.player[i].setBomb();
					this.removeFromParent();
			}
			
		}
		for(var i = 0 ; i<this.map.fire.length ; i++){
				if(Math.abs(this.map.fire[i].getPosition().x - this.getPosition().x) <=30 &&
			   		Math.abs(this.map.fire[i].getPosition().y - this.getPosition().y) <=30){
						this.removeFromParent();
				}
			}
	}
})