var Robot ={
    run:function(){
        var arr =[ 3,1,4,2,0];
        for( k in arr){
            var i = arr[k];
            if( global.athur[i].key_now == global.keys[0][0] ||
                global.athur[i].key_now == global.keys[0][1]
            ){
                for(j in global.lines[i]){
                    if(global.moveKeys(i,global.lines[i][j],true)){
                        return true;
                    }
                }
            }
        }
        for(var i = 4 ; i >=0 ; i-- ){
            if( global.athur[i].key_now == global.keys[0][0] ||
                global.athur[i].key_now == global.keys[0][1] ){
                global.die(i);
                if(global.dies_arr.length == 2){
                    return false;
                }
                return true;
            }
        }
        return false;
    }
}
var global ={
        dies_arr:[],
        die:function(i){
            obj = global.athur[i].key_now;
            global.athur[i].key_now =undefined;
            obj.runAction(
                cc.spawn(cc.moveTo(0.4,{x:278 +  ( global.dies_arr.length + 1 - 0.5) * global.keyW ,
                                    y:global.allH - 712}))
            );
            global.dies_arr.push(obj);
        },
        lines:[[1,2,3,4],[0,2,3],[0,1,4],[0,1],[0,2]],
        work_arthur:-1,
        do_step:function(){
            global.step_number.string = 1 + parseInt( global.step_number.string );

        },
        moveKeys:function(f , t , robot ,fuc){
            robot = robot || false;
            if(! robot &&
                     ( global.athur[ global.work_arthur ].key_now == global.keys[0][0] ||
                        global.athur[ global.work_arthur ].key_now == global.keys[0][1]
                    ))
            {
                alert("请移动绿棋子");
                return false;
            }
            if( f < 0  || f >= 5 || t < 0 || t >= 5 || f == t){
                return false;
            }
            if(global.athur[f].key_now == undefined){
                return false;
            }
            if(global.athur[t].key_now != undefined){
                return false;
            }
            for(var k in global.lines[ f ]){
                if( global.lines[ f ][k] == t  ){
                    global.athur[f].key_now.runAction(
                        cc.spawn(cc.moveTo(0.4,global.athur[t]))
                    )
                    global.athur[t].key_now = global.athur[f].key_now;
                    global.athur[f].key_now =undefined;
                    return true ;
                }
            }
            return false;
        },
        success:function(){
            var step = parseInt( global.step_number.string )
            if(step > 7 ){
                global.dataForWeixin.wording ="你用了"+ step + "完成了挑战，但是据说曹植只需要7步。";
                global.dataForWeixin.title="我用"+ step +"步完成了挑战，据说可以7步之内完成挑战的智商可以比较曹植，小伙伴快来试试吧～";
            }else if(step > 7 ){
                global.dataForWeixin.wording ="你用了7步完成了挑战，智商可以比肩曹植。";
                global.dataForWeixin.title="我用7步完成了挑战，智商比肩曹植，小伙伴快来挑战吧^_^";
            }else{
                global.dataForWeixin.wording ="你用了"+ step +"步完成了挑战，智商可以比肩曹植。";
                global.dataForWeixin.title="我用"+ step +"步完成了挑战，智商超过了曹植，小伙伴快来挑战吧^_^";
            }
            document.getElementById("success-word").innerHTML = global.dataForWeixin.wording;
            document.getElementById("pop-success").style.display="block";;
            document.getElementById("ad").style.display="none";
        },
        fail:function(){
           global.dataForWeixin.title="据说可以7步之内完成挑战的智商可以比肩曹植，小伙伴快来试试吧～";
           document.getElementById("pop-fail").style.display="block";
           document.getElementById("ad").style.display="none";
        },
        testLine:function(n){
            for( var i =0 ;i <5 ;i++){
                if( global.athur[i].key_now == global.keys[n][0] ||
                    global.athur[i].key_now == global.keys[n][1]
                ){
                    for(j in global.lines[i]){
                        var k = global.lines[i][j]; 
                        if(global.athur[k].key_now == undefined){
                            return true;
                        }
                    }
                }
            }
            return false;
        },
        getAuthByPos:function(pos){
            pos =pos || {x:0,y:0};
            for(i = 0 ;i < 5 ; i++ ){
                if(
                    Math.pow(pos.x - global.athur[i].x , 2) + Math.pow(pos.y - global.athur[i].y ,2) < 
                    Math.pow( global.keyW , 2)
                ){
                    return i;
                }
            }
            return undefined;
        },
        dataForWeixin:{
            appId: "",
            MsgImg: "",
            TLImg: "http://3gimg.qq.com/tele_safe/report/201410/_1414237645_278021.jpg",
            url: "http://game.lvyouda.com/test/html5/",
            title: '据说可以7步之内完成挑战的智商可以比肩曹植，小伙伴快来试试吧～',
            wording:'',
            callback: function() {
                document.getElementById("shareMask").style.display="none";
            },
            show_share_box:function(){
                 document.getElementById("shareMask").style.display="block";
            }
        }
};
var EventListener ={
    touch:function() {
        var touchListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            // When "swallow touches" is true, then returning 'true' from the onTouchBegan method will "swallow" the touch event, preventing other listeners from using it.
            swallowTouches: true,
            //onTouchBegan event callback function
            onTouchMoved:function(touch,event){
            	if(global.work_arthur < 0 ){
            		return;
            	}
                var delta = touch.getDelta();              //获取事件数据: delta
                global.athur[global.work_arthur].key_now.x += delta.x;
                global.athur[global.work_arthur].key_now.y += delta.y;
            },
            onTouchEnded:function(touch,event){
                pos =touch.getLocation();
                i =global.getAuthByPos(pos);

                if( i != undefined && global.work_arthur >=0 && global.moveKeys(global.work_arthur , i) ){
                    global.work_arthur = -1;
                   if( !Robot.run()){
                        global.success();
                   }else{
                        global.do_step();
                        if(!global.testLine(1)){
                            global.fail();
                        }
                   }
                }else{
                	if(global.work_arthur < 0 ){
                		return;
                	}
                    var au =global.athur[global.work_arthur];
                    au.key_now.runAction(
                        cc.spawn(cc.moveTo(0.01,au))
                    )
                    return true; 
                }
            },
            onTouchBegan: function (touch, event) {
                var pos = touch.getLocation();//Cocos2d-js坐标
                i =global.getAuthByPos(pos);
                if( i == undefined ){
                    return false;
                }
                if( global.work_arthur >=0 && global.moveKeys(global.work_arthur , i) ){
                    global.work_arthur = -1;
                   if( !Robot.run()){
                        global.success();
                   }else{
                        global.do_step();
                        if(!global.testLine(1)){
                            global.fail();
                        }
                   }
                }else if( global.athur[i].key_now  ==  global.keys[1][0] ||
                           global.athur[i].key_now  ==  global.keys[1][1]){
                    global.work_arthur = i;
                }
                return true;
            }
        });
        return touchListener;
    }
}
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {

        this._super();
        //初始化地图
        var map = new cc.Sprite(res.MAP_png);
        //初始化四个棋子
        var size = cc.director.getVisibleSize();
        map.attr({
            x: size.width / 2,
            y: size.height - map.height /2,
            scale: 1
        });
        global.step_number= new cc.LabelTTF("0", "Chalkduster", 96);
        global.step_number.color =cc.color(176,88,27,255)
        global.step_number.x = 475;
        global.step_number.y = size.height -235;
        this.addChild(global.step_number, 5);
        global.keys =[
                [ new cc.Sprite(res.K1_png) , new cc.Sprite(res.K1_png) ] ,
                [ new cc.Sprite(res.K2_png) , new cc.Sprite(res.K2_png) ]
            ]
        var kContentSize = global.keys[0][0].getContentSize();
        global.allW = size.width;
        global.allH = size.height;
        global.keyW = kContentSize.width  * 2;
        global.keyH = kContentSize.height * 2;
        global.athur = [
                     { x: 370 , y:size.height - 514 },
                     { x: 170 , y:size.height - 316 },
                     { x: 570 , y:size.height - 316 },
                     { x: 170 , y:size.height - 712 },
                     { x: 570 , y:size.height - 712},
        ];

        this.addChild(map, 0 );
        //安放棋子
        global.athur[0].key_now =undefined;
        global.keys[1][0].attr(global.athur[1] );
        this.addChild( global.keys[1][0]);
        global.athur[1].key_now = global.keys[1][0];
        global.keys[0][0].attr(global.athur[2] );
        this.addChild( global.keys[0][0]);
        global.athur[2].key_now = global.keys[0][0];
        global.keys[0][1].attr(global.athur[3] );
        this.addChild( global.keys[0][1]);
        global.athur[3].key_now = global.keys[0][1];
        global.keys[1][1].attr(global.athur[4] );
        this.addChild( global.keys[1][1]); 
        global.athur[4].key_now = global.keys[1][1];
        var touchListener = EventListener.touch();
        cc.eventManager.addListener(touchListener,this);
      
        return true;
    }
    
});


var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

