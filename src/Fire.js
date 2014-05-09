var Fire = cc.Sprite.extend({
	ctor: function(type,position,map,player,direction,force) {
		this._super();
		this.map = map;
		this.player = player;
		this.position = position;
		this.initWithFile( fire );
		this.setAnchorPoint(cc.p(0,0));
		this.setPosition(position.x,position.y);
		this.map.addChild(this);
		this.direction = direction;
		this.map.fire.push(this);
		setTimeout( this.disAppear.bind(this) , 500 );
		

		if(type == 1 ){
			var audio = cc.AudioEngine.getInstance();
			audio.playEffect( bomb );
			this.force = this.player.force;
			this.explode();
		} 
		if(type == 2 ){
			this.force = force;
			for(var i = 0 ; i<this.map.block.length ; i++){
				if(Math.abs(this.map.block[i].getPosition().x - this.getPosition().x) <=30 &&
			   		Math.abs(this.map.block[i].getPosition().y - this.getPosition().y) <=30){
						this.force = 1 ;
				}
			}
			this.explodeDirection();
		}
		 

		if(this.map.player[1].closeTo(this)){
			this.map.player[1].gameOver(0);
		}
		if(this.map.player[0].closeTo(this)){
			this.map.player[0].gameOver(1);
		}
	},
	disAppear: function(){
		this.removeFromParent();
		this.setPosition(cc.p(850,750));
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
					this.fire1 = new Fire(2,cc.p((this.position.x+40),this.position.y),this.map,this.player,4,this.force );
     			}
     			if(this.map.closeTo((this.position.x)-40 , this.position.y) == false && this.direction == 3){
					this.fire1 = new Fire(2,cc.p((this.position.x-40),this.position.y),this.map,this.player,3,this.force );
     			}
     			if(this.map.closeTo((this.position.x) , this.position.y+40) == false && this.direction == 1){
					this.fire1 = new Fire(2,cc.p((this.position.x),this.position.y+40),this.map,this.player,1,this.force );
     			}
     			if(this.map.closeTo((this.position.x) , this.position.y-40) == false && this.direction == 2){
					this.fire1 = new Fire(2,cc.p((this.position.x),this.position.y-40),this.map,this.player,2,this.force );
     			}
			}
	}


});