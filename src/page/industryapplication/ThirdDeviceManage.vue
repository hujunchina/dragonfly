<style lang="scss" scoped>
.inputText {
	width: 180px;
	margin-left: 20px;
}

.el-select {
	margin-bottom: 20px;
	margin-left: 20px;
}

.el-table .info-row {
	background: #c9e5f5;
}

#top {
	padding: 5px;
	overflow: hidden;
	background: #20a0ff;
}

.createTime {
	margin-bottom: 40px;
	margin-left: 20px;
}

.el-tag {
	margin-right: 20px;
	margin-left: 20px;
}

.mod-login-wrapper {
	margin-bottom: 20px;
}

.bottom-page {
	margin-top: 20px;
	margin-bottom: 20px;
}
</style>

<style scoped>
.app {
	position: relative;
	right: 50px;
	left: 50px;
	font-size: 25px;
}
</style>

<template>
	<div class="container">
		<div>
			<el-select v-model="bizState" clearable placeholder="请选择同步状态" style="width: 180px;">
				<el-option
					v-for="item in bizStates"
					:key="item.value"
					:label="item.label"
					:value="item.value"
				></el-option>
			</el-select>
			<el-select v-model="meterType" clearable placeholder="请选择设备类型" style="width: 180px;">
				<el-option
					v-for="item in meterTypes"
					:key="item.value"
					:label="item.label"
					:value="item.value"
				></el-option>
			</el-select>

			<el-input
				class="inputText"
				placeholder="请输入用户id(uid)"
				v-model="uid"
				style="width: 245px;"
				clearable
			></el-input>

			<el-button
				class="searchButton"
				type="primary"
				icon="el-icon-search"
				style="margin-left: 15px;"
				@click="search()"
			>
				搜索
			</el-button>
			<el-button style="margin-left: 15px;" type="primary" plain @click="uploadExcel(val)"
				>导入</el-button
			>
			<el-button style="margin-left: 15px;" type="primary" plain @click="deviceSynch(val)"
				>同步</el-button
			>
		</div>
		<div>
			<div>
				<el-table
					class="mod-login-wrapper"
					ref="tableData"
					:data="tableData"
					style="width: 100%;"
					@selection-change="handleSelectionChange"
					border
					show-overflow-tooltip
				>
					<el-table-column type="selection" width="55"></el-table-column>
					<el-table-column prop="id" width="79px" label="序号"></el-table-column>
					<el-table-column prop="relationId" label="ralation_id" width="189px"></el-table-column>
					<el-table-column prop="roomId" label="房间id"></el-table-column>
					<el-table-column prop="meterNo" label="表号"></el-table-column>
					<el-table-column
						prop="meterType"
						label="表类型"
						:formatter="formatMeter"
					></el-table-column>
					<el-table-column prop="clientId" label="第三方client_id"></el-table-column>
					<el-table-column prop="deviceId" label="设备id"></el-table-column>
					<el-table-column
						prop="bizState"
						label="业务状态"
						:formatter="formatBizstate"
					></el-table-column>

					<el-table-column fixed="right" prop="operate" label="操作">
						<!--                        <template slot-scope="scope" prop="bizState">-->
						<!--                            <el-button target="_blank" href="javaScript:;" @click="deleteDevice(scope.row)">删除</el-button>-->
						<!--                        </template>-->
						<template slot-scope="scope">
							<el-button
								type="primary"
								size="small"
								icon="el-icon-tickets"
								:disabled="scope.row.bizState == 1"
								@click="deleteDevice(scope.row)"
							>
								删除
							</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>

			<div class="bottom-page" align="center">
				<el-pagination
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page="currentPage"
					:page-sizes="[10, 20, 30, 40]"
					:page-size="pageSize"
					layout="total, sizes, prev, pager, next, jumper"
					:total="totalCount"
				></el-pagination>
			</div>
		</div>
		<el-dialog :title="createTitle" :visible.sync="showUpAndSynDialog" center>
			<el-form label-width="183px">
				<el-form-item label="上传文件">
					<el-upload
						class="upload-demo"
						action=""
						:before-remove="beforeRemove"
						:on-change="changeFile"
						:on-remove="handleRemove"
						:limit="1"
						:auto-upload="false"
					>
						<el-button type="primary">
							选择文件
							<i class="el-icon-upload"></i>
						</el-button>
						<a target="_blank" v-if="excelFile">{{ excelFile }}</a>
					</el-upload>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="importFile()" :loading="commitLoading"
						>开始导入文件</el-button
					>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
import XLSX from 'xlsx';
export default {
	data() {
		return {
			excelFile: '',
			file: '',
			fileList: [],
			excelArray: [],
			multipleSelection: [], //
			bizStates: [
				{
					value: true,
					label: '已同步',
				},
				{
					value: false,
					label: '未同步',
				},
			], // 前端页面自定义类型
			meterTypes: [
				{
					value: 4,
					label: '水表',
				},
				{
					value: 3,
					label: '电表',
				},
			],
			val: '',
			id: '',
			uid: '', // 用户id
			bizState: '', // 业务状态
			meterType: '', // 表类型
			tableData: [],
			toatalRecord: 0, // 总条数(接口参数)
			totalCount: 0, // 前端页面自定义参数
			pageSize: 20, // 默认每页条数
			pageNum: 1,
			highlightId: -1, // 默认高亮行数据id
			currentPage: 1, // 当前页码
			start: 1, // 查询的页码
			msg: '',
			showUpAndSynDialog: false, // 上传同步弹窗
			commitLoading: false, // 关闭弹窗
			updateTitle: '',
			createTitle: '',
			upAndSynchData: {}, // 弹窗对象
			clearFiles: '',
			rules: {
				paidProvider: [{ required: true, message: '请选择支付方式', trigger: 'change' }],
				paidType: [{ required: true, message: '请输入支付类型', trigger: 'change' }],
			},
		};
	},
	// 页面加载时直接返回所有的数据
	created() {
		this.loadData();
	},
	mounted() {
		this.loadData();
	},

	methods: {
		// 格式化中英文
		formatter(row) {
			return row.paidProviderDisplay;
		},

		// 点击行响应
		handleclick: function (row) {
			this.highlightId = row.id;
		},
		// 改变当前点击的行的class，高亮当前行
		tableRowClassName: function (row) {
			if (row.id == this.highlightId) {
				return 'info-row';
			}
		},
		// 单选框change事件
		handleSelectionChange(val) {
			this.multipleSelection = val;
		},
		changeFile(ele) {
			// 获取文件对象
			const file = ele.raw;
			const extension = file.name.split('.')[file.name.split('.').length - 1] === 'xlsx';
			if (!extension) {
				alert('上传模板不是 excel 格式!');
				// 关闭弹框
				this.showUpAndSynDialog = false;
			}
			const self = this;
			// 创建reader
			const reader = new FileReader();
			// 回调函数
			reader.onload = function (e) {
				const xlsdata = e.target.result;
				const wb = XLSX.read(xlsdata, {
					type: 'array',
				});
				// 转化为json
				const dataArr = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], {
					header: 1,
				});
				// 获取表头数据
				const firstRow = dataArr[0];
				for (let i = 1; i < dataArr.length; i++) {
					if (dataArr[i].length != 0) {
						const row = dataArr[i];
						const obj = {};
						for (let j = 0; j < row.length; j++) {
							// 循环每一行数据
							if (row[j] == '水表') {
								obj[firstRow[j]] = 3;
							} else if (row[j] == '电表') {
								obj[firstRow[j]] = 4;
							} else {
								obj[firstRow[j]] = row[j];
							}
						}
						self.excelArray.push(obj);
					}
				}
			};
			reader.readAsArrayBuffer(file);
		},

		handleRemove() {
			// 移除文件时清空数据
			this.excelArray = [];
		},

		beforeRemove(file) {
			return this.$confirm(`确定移除 ${file.name}？`);
		},

		// 每页显示数据量变更
		handleSizeChange: function (val) {
			this.pageSize = val;
			this.loadData();
		},
		// 页码变更
		handleCurrentChange: function (val) {
			this.currentPage = val;
			this.loadData();
		},
		// 表类型格式化
		formatMeter: function (row) {
			return row.meterType == '3' ? '水表' : row.meterType == '4' ? '电表' : '暂无';
		},
		// 同步状态格式化
		formatBizstate: function (row) {
			return row.bizState == '0' ? '未同步' : row.bizState == '1' ? '已同步' : '暂无';
		},
		// 未搜索时显示映射列表，使用默认搜索条件
		loadData: function () {
			this.$http
				.post('/api/industrymanage/thirdDeviceManage/getList', {
					bizState: this.bizState,
					meterType: this.meterType,
					uid: this.uid,
					pageNum: this.currentPage,
					pageSize: this.pageSize,
				})
				.then((res) => {
					// 回调函数
					if (res.data.code == 100) {
						this.tableData = res.data.result.data;
						for (let i = 0; i < this.tableData.length; i++) {
							// 排序依次显示
							this.tableData[i].id = this.pageSize * (this.currentPage - 1) + (i + 1);
						}
						this.totalCount = res.data.result.totalRecord;
					} else {
						this.$message.error('程序异常！' + res.data.msg);
					}
				});
		},
		// 搜索方法
		search: function () {
			this.currentPage = 1;
			this.loadData();
		},

		// 上传数据
		importFile: function () {
			// 判断文件数据
			const self = this;
			if (self.excelArray.length == 0) {
				alert('文件数据为空');
				return;
			}
			this.$http
				.post(
					'/api/industrymanage/thirdDeviceManage/import',
					{
						arr: JSON.stringify(self.excelArray),
					},
					{
						'Content-Type': 'application/json;',
					},
				)
				.then((res) => {
					// 回调函数
					if (res.data.code == 100) {
						this.$message({
							message: '导入成功',
							type: 'success',
						});
						// 清空搜索条件
						this.bizState = '';
						this.meterType = '';
						this.uid = '';
						this.loadData();
						// 清空文件对象
						this.excelArray = [];
						// 关闭弹窗
						this.showUpAndSynDialog = false;
					} else {
						this.$message.error('删除失败！' + res.data.msg);
					}
				});
		},
		// 打开上传和同步弹窗
		uploadExcel() {
			this.paidConfigForm = {};
			this.showUpAndSynDialog = true;
		},
		// 同步
		deviceSynch: function () {
			if (this.multipleSelection.length == 0) {
				// 请先选择再同步
				alert('请选择您要同步的数据');
				return;
			}
			// 判断同步状态或者设置同步按钮为不可用
			for (let i = 0; i < this.multipleSelection.length; i++) {
				if (this.multipleSelection[i].bizState == 1) {
					// 提交数据中包含已同步数据
					alert('选中数据中包含已同步数据');
					return;
				}
			}
			this.$http
				.post('/api/industrymanage/thirdDeviceManage/deviceSynch', {
					rawArr: JSON.stringify(this.multipleSelection),
				})
				.then((res) => {
					// 回调函数
					if (res.data.code == 100) {
						this.$message({
							message: '同步成功',
							type: 'success',
						});
						// 清空搜索条件
						this.bizState = '';
						this.meterType = '';
						this.uid = '';
						this.loadData();
						// 关闭弹窗
						this.showUpAndSynDialog = false;
					} else {
						this.$message.error('同步失败！' + res.data.msg);
					}
				});
		},
		// 设备删除
		deleteDevice: function (row) {
			this.$http
				.post('/api/industrymanage/thirdDeviceManage/removeDevice', {
					uid: row.uid,
					relationId: row.relationId,
					roomId: row.roomId,
					meterNo: row.meterNo,
					meterType: row.meterType,
					clientId: row.clientId,
					deviceId: row.deviceId,
					bizState: row.bizState,
				})
				.then((res) => {
					// 回调函数
					if (res.data.code == 100) {
						this.$message({
							message: '删除成功',
							type: 'success',
						});
						this.loadData();
					} else {
						this.$message.error(res.data.msg);
					}
				});
		},
	},
};
</script>
