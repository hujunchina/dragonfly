<template>
	<div>
		<el-input placeholder="请输入目前的项目id" v-model="projectModel" style="margin-bottom: 10px;">
			<el-button slot="append" icon="el-icon-search" @click="searchProjectMethod"></el-button>
		</el-input>
		<el-input
			v-model="projectIdNewModel"
			placeholder="请输入新的项目id"
			style="margin-bottom: 10px;"
		></el-input>
		<el-tag type="danger">非网关下的设备换绑</el-tag>
		<el-table
			ref="multipleTable"
			v-loading="loading"
			:data="deviceList"
			tooltip-effect="dark"
			style="width: 100%;"
			@selection-change="handleSelectionChange"
		>
			<el-table-column type="selection" width="55"></el-table-column>
			<el-table-column label="设备id" width="120">
				<template slot-scope="scope">
					{{ scope.row.deviceId }}
				</template>
			</el-table-column>
			<el-table-column prop="deviceName" label="设备名称" width="120"></el-table-column>
			<el-table-column prop="installLocation" label="地址" show-overflow-tooltip></el-table-column>
		</el-table>
		<div style="margin-top: 20px;">
			<el-button @click="toggleSelection()">取消选择</el-button>
			<el-button @click="changeProjectSelect()">换绑勾选的设备</el-button>
		</div>

		<el-divider></el-divider>
		<el-tag type="danger">网关下的设备，要换绑只能全部换绑</el-tag>
		<!-- <el-collapse accordion>

            <el-collapse-item title="反馈 Feedback">
                <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
                <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
            </el-collapse-item>
        </el-collapse> -->

		<el-table :data="gatewayDeviceList" style="width: 100%;">
			<el-table-column type="expand">
				<template slot-scope="props">
					<li v-for="device in props.row.deviceList" :key="device.deviceId">
						<div class="gatewayDeviceTag">
							<el-tag type="danger">设备id: {{ device.deviceId }}</el-tag>
							<el-tag type="danger">cid: {{ device.cid }}</el-tag>
							<el-tag type="danger">设备名称: {{ device.deviceName }}</el-tag>
							<el-tag type="danger">extendData: {{ device.extendData }}</el-tag>
						</div>
						<el-divider></el-divider>
					</li>
				</template>
			</el-table-column>
			<el-table-column label="网关 ID" prop="gatewayId"></el-table-column>
			<el-table-column label="type" prop="type"></el-table-column>
			<el-table-column label="操作">
				<template slot-scope="props">
					<el-popover placement="top" width="160" v-model="props.row.visible">
						<p>换绑操作会更换设备的项目id，请确认无误后再操作！</p>
						<div style="margin: 0; text-align: right;">
							<el-button size="mini" type="text" @click="props.row.visible = false">取消</el-button>
							<el-button type="danger" size="mini" @click="changeBindGatewayDevice(props.row)"
								>确定</el-button
							>
						</div>
						<el-button type="danger" size="mini" slot="reference">换绑</el-button>
					</el-popover>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
export default {
	name: 'saasDeviceProjectChange',
	data() {
		return {
			visible: false,
			loading: false,
			projectModel: '',
			projectIdNewModel: '',
			deviceList: [],
			gatewayDeviceList: [],
			multipleSelection: [],
		};
	},
	methods: {
		toggleSelection(rows) {
			if (rows) {
				rows.forEach((row) => {
					this.$refs.multipleTable.toggleRowSelection(row, true);
				});
			} else {
				this.$refs.multipleTable.clearSelection();
			}
		},
		handleSelectionChange(val) {
			this.multipleSelection = val;
		},
		changeProjectSelect() {
			// 无网关的设备换绑操作
			if (this.multipleSelection.length <= 0) {
				this.$message.error('需要勾选设备才可以换绑..');
				return;
			}

			if (this.projectModel.length <= 0) {
				this.$message.error('老的项目id不能为空...');
				return;
			}

			if (this.projectIdNewModel.length <= 0) {
				this.$message.error('新的项目id不能为空...');
				return;
			}
			const needChageDevice = [];
			this.multipleSelection.forEach((item) => {
				needChageDevice.push(item.deviceId);
			});

			const params = {
				deviceIdList: needChageDevice,
				projectId: this.projectModel,
				newProjectId: this.projectIdNewModel,
				operate: 2,
			};
			this.$http.post('/api/saas/devicemanage/project/bind/update', params).then(() => {
				this.$notify({
					title: '成功',
					message: '换绑成功',
					type: 'success',
				});
				this.searchProjectMethod();
			});
		},
		changeBindGatewayDevice(row) {
			// 有网关的设备换绑
			if (this.projectModel.length <= 0) {
				this.$message.error('老的项目id不能为空...');
				return;
			}
			if (this.projectIdNewModel.length <= 0) {
				this.$message.error('新的项目id不能为空...');
				return;
			}
			const params = {
				gatewayId: row.gatewayId,
				type: row.type,
				projectId: this.projectModel,
				newProjectId: this.projectIdNewModel,
				operate: 1,
			};
			row.visible = false;
			this.$http.post('/api/saas/devicemanage/project/bind/update', params).then(() => {
				this.$notify({
					title: '成功',
					message: '更新项目成功',
					type: 'success',
				});
				this.projectModel = this.projectIdNewModel;
				this.searchProjectMethod();
			});
		},
		searchProjectMethod() {
			if (this.projectModel.length == 0) {
				this.$message.error('请输入项目id...');
				return;
			}
			this.loading = true;
			this.$http
				.get('/api/saas/devicemanage/project/list', {
					params: {
						projectId: this.projectModel,
					},
				})
				.then((res) => {
					this.loading = false;
					if (res.data.result) {
						const data = res.data.result.data;
						this.deviceList = data.deviceList;
						this.gatewayDeviceList = data.gatewayDeviceVOList;
						this.$notify({
							title: '成功',
							message: '获取列表成功',
							type: 'success',
						});
					}
				});
		},
	},
};
</script>

<style lang="scss" scoped>
.deviceListStyle {
	ul {
		margin: 0 0 10px 0;
		background: #aedaff;
		li {
			margin: 0 4px 0 0;
			padding: 2px;
			color: #000;
			background: #fff;
			border-radius: 10px;
		}
	}
}
.gatewayDeviceTag {
	.el-tag {
		margin: 0 4px 4px 0;
	}
}
</style>
