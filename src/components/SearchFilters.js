import React from 'react';
import PropTypes from 'prop-types';
import {
	TextField,
	SingleDropdownList,
	MultiDropdownList,
	TagCloud,
} from '@appbaseio/reactivesearch';

const SearchFilters = ({ currentTopics, setTopics, visible }) => (
	<div className={`flex column filters-container ${!visible ? 'hidden' : ''}`}>
		<div className="child m10">
			<TextField
				componentId="title"
				dataField="title.keyword"
				placeholder="输入诗名"
				title="诗名"
				filterLabel="诗名"
			/>
		</div>

		<div className="child m10">
			<TextField
				componentId="inputAuthor"
				dataField="author"
				placeholder="输入作者"
				title="作者"
				filterLabel="作者"
			/>
		</div>
		<div className="child m10">
			<SingleDropdownList
				componentId="dynasty"
				dataField="dynasty"
				placeholder="选择朝代"
				title="朝代"
				filterLabel="朝代"
			/>
		</div>


		<div className="child m10">
			<MultiDropdownList
				componentId="topics"
				dataField="tags"
				placeholder="选择话题"
				title="话题"
				filterLabel="话题"
				size={1000}
				queryFormat="and"
				defaultSelected={currentTopics}
				onValueChange={setTopics}
			/>
		</div>
		<div className="child m10">
			<MultiDropdownList
				componentId="strains"
				dataField="strains"
				placeholder="选择平仄声调"
				title="诗句平仄"
				filterLabel="诗句平仄"
				size={1000}
				queryFormat="and"
			/>
		</div>

		<div className="child m10">
			<TagCloud
				componentId="selectAuthor"
				dataField="author"
				title="统计：作诗最多的诗人TOP10"
				size={10}
				showCount={true}
				sortBy="count"
				queryFormat="and"
			/>
		</div>

	</div>
);

SearchFilters.propTypes = {
	currentTopics: PropTypes.arrayOf(PropTypes.string),
	setTopics: PropTypes.func,
	visible: PropTypes.bool,
};

export default SearchFilters;
