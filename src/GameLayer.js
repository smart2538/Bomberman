var GameLayer = cc.LayerColor.extend({
    playerKill:[],
    init: function() {
        this._super( new cc.Color4B( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );
        this.back_1 = new Background(layerBackground);
        this.back_1.setAnchorPoint(0,0);
        this.addChild( this.back_1 );
        this.back_2 = new Background(mapBackground);
        this.back_2.setAnchorPoint(0,0);
        this.back_2.setPosition(cc.p(20,0));
        this.addChild( this.back_2 );

        var audioEngine = cc.AudioEngine.getInstance();
        audioEngine.playMusic(battleSong, true);
       
        this.map = new Map();
        this.map.setPosition( cc.p( 0, 40 ) );
        this.addChild( this.map );

        this.player1 = new Bomber( 60 , 0 ,this.map,this,1 );
        this.map.addChild( this.player1 );
        this.player1.scheduleUpdate();

        this.player2 = new Bomber( (12*60)-20 ,12*40 ,this.map , this,2 )
        this.map.addChild( this.player2 );
        this.player2.scheduleUpdate();


        this.map.player.push(this.player1);
        this.map.player.push(this.player2);

        this.playerKill[0] = 0;
        this.playerKill[1] = 0; 
        this.playerOneLabel = cc.LabelTTF.create('Player1 : '+ this.playerKill[0],  'Courier Regular', 32);
        this.playerOneLabel.setAnchorPoint(0,0);
        this.playerOneLabel.setPosition(cc.p(20,630))
        this.addChild(this.playerOneLabel);

        this.playerTwoLabel = cc.LabelTTF.create('Player2 : '+ this.playerKill[1],  'Courier Regular', 32);
        this.playerTwoLabel.setAnchorPoint(0,0);
        this.playerTwoLabel.setPosition(cc.p(630,630))
        this.addChild(this.playerTwoLabel);

        this.timeCountdown =  180;
        this.timeLabel = cc.LabelTTF.create('Time : '+ this.timeCountdown,  'Courier Regular', 64);
        this.timeLabel.setAnchorPoint(0,0);
        this.timeLabel.setPosition(cc.p(250,600))
        this.addChild(this.timeLabel);
        this.schedule(this.countdown,1);
        this.scheduleUpdate();

        this.setKeyboardEnabled( true );
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
            this.player1.placeBomb(this.map,1);
        if(e == cc.KEY.left)
            this.player2.setNextDirection( Bomber.DIR.LEFT,this.map );
        if(e == cc.KEY.right)
            this.player2.setNextDirection( Bomber.DIR.RIGHT,this.map );
        if(e == cc.KEY.up)
            this.player2.setNextDirection( Bomber.DIR.UP,this.map );
        if(e == cc.KEY.down)
            this.player2.setNextDirection( Bomber.DIR.DOWN,this.map );
        if(e == 96)
            this.player2.placeBomb(this.map,2);

    },
    setPlayerKill: function(i){
            this.playerKill[i]++;    
            this.playerOneLabel.setString("Player1 : " + this.playerKill[0]);
            this.playerTwoLabel.setString("Player2 : " + this.playerKill[1]);

    },
    countdown: function(){
        this.timeCountdown--;
        this.timeLabel.setString('Time : '+ this.timeCountdown);
        if(this.timeCountdown == 0){
            var audioEngine = cc.AudioEngine.getInstance();
            audioEngine.playEffect( timeOut );
            audioEngine.playMusic(victorySong, true);
            this.unschedule(this.countdown);
            this.setKeyboardEnabled(false);
            if(this.playerKill[0] == this.playerKill[1]){
                this.result = "Player Draw!";
            }else if(this.playerKill[0] > this.playerKill[1]){
                        this.result = "Player1 Win!";
                    }else this.result = "Player2 Win!"
            this.resultLabel = cc.LabelTTF.create( this.result,  'Courier Regular', 64);
            this.resultLabel.setAnchorPoint(0,0);
            this.resultLabel.setPosition(cc.p(230,300))
            this.resultLabel.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
            this.addChild(this.resultLabel);
        }
    },
    update: function(dt){
        this.player1.scheduleUpdate();
        this.player2.scheduleUpdate();
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

    