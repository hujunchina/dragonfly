<style scoped>
.search-container {
	margin-bottom: 15px;
}
</style>

<template>
	<div class="container" id="saasApp">
		<div class="search-container">
			<el-select v-model="industryTypeVal" class="select-industry" placeholder="请先选择业务">
				<!-- option 的表格值是 value 属性 -->
				<el-option disabled value="">请选择所属业务</el-option>
				<el-option
					v-for="item in industryTypeList"
					:label="item.desc"
					:value="item.industryType"
					:key="item.desc"
				>
					{{ item.desc }}
				</el-option>
			</el-select>
			<el-button
				class="searchButton"
				type="primary"
				icon="el-icon-search"
				style="margin-left: 15px;"
				@click="search()"
			>
				查询
			</el-button>
			<el-button style="margin-left: 15px;" type="primary" plain v-on:click="addRole()"
				>新增角色</el-button
			>
		</div>

		<div class="role-container">
			<el-dialog style="width: 600px;" title="添加新角色" :visible.sync="dialogNewRoleVisible">
				<el-form label-position="left" ref="addRoleForm" label-width="100px" :model="addRoleForm">
					<el-form-item label="父角色" v-if="false" prop="parentId">
						<el-input v-model="addRoleForm.parentId" maxlength="64" clearable></el-input>
					</el-form-item>
					<el-form-item
						label="角色Code"
						prop="roleCode"
						:rules="{ required: true, message: '角色Code不能为空', trigger: 'blur' }"
					>
						<el-input
							v-model="addRoleForm.roleCode"
							placeholder="house_admin"
							maxlength="30"
							clearable
						></el-input>
					</el-form-item>
					<el-form-item label="角色名称" prop="roleName">
						<el-input
							v-model="addRoleForm.roleName"
							placeholder="全屋管理员"
							maxlength="30"
							clearable
						></el-input>
					</el-form-item>
					<el-form-item label="角色描述" prop="remark">
						<el-input
							v-model="addRoleForm.remark"
							placeholder="拥有全屋SaaS所有管理权限"
							maxlength="127"
							clearable
						></el-input>
					</el-form-item>
					<el-form-item label="终止时间" rop="endTime">
						<el-date-picker
							type="datetime"
							placeholder="选择日期"
							v-model="addRoleForm.endTime"
							style="width: 100%;"
						></el-date-picker>
					</el-form-item>
					<el-form-item>
						<p>资源权限选择</p>
						<el-tree
							v-model="addRoleForm.roleResource"
							:data="resourceData"
							show-checkbox
							node-key="resourceId"
							ref="tree"
							default-expand-all
							:props="defaultProps"
						>
							<span class="custom-tree-node" slot-scope="{ node, data }">
								<span>{{ data.resourceName }}</span>
							</span>
						</el-tree>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button type="primary" v-on:click="addRoleFormConfirm()">确 定</el-button>
					<el-button @click="resetForm('addRoleForm')">取 消</el-button>
				</div>
			</el-dialog>
		</div>

		<div class="role-container">
			<el-dialog style="width: 600px;" title="修改角色" :visible.sync="dialogEditRoleVisible">
				<el-form label-position="left" ref="editRoleForm" label-width="100px" :model="editRoleForm">
					<el-form-item label="父角色" v-if="false" prop="parentId">
						<el-input v-model="editRoleForm.parentId" maxlength="64" clearable></el-input>
					</el-form-item>
					<el-form-item
						label="角色Code"
						prop="roleCode"
						:rules="{ required: true, message: '角色Code不能为空', trigger: 'blur' }"
					>
						<el-input
							v-model="editRoleForm.roleCode"
							placeholder="house_admin"
							maxlength="30"
							clearable
						></el-input>
					</el-form-item>
					<el-form-item label="角色名称" prop="roleName">
						<el-input
							v-model="editRoleForm.roleName"
							placeholder="全屋管理员"
							maxlength="30"
							clearable
						></el-input>
					</el-form-item>
					<el-form-item label="角色描述" prop="remark">
						<el-input
							v-model="editRoleForm.remark"
							placeholder="拥有全屋SaaS所有管理权限"
							maxlength="127"
							clearable
						></el-input>
					</el-form-item>
					<el-form-item label="终止时间" rop="endTime">
						<el-date-picker
							type="datetime"
							placeholder="选择日期"
							v-model="editRoleForm.endTime"
							style="width: 100%;"
						></el-date-picker>
					</el-form-item>
					<el-form-item>
						<p>资源权限选择</p>
						<el-tree
							v-model="editRoleForm.roleResource"
							:data="resourceData"
							show-checkbox
							node-key="resourceId"
							ref="tree"
							default-expand-all
							:props="defaultProps"
						>
							<span class="custom-tree-node" slot-scope="{ node, data }">
								<span>{{ data.resourceName }}</span>
							</span>
						</el-tree>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button type="primary" v-on:click="addRoleFormConfirm()">确 定</el-button>
					<el-button @click="resetForm('addRoleForm')">取 消</el-button>
				</div>
			</el-dialog>
		</div>

		<el-container>
			<el-main>
				<el-table border stripe :data="tableData">
					<el-table-column type="index" width="40"></el-table-column>
					<el-table-column prop="roleId" label="角色ID" width="180"></el-table-column>
					<el-table-column prop="roleCode" label="角色Code" width="120"></el-table-column>
					<el-table-column prop="roleName" label="角色名称" width="120"></el-table-column>
					<el-table-column prop="industryTypeName" label="业务类型" width="100"></el-table-column>
					<el-table-column prop="remark" label="备注" width="150"></el-table-column>
					<el-table-column prop="endTime" label="到期时间" width="150"></el-table-column>
					<el-table-column prop="roleResource" label="资源权限" width="250"></el-table-column>
					<el-table-column prop="gmtCreate" label="创建时间" width="150"></el-table-column>
					<el-table-column prop="operate" label="操作" width="200" fixed="right">
						<template slot-scope="scope">
							<el-button type="text" size="small" @click="edit()">修改</el-button>
							<el-button type="text" @click="open(tableData[scope.$index].roleId)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-main>
		</el-container>
	</div>
</template>

<script>
// 引入时间戳转换工具
import moment from 'moment';

export default {
	name: 'saasShieldRole',
	el: 'saasApp',
	data() {
		return {
			visible: false,
			industryTypeVal: '',
			tableData: [],
			roleTypeVal: '',
			resourceData: [],
			operateList: [],
			dialogNewRoleVisible: false,
			dialogEditRoleVisible: false,
			addRoleForm: {
				roleCode: '',
				roleName: '',
				industryType: this.industryTypeVal,
				endTime: '',
				roleResource: [],
				roleOperate: [],
			},
			editRoleForm: {
				roleCode: '',
				roleName: '',
				industryType: this.industryTypeVal,
				endTime: '',
				roleResource: [],
				roleOperate: [],
			},
			industryTypeList: [],
			roleList: [],
			roleItem: {},
			roleResourceList: [],
			defaultProps: {
				children: 'children',
				label: 'label',
			},
		};
	},
	methods: {
		edit() {
			this.dialogEditRoleVisible = true;
		},
		open(roleId) {
			this.$confirm('此操作将永久删除该权限' + roleId + ', 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
					this.$http
						.get('/api/saasShield/deleteRole', { params: { roleId: roleId } })
						.then((res) => {
							if (res.data.code == 100) {
								this.$message.success('删除角色成功');
							} else {
								this.$message.warning('删除失败，请重试');
							}
						});
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除',
					});
				});
		},
		// 加载页面后，立即获取业务类型
		getIndustryTypesList() {
			this.$http
				.get('/api/saasShield/industryType/list')
				.then((res) => {
					if (res.data.code == 100) {
						this.industryTypeList = res.data.result;
					} else {
						this.$message.error('业务数据获取失败');
					}
				})
				.catch(() => {
					this.$message.error('获取业务类型列表失败，请刷新重试');
				});
		},
		search: function () {
			if (!this.checkIndustryVal()) {
				return;
			}
			this.industryTypeVal;
			this.loadData();
		},
		// 表格显示数据
		loadData: function () {
			if (this.industryTypeVal == '') {
				this.$message.error('请先选择业务类型');
				return;
			}
			this.$http
				.get('/api/saasShield/getRoleList', { params: { industryType: this.industryTypeVal } })
				.then((res) => {
					if (res.data.code != 100) {
						this.$message.error('角色列表获取失败');
					}
					let tmpData = res.data.result;
					for (let item of tmpData) {
						this.roleResource = this.loadRoleResources(item.roleId);
						item.roleResource = this.roleResource;
						item.endTime = moment(item.endTime).format('YYYY-MM-DD HH:mm');
						item.gmtCreate = moment(item.gmtCreate).format('YYYY-MM-DD HH:mm');
						for (let industryTypeEnu of this.industryTypeList) {
							if (item.industryType == industryTypeEnu.industryType) {
								item.industryTypeName = industryTypeEnu.desc;
								break;
							}
						}
					}
					this.tableData = tmpData;
				});
		},
		changeUnix2Date: function (unixTime) {
			let date = new Date(unixTime);
			let Y = date.getFullYear() + '-';
			let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
			let D = date.getDate() + ' ';
			let h = date.getHours() + ':';
			let m = date.getMinutes();
			return Y + M + D + h + m;
		},
		loadRoleResources: function (roleId) {
			this.$http
				.get('/api/saasShield/getRoleResources', { params: { roleId: roleId } })
				.then((res) => {
					if (res.data.code == 100) {
						return res.data.result;
					}
				});
			return null;
		},
		roleTypeDetail: function (roleType) {
			this.roleTypeVal = roleType;
			item = this.item;
		},
		// 打开新增角色窗口
		addRole: function () {
			if (!this.checkIndustryVal()) {
				return;
			}
			this.dialogNewRoleVisible = true;
			// 查询业务下的权限
			this.loadResourceData();
		},
		// 新增角色 提交表单
		addRoleFormConfirm: function () {
			var resourcekey = this.$refs.tree.getCheckedKeys();
			var resourceHalf = this.$refs.tree.getHalfCheckedKeys();
			resourceHalf.forEach((item) => {
				resourcekey.push(item);
			});
			this.$http
				.post('/api/saasShield/addRole', {
					industryType: this.industryTypeVal,
					roleCode: this.addRoleForm.roleCode,
					roleName: this.addRoleForm.roleName,
					parentId: '',
					resourcesIds: resourcekey,
					endTime: moment(this.addRoleForm.endTime, 'YYYY-MM-DD HH:mm:ss').valueOf(),
					remark: this.addRoleForm.remark,
				})
				.then((res) => {
					if (res.data.code == 100) {
						this.$message.success('添加角色成功');
						this.roleItem = res.data.result;
					} else {
						this.$message.error('添加角色失败');
					}
				});
			this.dialogNewRoleVisible = false;
			this.$refs['addRoleForm'].resetFields();
		},
		resetForm: function (addRoleForm) {
			this.$refs[addRoleForm].resetFields();
			this.dialogNewRoleVisible = false;
		},
		// 加载资源树
		loadResourceData: function () {
			this.$http
				.get('/api/saasShield/industryResources/list', {
					params: { industryType: this.industryTypeVal },
				})
				.then((res) => {
					if (res.data.code != 100) {
						this.$message.error('资源权限加载失败');
						return;
					}
					var tempData = res.data.result;
					// 直接加入chilren中！！
					for (let item of tempData) {
						if (item.parentResourceId != '') {
							var pid = item.parentResourceId;
							for (let itemP of tempData) {
								if (itemP.resourceId == pid) {
									if (!itemP.children) {
										this.$set(itemP, 'children', []);
									}
									itemP.children.push(item);
								}
							}
						}
					}
					this.resourceData = [];
					for (var i = 0; i < tempData.length; i++) {
						if (tempData[i].parentResourceId == '') {
							this.resourceData.push(tempData[i]);
						}
					}
				});
		},
		checkIndustryVal: function () {
			if (this.industryTypeVal == '') {
				this.$message.warning('请选择一个业务类型');
				return false;
			} else {
				return true;
			}
		},
	},
	mounted() {
		this.getIndustryTypesList();
	},
};
</script>
