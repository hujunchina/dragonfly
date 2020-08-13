<template>
	<div>
		<el-input :value="selected" :name="name" style="display: none;" />
		<el-select
			filterable
			remote
			:placeholder="placeholder"
			v-model="selected"
			:clearable="clearabled"
			:readonly="readonly"
			:disabled="disabled"
			:remote-method="query"
			:loading="loading"
			@change="onChange"
		>
			<el-option
				v-for="item in options"
				:key="item.key"
				:label="item.nick + '(' + item.username + ')'"
				:value="item.nick"
			></el-option>
		</el-select>
	</div>
</template>

<script>
export default {
	components: {},

	data() {
		return {
			options: [],
			loading: false,
			selected: null,
		};
	},
	props: {
		value: {
			default: null,
			type: Number | String,
		},
		name: {
			type: String,
		},
		role: {
			default: 'user',
			type: String,
		},
		readonly: {
			type: Boolean,
		},
		disabled: {
			type: Boolean,
		},
		clearabled: {
			default: true,
			type: Boolean,
		},
		placeholder: {
			default: '请输入名字',
			type: String,
		},
	},
	created() {
		const value = this.$props.value;
		this.applyValue(value);
	},
	watch: {
		value(val) {
			this.applyValue(val);
		},
	},
	methods: {
		onChange(value) {
			this.$emit('change', value);
		},
		applyValue(val) {
			if (val) {
				this.options = [];
				this.selected = val;
				this.onChange(this.selected);
			} else {
				this.selected = null;
				this.onChange(this.selected);
			}
		},
		query(name) {
			if (name !== '') {
				this.loading = true;
				this.$http
					.get('/api/user/name/' + name)
					.then((response) => {
						this.options = response.data.result;
					})
					.catch(() => {
						this.options = [];
					});
				this.loading = false;
			} else {
				this.options = [];
			}
		},
	},
};
</script>
