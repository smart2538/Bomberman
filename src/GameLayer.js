var GameLayer = cc.LayerColor.extend({
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

        this.player = new Bomber( 10*40 , 6*40 ,this.map );
        this.map.addChild( this.player );
        this.player.scheduleUpdate();

        this.setKeyboardEnabled( true );
        return true;
    },
    onKeyDown: function( e ) {
        switch( e ) {
        case cc.KEY.left:
            this.player.setNextDirection( Bomber.DIR.LEFT,this.map );
            break;
        case cc.KEY.right:
            this.player.setNextDirection( Bomber.DIR.RIGHT,this.map );
            break;
        case cc.KEY.up:
            this.player.setNextDirection( Bomber.DIR.UP,this.map );
            break;
        case cc.KEY.down:
            this.player.setNextDirection( Bomber.DIR.DOWN,this.map );
            break;
        case cc.KEY.space:
            this.player.placeBomb(this.map);
            break;

        }
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

