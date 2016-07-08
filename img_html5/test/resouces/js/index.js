/**
 * Created by Administrator on 2016-07-08.
 */

var Widget = {};
(function () {
    Widget.DrawImage = function (options) {
        options = $.merge({
            img: '',
            height: 500,
            width: 500
        }, options);
        if (!options.img || !options.height || !options.width) {
            return;
        }
        var imgWidth = options.img.width,
            imgHeight = options.img.height,
            size = this.fixImage(options, {width: imgWidth, height: imgHeight}),
            canvas = $.createElement('canvas', {
                cursor: 'default'
            }, {
                onselectstart: "return false;",
                width: options.width,
                height: options.height
            }),
            canvasHelper = $.createElement('canvas', {}, {
                width: options.width,
                height: options.height
            }),
            hctx = canvasHelper.getContext('2d'),
            padding = {x: (options.width = size.width) / 2, y: (options.height - size.height) / 2},
            range = null;
        if (options.width >= size.width && options.height >= size.height) {
            range = {
                x: padding.x,
                y: padding.y
            };
        } else if (options.width >= size.width) {
            range = {
                x: padding.x,
                y: 0
            };
        } else {
            range = {
                x: 0,
                y: padding.y
            };
        }
        hctx.translate(range.x, range.y);
        hctx.scale(size.width / imgWidth, size.height / imgHeight);
        hctx.drawImage(options.img, 0, 0);

        range.ex = range.x + options.width - 2 * range.x;
        range.ey = range.y + options.height - 2 * range.y;

        this.range = range;
        this.canvas = canvas;
        this.canvasHelper = canvasHelper;
        this.ctx = canvas.getContext('2d');
        this.options = options;
        this.paint();
    };

    Widget.DrawImage.prototype = {
        paint: function () {
            this.clearCanvas();
            this.ctx.drawImage(this.canvasHelper, 0, 0);
        },
        getCtx: function () {
            return this.ctx;
        },
        clearCanvas: function () {
            var options = this.options;
            this.ctx.clearRect(0, 0, options.width, options.height);
        },
        getRange: function () {
            return this.range;
        },
        scale: function (originSize, target, isWidth) {
            var size = {};
            if (isWidth) {
                size.width = target;
                size.height = parseInt(target * originSize.height / originSize.width);
            } else {
                size.height = target;
                size.width = parseInt(target * originSize.width / originSize.height);
            }
            return size;
        },
        fixImage: function (origin, target) {
            var ow = origin.width,
                oh = origin.height,
                size = {height: target.height, width: target.width};
            if (size.width < ow && size.height < oh) {
                return {height: oh, width: ow};
            }
            if (size.width > ow) {
                size = this.scale(size, ow, true);
            }
            if (size.height > oh) {
                size = this.scale(size, oh, false);
            }
            return size;
        },
        appendTo: function (el) {
            el.appendChild(this.canvas);
        }
    };

    Widget.ScreenShot = function (ele, options) {
        options = $.merge({
            height:500,
            width:500,
            selectWidth:80,
            selectHeight:80,
            selectMaxWidth:160,
            selectMaxHeight:160,
            file:'',
            isZoomByRect:true,
            coverBgColor:'rgba(0,0,0,0.4)',
            selectBorderColor:'white'
        }, options);

        if(!ele||!options||options.file.constructor.toString().indexOf('File')==-1){return;}

        this.options=options;
        this.ele=typeof ele==='string'?$.g(ele):ele;
        var selectCanvas= $.createElement('canvas',{},{
           height:options.height,
            width:options.width
        }),
            sctx=selectCanvas.getContext('2d');
        sctx.strokeStyle=options.selectBorderColor;
        sctx.fillStyle=options.coverBgColor;

        this.drawImage=null;
        this.selectPos={x:0,y:0};
        this.selectCanvas=selectCanvas;
        this.range=null;
        this.zoomRect=this.zoom();
        this.selectMinSise={
            width:options.selectWidth,
            height:options.selectHeight
        };
    };

    Widget.ScreenShot.prototype = {
        init:function(){
            var file=this.options.file;
            if(!/image\/\w+/.test(file.type)){
                alert("未能识别文件为图像文件");
                return false;
            }
            var me=this,
                ele=this.ele,
                options=me.options,
                centerPoint={x:(options.width-options.selectWidth)/2,y:(options.height=options.selectHeight)/2},
                reader=new FileReader();

            reader.readAsDataURL(file);
            reader.onload=function(){
                var img=new Image();
                img.onload=function(){
                    var drawImage=new Widget.DrawImage({
                        img:img,
                        height:me.options.height,
                        width:me.options.width
                    }),
                        range=drawImage.getRange();
                    ele.innerHTML='';
                    drawImage.appendTo(ele);
                    me.drawImage=drawImage;
                    me.range=range;
                    me.paintSelectArea(centerPoint.x,centerPoint.y,true);
                    me.bind();
                };
                img.src=this.result;
            };
        },
        exportImage:function(){
            return this.drawImage.canvas.toDataURL();
        },
        clip:function(){
            var options=this.options,
                info=this.selectPos,
                cutter= $.createElement("canvas",{},{
                    width:options.selectWidth,
                    height:options.selectHeight
                }),
                canvas=this.drawImage.canvas;
            this.paintSelectArea(info.x,info.y,false);
            cutter.getContext('2d').drawImage(canvas,info.x,info.y,options.selectWidth,options.selectHeight,0,0,options.selectWidth,options.selectHeight);
            this.paintSelectArea(info.x,info.y,true);
            return cutter.toDataURL();
        },
        paintSelectArea:function(x,y,isAddZoom){
            var options=this.options,
                drawImage=this.drawImage,
                selectCanvas=this.canvas,
                sctx=this.sctx;
            drawImage.paint();
            sctx.clearRect(0,0,options.width,options.height);
            sctx.fillRect(0,0,options.width,options.height);
            sctx.strokeRect(x,y,options.selectWidth,options.selectHeight);
            sctx.clearRect(x+1,y+1,options.selectWidth-2,options.selectHeight-2);
            isAddZoom&&sctx.drawImage(this.zoomRect,x+options.selectWidth-11,y+options.selectHeight-11);
            drawImage.getCtx().drawImage(selectCanvas,0,0);
            this.selectPos={x:x,y:y};
        },
        zoom:function(){
            var canvas = $.createElement('canvas', {}, {
                    width: 10,
                    height: 10
                }),
                ctx = canvas.getContext('2d');
            ctx.strokeStyle = '#000';
            ctx.beginPath();
            ctx.moveTo(0, 10);
            ctx.lineTo(10, 0);
            ctx.moveTo(5, 10);
            ctx.lineTo(10, 5);
            ctx.stroke();
            return canvas;
        },
        zoomByRect:function(){
            var options = this.options,
                selectMinSise = this.selectMinSise;

            if(x < selectMinSise.width) {
                x = options.selectWidth;
            }else if(x > options.selectMaxWidth) {
                x = options.selectMaxWidth
            }

            this.options.selectWidth = x;
            this.options.selectHeight = x;
        },
        zoomByFree:function(x,y){
            var options = this.options,
                selectMinSise = this.selectMinSise;

            if(x < selectMinSise.width) {
                x = options.selectWidth;
            }else if(x > options.selectMaxWidth) {
                x = options.selectMaxWidth
            }

            if(y < selectMinSise.height) {
                y = options.selectHeight;
            }else if(y > options.selectMaxHeight) {
                y = options.selectMaxHeight
            }
            this.options.selectWidth = x;
            this.options.selectHeight = y;
        },
        bind:function(){
            var me = this,
                options = this.options,
                selectMinSise = this.selectMinSise,
                canvas = this.drawImage.canvas,
                imageArea = this.range,
                selectBoxRange = null,
                moveRange = null,
                selectPos = null,
                clickPos = 0,
                timerId = 0,
                isInRange = function(x, y, range) {
                    if(x >= range.x && x <= range.ex && y >= range.y && y <= range.ey) {
                        return true;
                    }
                    return false;
                },
                updateMoveRange = function() {
                    moveRange = { x: imageArea.x, y: imageArea.y, ex: imageArea.ex - options.selectWidth, ey: imageArea.ey - options.selectHeight };
                },
                move = function(e) {
                    var x = e.offsetX, y = e.offsetY;
                    x = x - clickPos.x + selectPos.x;
                    y = y - clickPos.y + selectPos.y;
                    if(x < moveRange.x) {
                        x = moveRange.x
                    }else if(x > moveRange.ex) {
                        x = moveRange.ex;
                    }
                    if(y < moveRange.y) {
                        y = moveRange.y
                    }else if(y > moveRange.ey) {
                        y = moveRange.ey
                    }
                    me.paintSelectArea(x, y, true);
                },
                stop = function() {
                    clearTimeout(timerId);
                    canvas.removeEventListener('mousemove', move, false);
                    canvas.removeEventListener('mousemove', zoomUpdate, false);
                    updateMoveRange();
                },
                zoomUpdate = function(e) {
                    var x = e.offsetX, y = e.offsetY;
                    if(!isInRange(x, y, imageArea)) {
                        return false;
                    }
                    x = x - clickPos.x + clickPos.currentSelectWidth;
                    y = y - clickPos.y + clickPos.currentSelectHeight;
                    if(options.isZoomByRect) {
                        me.zoomByRect(x, y);
                    }else {
                        me.zoomByFree(x, y);
                    }
                    me.paintSelectArea(selectPos.x, selectPos.y, true);
                },
                flag = false;

            updateMoveRange();
            canvas.addEventListener('mousedown', function(e) {
                timerId = setTimeout(function() {
                    flag = true;
                    selectPos = me.selectPos;
                    var	selectBoxRange = { x: selectPos.x, y: selectPos.y, ex: selectPos.x + options.selectWidth, ey: selectPos.y + options.selectHeight },
                        zoomRange = { x: selectPos.x + options.selectWidth - 10, y: selectPos.y + options.selectHeight - 10, ex: selectPos.x + options.selectWidth, ey: selectPos.y + options.selectHeight };
                    if(isInRange(e.offsetX, e.offsetY, zoomRange)) {
                        clickPos = { x: e.offsetX, y: e.offsetY, currentSelectWidth: me.options.selectWidth, currentSelectHeight: me.options.selectHeight };
                        canvas.addEventListener('mousemove', zoomUpdate, false);
                    }else if(isInRange(e.offsetX, e.offsetY, selectBoxRange)) {
                        clickPos = { x: e.offsetX, y: e.offsetY};
                        canvas.addEventListener('mousemove', move, false);
                    }
                }, 50);
            }, false);

            canvas.addEventListener('mouseup', function(e) {
                if(!flag) { return; }
                stop();
            }, false);

            canvas.addEventListener('mouseout', function() {
                stop();
            }, false);
        }
    };
})();