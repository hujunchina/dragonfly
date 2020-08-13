<template>
	<div class="container">
		<el-select
			style="margin-right: 1%; margin-bottom: 20px;"
			v-model="sqlSelect"
			placeholder="数据库"
		>
			<el-option
				v-for="item in sqlList"
				:key="item.value"
				:label="item.label"
				:value="item.value"
			></el-option>
		</el-select>

		<!-- 下拉选择数据库 -->
		<channel-system-cache-config v-if="sqlSelect == 1" />
		<out-trans-code v-if="sqlSelect == 2" />
		<out-trans-config v-if="sqlSelect == 3" />
		<communication v-if="sqlSelect == 4" />
		<communication-limiter v-if="sqlSelect == 5" />
		<communication-map v-if="sqlSelect == 6" />
		<AssembleTemplate v-if="sqlSelect == 7" />
		<ParserTemplate v-if="sqlSelect == 8" />
		<TransactionType v-if="sqlSelect == 9" />
		<TransTypeChannelMap v-if="sqlSelect == 10" />
	</div>
</template>
<script>
import ChannelSystemCacheConfig from './config/ChannelSystemCacheConfig';
import OutTransCode from './config/OutTransCode';
import OutTransConfig from './config/OutTransConfig';
import Communication from './config/Communication';
import CommunicationLimiter from './config/CommunicationLimiter';
import CommunicationMap from './config/CommunicationMap';
import AssembleTemplate from './config/AssembleTemplate';
import ParserTemplate from './config/ParserTemplate';
import TransactionType from './config/TransactionType';
import TransTypeChannelMap from './config/TransTypeChannelMap';

export default {
	components: {
		ChannelSystemCacheConfig,
		OutTransCode,
		OutTransConfig,
		Communication,
		CommunicationLimiter,
		CommunicationMap,
		AssembleTemplate,
		ParserTemplate,
		TransactionType,
		TransTypeChannelMap,
	},
	data() {
		return {
			sqlList: [
				{
					label: 'ChannelSystemCacheConfig',
					value: '1',
				},
				{
					label: 'OutTransCode',
					value: '2',
				},
				{
					label: 'OutTransConfig',
					value: '3',
				},
				{
					label: 'Communication',
					value: '4',
				},
				{
					label: 'CommunicationLimiter',
					value: '5',
				},
				{
					label: 'CommunicationMap',
					value: '6',
				},
				{
					label: 'AssembleTemplate',
					value: '7',
				},
				{
					label: 'ParserTemplate',
					value: '8',
				},
				{
					label: 'TransactionType',
					value: '9',
				},
				{
					label: 'TransTypeChannelMap',
					value: '10',
				},
			],
			sqlSelect: '',
		};
	},
	methods: {
		tabClick(tab) {
			this.ariesSelect = tab.index.toString();
		},
	},
};
</script>
