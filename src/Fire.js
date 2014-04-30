var Fire = cc.Sprite.extend({
	ctor: function(type,position,map,player,direction,force) {
		this._super();
		this.map = map;
		this.player = player
		this.position = position;
		this.initWithFile( 'images/fire.png' );
		this.setAnchorPoint(cc.p(0,0));
		this.setPosition(position.x,position.y);
		this.map.addChild(this);
		this.direction = direction;
		setTimeout( this.removeFromParent.bind(this) , 1000 );
		if(type == 1 ){
			this.force = this.player.force;
			this.explode();
		} 
		if(type == 2 ){
			this.force = force;
		} this.explodeDirection();

		if(player.closeTo(this)){
			this.player.gameOver();
		}
	},

	explode: function(){
		if(this.force!=1){
		 	if(this.map.closeTo((this.position.x)+40 , this.position.y) == false){
				this.fire1 = new Fire(2,cc.p((this.position.x+40),this.position.y),this.map,this.player,4,this.force - 1);
     		}
     		if(this.map.closeTo((this.position.x)-40 , this.position.y) == false){
				this.fire1 = new Fire(2,cc.p((this.position.x-40),this.position.y),this.map,this.player,3,this.force - 1);
     		}
     		if(this.map.closeTo((this.position.x) , this.position.y+40) == false){
				this.fire1 = new Fire(2,cc.p((this.position.x),this.position.y+40),this.map,this.player,1,this.force - 1);
     		}
     		if(this.map.closeTo((this.position.x) , this.position.y-40) == false){
				this.fire1 = new Fire(2,cc.p((this.position.x),this.position.y-40),this.map,this.player,2,this.force - 1);
     		}
		}		
	},

	explodeDirection: function(){
		this.force--;
			if(this.force>0){
				if(this.map.closeTo((this.position.x)+40 , this.position.y) == false && this.direction == 4){
					this.fire1 = new Fire(2,cc.p((this.position.x+40),this.position.y),this.map,this.player,4,this.force - 1);
     			}
     			if(this.map.closeTo((this.position.x)-40 , this.position.y) == false && this.direction == 3){
					this.fire1 = new Fire(2,cc.p((this.position.x-40),this.position.y),this.map,this.player,3,this.force - 1);
     			}
     			if(this.map.closeTo((this.position.x) , this.position.y+40) == false && this.direction == 1){
					this.fire1 = new Fire(2,cc.p((this.position.x),this.position.y+40),this.map,this.player,1,this.force - 1);
     			}
     			if(this.map.closeTo((this.position.x) , this.position.y-40) == false && this.direction == 2){
					this.fire1 = new Fire(2,cc.p((this.position.x),this.position.y-40),this.map,this.player,2,this.force - 1);
     			}
			}
	}


});