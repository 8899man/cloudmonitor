//首页 index





Ext.define('VMS.view.vmsIndex', {
	extend : 'Ext.container.Container',
	alias : 'widget.vmsindex',//不能有大写
	layout : 'border',
	initComponent : function() {
		var me = this;
		me.items = [me.createTree(),me.createContent()];
		me.callParent();
	},
	//创建左侧导航树
	createTree : function(){
		var me = this;
		me.menuTree = new Ext.tree.Panel({
   		 width:240,
   		id:'topo_server_menu',
		 region:'west',
		 store: 'MenuStore4Tree',
		 rootVisible: true,
		 displayField:'name',//显示的名字变量
		 margin:'0 2 0 0',
	     useArrows: true,
	     tbar:[{
             icon:webRoot+'frame/common/themes/images/default/tree/expand-all.gif',
             tooltip:'展开全部',
             handler: function(){
            	 tree.expandAll();
             }
         },'-', {
             icon:webRoot+'frame/common/themes/images/default/tree/collapse-all.gif',
             tooltip:'收缩全部',
             handler: function(){
            	 tree.collapseAll();
             }
         }] 
		});
		return me.menuTree;
	},
	//创建右侧内容面板	
	createContent:function(){
		var me = this;
		var container = Ext.create("Ext.container.Container",{
			id:"server_topo_container",
			region:"center",
			layout:'border',
			items:[me.createQueryField(), me.createChartsContent()]
		});
		return container;
	},
	//上半部分详细信息内容	
	createQueryField : function() {
		var me = this;
		//组件缓存detailField供生成实例时访问
    	me.detailField = Ext.create("Ext.form.Panel",{//FORM不用Store
    		id:"server_detailForm"
    		,region:'north'
    		,height:100
	    	,defaults: { 
				labelWidth:80
				,padding:'3 5'
				,columnWidth:0.40//以25%的宽度赋给每个组件
				,xtype:'textfield'
				,labelAlign:'right'
	        }
    		,layout: {type:'table',columns:2}
    		,items:[{fieldLabel:'名称',name:'name',minWidth:100,maxWidth:250,id:'realstatus_detailForm_name'}
    		       ,{fieldLabel: '状态',name:'status',minWidth:100,maxWidth:250,id:'realstatus_detailForm_status'} 
    		       ,{fieldLabel: '所在服务器',name:'area',minWidth:100,maxWidth:250,id:'realstatus_detailForm_area'}
    		       ,{fieldLabel: '虚拟机编号',name:'gmt_create',minWidth:100,maxWidth:250,id:'realstatus_detailForm_gmtCreate'}
    		       ,{fieldLabel:'备注信息',name:'desc',width:480,colspan:2,id:'realstatus_detailForm_desc'}
					
			]
    	});
    	return me.detailField;
	},
	//下半部分 图表显示
	createChartsContent : function() {
		var me = this;
		
		
		
		
		
		me.show = Ext.create("Ext.form.Panel", {
			id : "server_chartsContent",
			region : 'center',
			labelAlign : 'right',
			hidden:false,
			listeners : {
				afterrender : function(Panel, eOpts) {
//					createGraph();
					
				}
			},
			defaults : {
				labelWidth : 60,
				padding : '3 5',
				columnWidth : 0.5,
				xtype : 'textfield',
				labelAlign : 'right'
			},
			plain: true,
			layout: "anchor",
			html:'<div id="container"></div>'
		});
		return me.show;
	}
});