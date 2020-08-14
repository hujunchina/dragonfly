<template>
	<div class="drawContainer">
		<div class="tips">
			<el-tag type="warning">
				也可以通过url的方式生成，在本页面的url中加上?params=yourcode
				注意代码片段需要压缩为一行去掉空格换行，可用bejson压缩功能得到压缩后的代码段
			</el-tag>
		</div>
		<div>
			<el-button type="button" @click="dialogFormVisible = true">输入代码段</el-button>
			<el-tooltip
				class="item"
				effect="dark"
				content="只需要更改name字段，node为原有节点名称"
				placement="top"
			>
				<el-button type="button" @click="nodeVisible = true">节点中文配置</el-button>
			</el-tooltip>

			<!-- <el-button type="button" @click="initG6">生成</el-button> -->
		</div>

		<div id="mountNode" />

		<el-dialog title="流程代码段" :visible.sync="dialogFormVisible">
			<el-input
				type="textarea"
				:autosize="{ minRows: 10, maxRows: 20 }"
				placeholder="请输入内容"
				v-model="sourceCode"
			></el-input>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="initdata">确 定</el-button>
			</div>
		</el-dialog>

		<el-dialog title="节点信息配置" :visible.sync="nodeVisible">
			节点信息配置：
			<v-jsoneditor
				v-model="nodeConfig"
				:options="options"
				:plus="false"
				height="300px"
				@error="onError"
			></v-jsoneditor>
			<div slot="footer" class="dialog-footer">
				<el-button @click="nodeVisible = false">取 消</el-button>
				<el-button type="primary" @click="dealNodeConfig">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import G6 from '@antv/g6';
import dagre from 'dagre';
import Vue from 'vue';
import JsonViewer from 'vue-json-viewer';
import VJsoneditor from 'v-jsoneditor';
Vue.use(VJsoneditor);
Vue.use(JsonViewer);
export default {
	data() {
		return {
			chartSettings: {},
			data: {
				nodes: [],
				edges: [],
			},
			options: {
				mode: 'code',
				search: true,
			},
			sourceCode: '',
			withExternal: 'withExternal',
			withChoice: 'withChoice',
			dialogFormVisible: false,
			nodeConfig: [],
			nodeVisible: false,
			graph: null,
		};
	},
	created() {
		const params = this.$route.query.params;
		if (params !== null && params !== undefined && params !== '') {
			this.sourceCode = params;
			this.initFromUrl();
		}
	},
	methods: {
		async initFromUrl() {
			await this.sleepFunc(1000);
			this.initdata();
			this.dealNodeConfig();
			this.initG6();
			return;
		},
		sleepFunc(ms) {
			return new Promise((resolve) => setTimeout(resolve, ms));
		},
		dealNodeConfig() {
			const nodeConfigMap = new Map();
			for (const configVal of this.nodeConfig) {
				nodeConfigMap.set(configVal.node, configVal);
			}
			this.data.nodes.forEach((item) => {
				if (nodeConfigMap.has(item.id) && nodeConfigMap.get(item.id).name.length > 0) {
					item.id = nodeConfigMap.get(item.id).name;
				}
			});

			for (const edgeVal of this.data.edges) {
				if (
					nodeConfigMap.has(edgeVal.source) &&
					nodeConfigMap.get(edgeVal.source).name.length > 0
				) {
					edgeVal.source = nodeConfigMap.get(edgeVal.source).name;
				}
				if (
					nodeConfigMap.has(edgeVal.target) &&
					nodeConfigMap.get(edgeVal.target).name.length > 0
				) {
					edgeVal.target = nodeConfigMap.get(edgeVal.target).name;
				}
			}

			const arr = [];
			// 重新处理nodeConfig, 将id设置为name
			this.nodeConfig.forEach((item, index) => {
				if (item.name !== null && item.name !== undefined && item.name !== '') {
					item.node = item.name;
				}
				arr[index] = item;
			});

			this.nodeConfig = [];
			this.nodeConfig = arr;
			this.nodeVisible = false;

			this.initG6();
		},
		onError() {},
		initG6() {
			if (this.graph !== null) {
				this.graph.destroy();
			}
			const g = new dagre.graphlib.Graph();
			g.setDefaultEdgeLabel(() => {
				return {};
			});
			g.setGraph({
				rankdir: 'TB',
			});
			this.data.nodes.forEach((node) => {
				node.label = node.id;
				if (node.type == 'diamond') {
					g.setNode(node.id, {
						width: 150,
						height: 50,
						type: 'diamond',
					});
				} else {
					g.setNode(node.id, {
						width: 400,
						height: 50,
					});
				}
			});
			this.data.edges.forEach((edge) => {
				g.setEdge(edge.source, edge.target);
			});
			dagre.layout(g);
			let coord = void 0;
			try {
				const _this = this;
				g.nodes().forEach((node, i) => {
					coord = g.node(node);
					_this.data.nodes[i].x = coord.x;
					_this.data.nodes[i].y = coord.y;
				});
				g.edges().forEach((edge, i) => {
					coord = g.edge(edge);
					_this.data.edges[i].startPoint = coord.points[0];
					_this.data.edges[i].endPoint = coord.points[coord.points.length - 1];
					_this.data.edges[i].controlPoints = coord.points.slice(1, coord.points.length - 1);
				});
			} catch (e) {}
			G6.registerNode(
				'operation',
				{
					drawShape: function drawShape(cfg, group) {
						if (cfg.type !== null && cfg.type == 'diamond') {
							// 如果 cfg 中定义了 style 需要同这里的属性进行融合
							const shape = group.addShape('path', {
								attrs: {
									path: this.getPath(cfg), // 根据配置获取路径
									// stroke: cfg.color, // 颜色应用到边上，如果应用到填充，则使用 fill: cfg.color
									fill: '#bae637',
									stroke: '#eaff8f',
									lineWidth: 5,
								},
							});
							if (cfg.label) {
								// 如果有文本
								// 如果需要复杂的文本配置项，可以通过 labeCfg 传入
								// const style = (cfg.labelCfg && cfg.labelCfg.style) || {};
								// style.text = cfg.label;
								group.addShape('text', {
									// attrs: style
									attrs: {
										x: 0, // 居中
										y: 0,
										textAlign: 'center',
										textBaseline: 'middle',
										text: cfg.label,
										fill: '#000',
									},
								});
							}
							return shape;
						}
						const rect = group.addShape('rect', {
							attrs: {
								x: -75,
								y: -25,
								width: 150,
								height: 50,
								radius: 10,
								stroke: '#92949F',
								fill: '#fff',
								fillOpacity: 0.45,
								lineWidth: 2,
							},
						});
						return rect;
					},
				},
				'single-shape',
			);

			this.graph = new G6.Graph({
				container: 'mountNode',
				width: window.innerWidth,
				height: window.innerHeight,
				pixelRatio: 2,
				modes: {
					default: ['drag-canvas', 'zoom-canvas'],
				},
				defaultNode: {
					shape: 'operation',
					labelCfg: {
						style: {
							fill: '#000',
							fontSize: 14,
							fontWeight: 'bold',
						},
					},
				},
				defaultEdge: {
					// shape: 'polyline'
					shape: 'polyline',
					style: {
						stroke: '#ddd',
						lineWidth: 3,
						endArrow: true,
					},
					labelCfg: {
						style: {
							textAlign: 'center',
							textBaseline: 'middle',
							fontSize: 14,
							stroke: '#000',
						},
					},
				},
				edgeStyle: {
					default: {
						endArrow: true,
						lineWidth: 3,
						stroke: '#000',
					},
				},
			});
			const graph = this.graph;
			graph.data(this.data);
			graph.render();
			graph.fitView();
		},
		initdata() {
			// type: 1 开始
			// type: 2 流程
			// type: 3 判断
			// {
			//     now: "",
			//     childFirst: "",
			//     childLast: "",
			//     type: 1
			// }
			this.data.nodes = [];
			this.data.edges = [];
			this.dialogFormVisible = false;
			let str = this.sourceCode;
			str = str.replace(/\s*/g, '');
			str = str.replace(/[\r\n]/g, '');
			const arr = str.split(';');
			const result = [];
			let i = 0;
			for (const val of arr) {
				if (val.length > 0) {
					const process = {};
					if (val.indexOf('withExternal') != -1) {
						const sourceRegex = /\.source\(.*?\.(.*?)\)/g;
						const targetRegex = /\.target\(.*?\.(.*?)\)/g;
						const source = sourceRegex.exec(val);
						const target = targetRegex.exec(val);
						process.now = source[1];
						process.childFirst = target[1];
						process.type = 2;
					} else if (val.indexOf('withChoice') != -1) {
						const firstRegex = /\.first\(.*?\.(.*?),/g;
						const lastRegex = /\.last\(.*?\.(.*?)\)/g;
						const sourceRegex2 = /\.source\(.*?\.(.*?)\)/g;
						const source2 = sourceRegex2.exec(val);
						process.now = source2[1];
						const childFirst = firstRegex.exec(val);
						const lastFirst = lastRegex.exec(val);
						process.childFirst = childFirst[1];
						process.childLast = lastFirst[1];
						process.type = 3;
					}
					result[i] = process;
					i++;
				}
			}
			const map = new Map();
			// {
			//     now: "",
			//     childFirst: "",
			//     childLast: "",
			//     type: 1
			// }
			let resultIndex = 0;
			for (const val of result) {
				if (val.now !== null && val.now !== undefined) {
					if (val.type == 3) {
						map.set(val.now, 'diamond');
					} else if (
						map.get(val.now) == '' ||
						map.get(val.now) == undefined ||
						map.get(val.now) == null
					) {
						map.set(val.now, '');
					}
				}
				if (val.childFirst !== null && val.childFirst !== undefined) {
					map.set(val.childFirst, '');
				}
				if (val.childLast !== null && val.childLast !== undefined) {
					map.set(val.childLast, '');
				}
				// 处理edges
				if (val.type == 2) {
					this.data.edges[resultIndex] = {
						source: val.now,
						target: val.childFirst,
					};
				} else if (val.type == 3) {
					this.data.edges[resultIndex] = {
						source: val.now,
						target: val.childFirst,
						label: 'Y',
					};
					resultIndex++;
					this.data.edges[resultIndex] = {
						source: val.now,
						target: val.childLast,
						label: 'N',
					};
				}
				resultIndex++;
			}
			let tempIndex = 0;
			for (const [key, value] of map.entries()) {
				const params = {};
				params.id = key;
				if (value !== '') {
					params.shape = value;
				}
				this.data.nodes[tempIndex] = params;
				tempIndex++;
			}

			const nodes = this.data.nodes;
			let nodeIndex = 0;
			for (const val of nodes) {
				const id = val.id;
				this.nodeConfig[nodeIndex] = {
					node: id,
					name: '',
				};
				nodeIndex++;
			}
			this.dealNodeConfig();
			this.initG6();
		},
		// 返回菱形的路径
		getPath(cfg) {
			const size = cfg.size || [400, 100]; // 如果没有 size 时的默认大小
			const width = size[0];
			const height = size[1];
			//  / 1 \
			// 4     2
			//  \ 3 /
			const path = [
				['M', 0, 0 - height / 2], // 上部顶点
				['L', width / 2, 0], // 右侧顶点
				['L', 0, height / 2], // 下部顶点
				['L', -width / 2, 0], // 左侧顶点
				['Z'], // 封闭
			];
			return path;
		},
	},
};
</script>

<style lang="scss" scoped>
.drawContainer {
	.tips {
		margin-bottom: 10px;
	}
}
</style>
