//首页 index

Ext
		.define(
				'REALSTATUS.view.realstatusIndex',
				{
					extend : 'Ext.container.Container',
					alias : 'widget.realstatusindex',// 不能有大写
					layout : 'border',
					initComponent : function() {
						var me = this;
						me.items = [ me.createTree(), me.createContent() ];
						me.callParent();
					},
					// 创建左侧导航树
					createTree : function() {
						var me = this;
						me.menuTree = new Ext.tree.Panel(
								{
									width : 240,
									id : 'realstatus_menu',
									region : 'west',
									store : 'MenuStore4Tree',
									rootVisible : true,
									displayField : 'name',// 显示的名字变量
									margin : '0 2 0 0',
									useArrows : true,
									tbar : [
											{
												icon : webRoot
														+ 'frame/common/themes/images/default/tree/expand-all.gif',
												tooltip : '展开全部',
												handler : function() {
													tree.expandAll();
												}
											},
											'-',
											{
												icon : webRoot
														+ 'frame/common/themes/images/default/tree/collapse-all.gif',
												tooltip : '收缩全部',
												handler : function() {
													tree.collapseAll();
												}
											} ]
								});
						return me.menuTree;
					},
					// 创建右侧内容面板
					createContent : function() {
						var me = this;
						var container = Ext.create("Ext.container.Container", {
							id : "realstatus_content",
							region : "center",
							layout : 'border',
							items : [ me.createQueryField(),
									me.createChartsContent() ]
						});
						return container;
					},
					// 上半部分详细信息内容
					createQueryField : function() {
						var me = this;
						// 组件缓存detailField供生成实例时访问
						me.detailField = Ext.create("Ext.form.Panel", {
							id : "realstatus_detailForm",
							name : 'detailFieldForm',
							region : 'north',
							height : 100,
							defaults : {
								labelWidth : 80,
								padding : '3 5',
								columnWidth : 0.40// 以25%的宽度赋给每个组件
								,
								xtype : 'textfield',
								labelAlign : 'right'
							},
							layout : {
								type : 'table',
								columns : 2
							},
							items : [ {
								fieldLabel : '应用名称',
								name : 'name',
								minWidth : 100,
								maxWidth : 250,
								id : 'realstatus_detailForm_name'
							}, {
								fieldLabel : '状态',
								name : 'status',
								minWidth : 100,
								maxWidth : 250,
								id : 'realstatus_detailForm_status'
							}, {
								fieldLabel : '应用Code',
								name : 'area',
								minWidth : 100,
								maxWidth : 250,
								id : 'realstatus_detailForm_area'
							}, {
								fieldLabel : '虚拟机Code',
								name : 'gmt_create',
								minWidth : 100,
								maxWidth : 250,
								id : 'realstatus_detailForm_gmtCreate'
							}, {
								fieldLabel : '备注',
								name : 'desc',
								width : 480,
								colspan : 2,
								id : 'realstatus_detailForm_desc'
							}

							]
						});
						return me.detailField;
					},
					// 下半部分 图表显示
					createChartsContent : function() {
						var me = this;
						me.show = Ext.create("Ext.form.Panel", {
							id : "realstatus_chartsContent",
							name : 'realstatusChartsContent',
							region : 'center',
							labelAlign : 'right',
							hidden : true,
							defaults : {
								labelWidth : 60,
								padding : '3 5',
								columnWidth : 0.5,
								xtype : 'textfield',
								labelAlign : 'right'
							},
							plain : true,
							layout : "anchor",
							items : [ me.createLineChart_cpu(),
									me.createLineChart_mem(),
									me.createLineChart_net() ]
						});
						return me.show;
					},
					// 折线图
					createLineChart_cpu : function() {
						var me = this;
						me.LineChart = Ext.create('Ext.chart.Chart', {
							id : 'realstatus_chart_cpu',
							xtype : 'chart',
							anchor : '100%, 33%',
							style : 'margin:10px 0px 0px 30px;',
							// theme: 'Green',
							store : 'statusChartStore',
							axes : [ {
								type : 'Numeric',
								position : 'left',
								fields : [ 'responsetime' ],
								minimum : 0,
								maximum : 100
							}, {
								title : '应用响应时间',
								type : 'Category',
								position : 'bottom',
								fields : [ 'date' ]
							} ],
							series : [ {
								type : 'line',
								xField : 'date',
								yField : 'responsetime',
								title : [ '响应时间(s)' ],
								tips: {
									trackMouse: true,
									width: 100, 
									height: 18, 
									renderer: function(storeItem, item) {
										this.setTitle(storeItem.get('date') + ' ' + storeItem.get('responsetime') + '%' );  
									}
								} 
							} ],
							legend : {
								position : 'right'
							}
						});
						return me.LineChart;
					},
					createLineChart_mem : function() {
						var me = this;
						me.LineChart = Ext.create('Ext.chart.Chart', {
							id : 'realstatus_chart_mem',
							xtype : 'chart',
							anchor : '100%, 33%',
							style : 'margin:10px 0px 0px 30px;',
							// theme: 'Green',
							store : 'statusChartStore',
							axes : [ {
								type : 'Numeric',
								position : 'left',
								fields : [ 'memory' ],
								minimum : 0,
//								maximum : 100
							}, {
								title : '内存使用情况',
								type : 'Category',
								position : 'bottom',
								fields : [ 'date' ]
							} ],
							series : [ {
								type : 'line',
								xField : 'date',
								yField : 'memory',
								title : [ '已用内存(M)' ],
								tips: {
									trackMouse: true,
									width: 100, 
									height: 18, 
									renderer: function(storeItem, item) {
										this.setTitle(storeItem.get('date') + ' ' + storeItem.get('memory') + 'M' );  
									}
								} 
							} ],
							legend : {
								position : 'right'
							}
						});
						return me.LineChart;
					},
					createLineChart_net : function() {
						var me = this;
						me.LineChart = Ext.create('Ext.chart.Chart', {
							id : 'realstatus_chart_net',
							xtype : 'chart',
							anchor : '100%, 33%',
							style : 'margin:10px 0px 0px 30px;',
							// theme: 'Green',
							store : 'statusChartStore',
							axes : [ {
								type : 'Numeric',
								position : 'left',
								fields : [ 'concurrent' ],
								minimum : 0
							}, {
								title : '并发情况',
								type : 'Category',
								position : 'bottom',
								fields : [ 'date' ]
							} ],
							series : [ 
							{
								type : 'line',
								xField : 'date',
								yField :  'concurrent',
								title : [ '并发数' ],
								tips: {
									trackMouse: true,
									width: 100, 
									height: 18, 
									renderer: function(storeItem, item) {
										this.setTitle(storeItem.get('date') + ' ' + storeItem.get('concurrent') );  
									}
								}
							}],
							legend : {
								position : 'right'
							}
						});
						return me.LineChart;
					}
				});