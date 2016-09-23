/**
 * Created by coco king on 2016-09-22.
 * zms_listTable审批进度展示插件
 * 依赖jquery,artTemplate,layui
 */
(function($,window,document,template,layer,undefined) {
    var methods = {
        // 实例化
        init: function(opt) {
            return this.each(function() {
                var $this = $(this);
                $this.defaults={
                    svgframe:'temp_zms_listTable_svgframe',
                    bgcolor:'white',
                    color:'gray',
                    fontsize:'12',
                    font:'Helvetica, Arial, sans-serif',
                    overflow:'visible',
                    icons:['min','full','plus'],
                    size:{width:'600',height:'600',maxHeight:'600px',arrowHeight:76,raw:5},
                    stateArray:[
                        {
                        state:0,
                        name:'审批中',
                        color1:'black',
                        bgcolor1:'white',
                        color2:'white',
                        bgcolor2:'#23b7e5',
                        arrowcolor:'#23b7e5'
                    },
                        {
                        state:1,
                        name:'通过',
                        color1:'black',
                        bgcolor1:'white',
                        color2:'white',
                        bgcolor2:'#2de83b',
                        arrowcolor:'#2de83b'
                    },
                        {
                        state:2,
                        name:'驳回',
                        color1:'black',
                        bgcolor1:'white',
                        color2:'white',
                        bgcolor2:'#8312d8',
                        arrowcolor:'#8312d8'
                    },
                        {
                        state:3,
                        name:'终止',
                        color1:'black',
                        bgcolor1:'white',
                        color2:'white',
                        bgcolor2:'#fb6e52',
                        arrowcolor:'#fb6e52'
                    }
                    ],
                    data: {
                        title: '审批表单名称',
                        state: 1,
                        username:'申请人姓名',
                        createTime:new Date(),
                        list: [
                            {
                                id:0,
                                title: '节点1',
                                state: 1,
                                appUserName:'刘侃',
                                oprate:'审批',
                                popTitle: '详情',
                                popContent: '没有内容'
                            },
                            {
                                id:1,
                                title: '节点2',
                                state: 0,
                                appUserName:'李欢',
                                oprate:'审批',
                                popTitle: '详情',
                                popContent: '没有内容'
                            },
                            {
                                id:2,
                                title: '节点3',
                                state: 0,
                                appUserName:'李欢',
                                oprate:'审批',
                                popTitle: '详情',
                                popContent: '没有内容'
                            },
                            {
                                id:3,
                                title: '节点4',
                                state: 0,
                                appUserName:'李欢',
                                oprate:'审批',
                                popTitle: '详情',
                                popContent: '没有内容'
                            },
                            {
                                id:4,
                                title: '节点5',
                                state: 0,
                                appUserName:'李欢',
                                oprate:'审批',
                                popTitle: '详情',
                                popContent: '没有内容'
                            }
                        ]
                    },
                    renderMap:{
                        property:'list',
                        title:'title',
                        state:'state',
                        popTitle:'popTitle',
                        popContent:'popContent'
                    },
                    nodeHover:function(obj){
                       return layer.open({
                            type:1,
                            shade: 0,
                            area: ['500px', '300px'],
                            title:$(obj).data('title'),
                            content:$(obj).data('content')
                        });
                    },
                    other:null
                };
                $this.options=$.extend({},$this.defaults,opt);
                // 执行代码
                $this.css('background-color',$this.options.bgcolor).css('width',$this.options.size.width).css('height',$this.options.size.height);
                var htmlFrame=template($this.options.svgframe,$this.options);
                $this.html(htmlFrame);
                $this.layerid=null;
                $('.zms_listTable.node').hover(function(){
                   //$this.layerid=layer.tips($(this).data('content')||$(this).find('g:eq(0)').data('content'),this);
                    $this.layerid=$this.options.nodeHover(this);
                },function(){
                    layer.close($this.layerid);
                });
            });
        }
    };

    $.fn.zms_listTable = function() {
        var method = arguments[0];
        if(methods[method]) {
            method = methods[method];
        } else if( typeof(method) == 'object' || !method ) {
            method = methods.init;
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.zms_listTable' );
            return this;
        }
        return method.call(this,arguments[0],arguments[1]);
    }
})(jQuery,window,document,template,layer);