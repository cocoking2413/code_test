## 简单的显示单线流程jquery插件

##### 依赖
* jquery
* layui
* artTemplate


##### 功能

> 简单节点列表展示  
> 使用svg绘制节点展示表格  
> 丰富的参数配置  

##### 目录结构
 
├── Readme.md                 // help  
├── bin                         
│   ├── jquery.zms.listTable2.min.js   
├── lib                      //外部依赖     
│   ├── layer    
│   │	└── layer.js 		 
│   ├──jquery-1.9.1.min.js     
│   └──template.js    		//artTemplate 
├── src                         
│   └── jquery.zms.listTable.js //插件js   
└── test
    └── jquery.zms.listTable.min.js    


##### 使用方法

	<script>
    $(function () {
        $(".listTable").zms_listTable({
            bgcolor: '#bbcee9',
            svgframe: "temp_zms_listTable_svgframe",
            fontsize: "20",
            size:{width:'600',height:'600',maxHeight:'1200px',arrowHeight:40,raw:5},
            // size:{height:'600px'}
        });
    });
	</script>



##### V0.0.2 版本
1. 加入gulp
2. 结构调整
3. 样式依据项目要求覆盖
4. 节点根据项目需要处理过

##### V0.0.1 版本
1. 基础样子
2. 样式还有问题
3. 参数需要重新整理
4. 开始节点处理还需另行处理