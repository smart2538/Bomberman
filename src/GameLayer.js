var GameLayer = cc.LayerColor.extend({
    playerKill:[],
    init: function() {
        this._super( new cc.Color4B( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );
        this.back = new Background();
        this.back.setAnchorPoint(0,0);
        this.back.setScale(5);
        this.addChild( this.back );
       
        this.map = new Map();
        this.map.setPosition( cc.p( 0, 40 ) );
        this.addChild( this.map );

        this.player1 = new Bomber( 60 , 0 ,this.map,this );
        this.map.addChild( this.player1 );
        this.player1.scheduleUpdate();

        this.player2 = new Bomber( (12*60)-20 ,12*40 ,this.map , this )
        this.map.addChild( this.player2 );
        this.player2.scheduleUpdate();

        this.map.player.push(this.player1);
        this.map.player.push(this.player2);

        this.playerKill[0] = 0;
        this.playerKill[1] = 0;
        this.playerOneLabel = cc.LabelTTF.create('Player1 : '+ this.playerKill[0],  'Times New Roman', 32);
        this.playerOneLabel.setAnchorPoint(0,0);
        this.playerOneLabel.setPosition(cc.p(20,630))
        this.addChild(this.playerOneLabel);

        this.playerTwoLabel = cc.LabelTTF.create('Player2 : '+ this.playerKill[1],  'Times New Roman', 32);
        this.playerTwoLabel.setAnchorPoint(0,0);
        this.playerTwoLabel.setPosition(cc.p(640,630))
        this.addChild(this.playerTwoLabel);

        this.timeLabel = cc

        this.setKeyboardEnabled( true );
        return true;
    },
    onKeyDown: function( e ) {
        if(e == cc.KEY.a)
            this.player1.setNextDirection( Bomber.DIR.LEFT,this.map );
        if(e == cc.KEY.d)
            this.player1.setNextDirection( Bomber.DIR.RIGHT,this.map );
        if(e == cc.KEY.w)
            this.player1.setNextDirection( Bomber.DIR.UP,this.map );
        if(e == cc.KEY.s)
            this.player1.setNextDirection( Bomber.DIR.DOWN,this.map );
        if(e == cc.KEY.space)
            this.player1.placeBomb(this.map);
        if(e == cc.KEY.left)
            this.player2.setNextDirection( Bomber.DIR.LEFT,this.map );
        if(e == cc.KEY.right)
            this.player2.setNextDirection( Bomber.DIR.RIGHT,this.map );
        if(e == cc.KEY.up)
            this.player2.setNextDirection( Bomber.DIR.UP,this.map );
        if(e == cc.KEY.down)
            this.player2.setNextDirection( Bomber.DIR.DOWN,this.map );
        if(e == 96)
            this.player2.placeBomb(this.map);

    },
    setPlayerKill: function(i){
            this.playerKill[i]++;    
            this.playerOneLabel.setString("Player1 : " + this.playerKill[0]);
            this.playerTwoLabel.setString("Player2 : " + this.playerKill[1]);

    }
});

var StartScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new GameLayer();
        console.log( 'GameLayer created' );
        layer.init();
        this.addChild( layer );
    }
});

