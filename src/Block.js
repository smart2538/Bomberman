var Block = cc.Sprite.extend({
	ctor: function(map,x,y) {
		this._super();
		this.initWithFile( block );
		this.map = map;
		this.setAnchorPoint(cc.p(0,0));
        this.setPosition(x,y);
        this.scheduleUpdate();
		
	},
	closeTo: function( obj ) {
		var myPos = this.getPosition();
		var oPos = obj.getPosition();
  		return ( ( Math.abs( myPos.x - oPos.x ) <= 30 ) && ( Math.abs( myPos.y - oPos.y ) <= 30 ) );
    },
    update: function(dt){
		for(var i = 0 ; i<this.map.fire.length ; i++){
				if(Math.abs(this.map.fire[i].getPosition().x - this.getPosition().x) <=30 &&
			   		Math.abs(this.map.fire[i].getPosition().y - this.getPosition().y) <=30){
						setTimeout(this.randomItem.bind(this),500);
						this.removeFromParent();
						
				}
			}
	},
	randomItem: function(){
		var random = parseInt(Math.random()*5);
		if(random == 0 ){
			this.item = new ItemBomb(this.map,this.getPosition().x,this.getPosition().y);
        	this.map.addChild(this.item);
    	}else if(random == 1){
    		this.item = new ItemFire(this.map,this.getPosition().x,this.getPosition().y);
        	this.map.addChild(this.item);
    	}else if(random == 2){
    		this.item = new ItemImmortal(this.map,this.getPosition().x,this.getPosition().y);
        	this.map.addChild(this.item);
        }
    	this.setPosition(cc.p(850,750));
	}
})