var MenuLayer = cc.Layer.extend({
    ctor : function(){
        this._super();

    },
    init:function(){
        this._super();
        this.begin = false;
        this.setTouchEnabled(true);
        this.setTouchMode(1);

        var director = cc.Director.getInstance();
        var winsize = director.getWinSize();
        var centerpos = cc.p(winsize.width / 2, winsize.height / 2);

        black = cc.Sprite.create("images/black.jpg");
        black.setAnchorPoint(0,0);
        black.setPosition(cc.p(0,0));
        cc.AudioEngine.getInstance().playEffect( bomberman );
        var audioEngine = cc.AudioEngine.getInstance();
        audioEngine.playMusic(titleSong, true);
        audioEngine.setMusicVolume(0.5);


        var bg = cc.Sprite.create(homeScreen);
        bg.setPosition(centerpos);

        this.addChild(bg);

        
        // var logo = cc.Sprite.create(s_logo);
        // logo.setPosition(cc.p(winsize.width / 2, winsize.height/2));
        // this.addChild(logo, 1);
        
        // var neonColor = cc.c3b(117, 248, 250)
        // var textField = cc.LabelTTF.create("Click TO START", "TR2N", 50);
        // textField.setAnchorPoint( cc.p( 0.5, 0.5));
        // textField.setPosition( cc.p( screenWidth/2, 140));
        // textField.setColor( neonColor );
        // textField.setOpacity(0);
        
        // textField.enableStroke(cc.c3b(70, 200, 250),1,true);

        var fadeIn = cc.FadeIn.create(1.0);
        var fadeOut = cc.FadeOut.create(1.0);
        var delay = cc.DelayTime.create(0.5);
        // textField.runAction(cc.RepeatForever.create(cc.Sequence.create(fadeIn, delay, fadeOut)));
        // this.addChild(textField,300);
    },
    onTouchBegan:function(touch, event) {
        if(this.begin == false){
            this.runAction(cc.FadeOut.create(2));
            cc.AudioEngine.getInstance().playEffect( start );
            var audioEngine = cc.AudioEngine.getInstance();
            audioEngine.setMusicVolume(0.5);
            audioEngine.stopMusic();
            this.onPlay();
            this.begin=true;
        }
    },

    onPlay : function(){
        var scene = new StartScene();
        this.addChild(scene);
         this.addChild(black);
         black.runAction(cc.FadeOut.create(1));


        //cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.5, scene));
    }
});
var menuScene = cc.Scene.extend({
     ctor:function () {
        this._super();
        var layer = new MenuLayer();
        layer.init();
        this.addChild(layer);

    }
});

menuScene.create = function () {
    var sg = new MenuLayer();
    sg.init();
    return sg;
};


menuScene.scene = function () {
    var scene = cc.Scene.create();
    var layer = new MenuLayer();
    scene.addChild(layer);
    return scene;
};