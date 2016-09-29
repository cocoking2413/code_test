/**
 * Created by coco king on 2016-09-22.
 * zms_listTable审批进度展示插件
 * 依赖jquery,artTemplate,layui
 */

//https://github.com/jquery-boilerplate

// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
; (function ($, window, document, template, layer, undefined) {

    "use strict";

    // undefined is used here as the undefined global variable in ECMAScript 3 is
    // mutable (ie. it can be changed by someone else). undefined isn't really being
    // passed in so we can ensure the value of it is truly undefined. In ES5, undefined
    // can no longer be modified.

    // window and document are passed through as local variables rather than global
    // as this (slightly) quickens the resolution process and can be more efficiently
    // minified (especially when both are regularly referenced in your plugin).

    // Create the defaults once
    var pluginName = "zms_listTable",
        defaults = {
            svgframe: 'temp_zms_listTable_svgframe_default',
            bgcolor: 'white',
            color: 'gray',
            fontsize: '12',
            font: 'Helvetica, Arial, sans-serif',
            overflow: 'visible',
            icons: ['min', 'full', 'plus'],
            size: { width: '600', height: '600', maxHeight: '600px', arrowHeight: 76, raw: 5, rx: 10, ry: 10 },
            stateArray: [
                {
                    state: 0,
                    name: '审批中',
                    color1: 'black',
                    bgcolor1: 'white',
                    color2: 'white',
                    bgcolor2: '#23b7e5',
                    arrowcolor: '#23b7e5'
                },
                {
                    state: 1,
                    name: '通过',
                    color1: 'black',
                    bgcolor1: 'white',
                    color2: 'white',
                    bgcolor2: '#f8b62d',
                    arrowcolor: '#f8b62d'
                },
                {
                    state: 2,
                    name: '驳回',
                    color1: 'black',
                    bgcolor1: 'white',
                    color2: 'white',
                    bgcolor2: '#8312d8',
                    arrowcolor: '#8312d8'
                },
                {
                    state: 3,
                    name: '终止',
                    color1: 'black',
                    bgcolor1: 'white',
                    color2: 'white',
                    bgcolor2: '#fb6e52',
                    arrowcolor: '#fb6e52'
                },
                {
                    state: 4,
                    name: '提交',
                    color1: 'black',
                    bgcolor1: 'white',
                    color2: 'white',
                    bgcolor2: '#5CB95C   ',
                    arrowcolor: '#5CB95C   '
                },


            ],
            data: {
                Title: '审批表单名称',
                State: 1,
                UserName: '申请人姓名',
                CreateTime: new Date(),
                Remark: [
                  {
                      ID: 79,
                      ApproveID: 78,
                      UserID: 3,
                      ApproveUser: 449,
                      ApproveUserName: '123',
                      ApproveComment: 'sdasdsad',
                      State: 1,
                      ApproveTime: '2016-09-27T13:16:01',
                      CreateTime: '2016-09-27T13:16:01',
                      Remark: '',
                      ZMSCompanyID: 1
                  }
                ]
            },
            renderMap: {
                title: 'Title',
                state: 'State',
                username: 'UserName',
                createTime: 'CreateTime',
                datalist: 'Remark',
                list: {
                    id: 'ID',
                    title: 'ApproveUserName',
                    state: 'State',
                    appTime: 'ApproveTime',
                    createTime: 'CreateTime',
                    appUserName: 'ApproveUserName',
                    appContent: 'ApproveComment',
                    popTitle: 'ApproveUserName',
                    popContent: 'ApproveComment'
                }
            },
            nodeHover: function (obj) {
                return layer.open({
                    type: 1,
                    shade: 0,
                    area: ['500px', '300px'],
                    title: $(obj).data('title'),
                    content: $(obj).data('content')
                });
            },
            error: function (e) {
                layer.msg(e.message);
            },
            other: null
        },
        defaultTemplateHtml = '<script type="text/template" id="temp_zms_listTable_svgframe_default"> <h3 style="text-align: center;vertical-align: middle;padding: 10px 0" width="{{size.width}}" height="50px">{{data.title}}</h3><svg rx="{{size.rx}}" ry="{{size.ry}}" width="{{size.width}}" height="{{size.height}}" xmlns="http://www.w3.org/2000/svg" style="max-height:{{size.maxHeight}};overflow:{{overflow}};"><defs> {{each stateArray}}<marker id="arrow_{{$value.state}}" markerUnits="strokeWidth" markerWidth="12"  markerHeight="12" viewBox="0 0 12 12" refX="6" refY="6" orient="auto"><path d="M2,2 L10,6 L2,10 L6,6 L2,2" style="fill:{{$value.arrowcolor}};" /></marker> {{/each}}</defs> <g><rect fill="{{bgcolor}}" id="canvas_background" height="402" width="582" y="-1" x="-1" /><g display="none" overflow="visible" y="0" x="0" height="100%" width="100%" id="canvasGrid"> <rect fill="url(#gridpattern)" stroke-width="0" y="0" x="0" height="100%" width="100%" /></g> </g>{{each data.list}}<g class="zms_listTable node" data-title="{{$value.popTitle}}" data-content="{{$value.popContent}}"><rect stroke="{{stateArray[$value.state].bgcolor2}}" id="svg_1_{{$value.id}}" height="{{size.arrowHeight}}" width="{{size.arrowHeight*size.raw}}" y="{{size.arrowHeight*(3*$index+1)}}" x="{{(size.width-size.arrowHeight*size.raw)/2}}" stroke-width="0.5" fill="{{stateArray[$value.state].bgcolor1}}"> </rect> <rect stroke="{{stateArray[$value.state].bgcolor2}}" id="svg_2_{{$value.id}}" height="{{size.arrowHeight}}" width="{{size.arrowHeight*size.raw}}"  y="{{size.arrowHeight*(3*$index+2)}}" x="{{(size.width-size.arrowHeight*size.raw)/2}}" fill-opacity="null" stroke-opacity="null" stroke-width="0.5" fill="{{stateArray[$value.state].bgcolor2}}" /><text xml:space="preserve" style="cursor: default" text-anchor="middle" font-family="{{font}}" font-size="{{fontsize}}" id="svg_5_{{$value.id}}" x="50%" y="{{size.arrowHeight*(3*$index+1.6)}}" fill-opacity="null" stroke-opacity="null" stroke-width="0" stroke="{{stateArray[$value.state].color1}}" fill="{{stateArray[$value.state].color1}}">{{$value.appTime | dateFormat:"yyyy-MM-dd hh:mm"}}</text><text xml:space="preserve" style="cursor: default" text-anchor="middle" font-family="{{font}}" font-size="{{fontsize}}" id="svg_6_{{$value.id}}" x="50%" y="{{size.arrowHeight*(3*$index+2.6)}}" fill-opacity="null" stroke-opacity="null" stroke-width="0" stroke="{{stateArray[$value.state].color2}}" fill="{{stateArray[$value.state].color2}}">{{stateArray[$value.state].name}}-{{$value.appUserName}}</text></g><line x1="{{size.width/2}}" y1="{{size.arrowHeight*(3*$index+3)}}" x2="{{size.width/2}}" y2="{{size.arrowHeight*(3*$index+4)-5}}" stroke="{{stateArray[$value.state].arrowcolor}}" stroke-width="2" marker-end="url(#arrow_{{$value.state}})" />  {{/each}} <g><rect stroke="{{stateArray[data.state].bgcolor2}}" id="svg_end" height="{{size.arrowHeight}}" width="{{size.arrowHeight*size.raw}}" y="{{size.arrowHeight*(3*data.list.length+1)}}" x="{{(size.width-size.arrowHeight*size.raw)/2}}" stroke-width="0.5" fill="{{stateArray[data.state].bgcolor2}}"></rect><text xml:space="preserve" style="cursor: default" text-anchor="middle" font-family="{{font}}" font-size="{{fontsize}}" id="svg_end_text" x="50%" y="{{size.arrowHeight*(3*data.list.length+1.6)}}" fill-opacity="null" stroke-opacity="null" stroke-width="0" stroke="{{stateArray[data.state].color2}}" fill="{{stateArray[data.state].color2}}">{{stateArray[data.state].name}}</text></g></svg></script>';

    function turnDate(map, data, sucfuc, errfuc) {
        try {
            if (map && typeof (map) == 'object', data && typeof (data) == 'object') {
                var default_renderMap = {
                    title: 'Title',
                    state: 'State',
                    username: 'UserName',
                    createTime: 'CreateTime',
                    datalist: 'Remark',
                    list: {
                        id: 'ID',
                        title: 'ApproveUserName',
                        state: 'State',
                        appTime: 'ApproveTime',
                        createTime: 'CreateTime',
                        appUserName: 'ApproveUserName',
                        appContent: 'ApproveComment',
                        popTitle: 'ApproveUserName',
                        popContent: 'ApproveComment'
                    }
                };
                map = $.extend({}, default_renderMap, map);

                var obj = {
                    title: data[map.title],
                    state: data[map.state],
                    username: data[map.username],
                    createTime: data[map.createTime],
                    list: data[map.datalist]
                };
                for (var i = 0; i < obj.list.length; i++) {
                    if (!isNaN(obj.list[i][map.list.state])) {
                        var dataobj = {
                            id: obj.list[i][map.list.id],
                            title: obj.list[i][map.list.title],
                            state: obj.list[i][map.list.state],
                            appTime: obj.list[i][map.list.appTime],
                            createTime: obj.list[i][map.list.createTime],
                            appUserName: obj.list[i][map.list.appUserName],
                            appContent: obj.list[i][map.list.appContent],
                            popTitle: obj.list[i][map.list.popTitle],
                            popContent: obj.list[i][map.list.popContent]
                        };
                        obj.list[i] = dataobj;
                    } else {
                        break;
                    }
                }
                if (sucfuc) sucfuc(obj);
                return;
            }
            if (errfuc) errfuc({ message: "进程展示插件参数有误!" });
        } catch (e) {
            if (errfuc) errfuc(e);
        }
        return;
    }

    // The actual plugin constructor
    function Plugin(element, options) {
        this.element = element;

        // jQuery has an extend method which merges the contents of two or
        // more objects, storing the result in the first object. The first object
        // is generally empty as we don't want to alter the default options for
        // future instances of the plugin
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this._turnData = turnDate;
        this.init(this);
    }

    // Avoid Plugin.prototype conflicts
    $.extend(Plugin.prototype, {
        init: function (obj) {
            var $this = $(obj.element);
            // Place initialization logic here
            // You already have access to the DOM element and
            // the options via the instance, e.g. this.element
            // and this.settings
            // you can add more functions like the one below and
            // call them like the example below
            try {
                //数据处理
                obj._turnData(obj.options.renderMap, obj.options.data, function (data) {
                    obj.options.data = data;
                }, function (e) {
                    $.error(e.message);
                    obj.options.error(e);
                });
                //渲染
                $this.css('background-color', obj.options.bgcolor).css('width', obj.options.size.width).css('height', obj.options.size.height);
                if (obj.options.svgframe == 'temp_zms_listTable_svgframe_default' && $('#temp_zms_listTable_svgframe_default').html() == null)
                    $('body').append(defaultTemplateHtml);
                var htmlFrame = template(obj.options.svgframe, obj.options);
                $this.html(htmlFrame);
            } catch (e) { $.error(e.message); obj.options.error(e); }
            $this.layerid = null;
            $('.zms_listTable.node').hover(function () {
                try {
                    if (obj.options.nodeHover) $this.layerid = obj.options.nodeHover(this);
                } catch (e) { $.error(e.message); obj.options.error(e); }
            }, function () {
                layer.close($this.layerid);
            });
        }
    });

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            //if (!$.data(this, "plugin_" + pluginName)) {
            //     $.data(this, "plugin_" +
            //         pluginName, new Plugin(this, options));
            // }
            var plugin = new Plugin(this, options);
            return this;
        });
    };

})(jQuery, window, document, template, layer);