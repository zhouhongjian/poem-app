import React from 'react';
import { SelectedFilters, ReactiveList } from '@appbaseio/reactivesearch';
import PropTypes from 'prop-types';

import Topic from './Topic';

const onResultStats = (results, time) => (
	<div className="flex justify-end">
		{results} results found in {time}ms
	</div>
);

const onData = (data, currentTopics, toggleTopic) => (
	<div className="result-item" key={data.title}>
		<div className="flex justify-center align-center result-card-header">
			<img className="avatar" src={'http://o6r75vmbt.bkt.clouddn.com/assets/img/album-frame-suse' + Math.ceil(Math.random() * 3) + '.png'} alt="User avatar" />
			<div className="link flex wrap">
				{data.title}
			</div>
		</div>
		<div className="author">{data.dynasty}/{data.author}</div>
		<div className="m10-0"><p>{data.paragraphs.map(v => <p key={v}>{v}</p>)}</p></div>
		<div className="flex wrap justify-center">
			{
				data.tags ?
					data.tags.slice(0, 7).map(item => (
						<Topic
							key={item}
							active={currentTopics.includes(item)}
							toggleTopic={toggleTopic}
						>
							{item}
						</Topic>
					)) : ''
			}
		</div>
		<div className="flex">
			<div><div className="btn card-btn"><i className="card-icon fas fa-star" />{data.stars}</div></div>
			<div><div className="btn card-btn"><i className="card-icon fas fa-code-branch" />{data.forks}</div></div>
			<div><div className="btn card-btn"><i className="card-icon fas fa-eye" />{data.watchers}</div></div>
		</div>
	</div>
);

const Results = ({ toggleTopic, currentTopics }) => (
	<div className="result-list">
		<SelectedFilters className="m1" />
		<ReactiveList
			componentId="results"
			dataField="name"
			onData={data => onData(data, currentTopics, toggleTopic)}
			// onResultStats={onResultStats}
			react={{
				and: ['title', 'inputAuthor', 'dynasty', 'poemContent', 'topics', 'strains'],
				// or: ['selectAuthor']   selectAuthor与inputAuthor查询条件重复，暂时不做查询，只用来展示统计数据
			}}
			pagination
			innerClass={{
				list: 'result-list-container',
				pagination: 'result-list-pagination',
				resultsInfo: 'result-list-info',
				poweredBy: 'powered-by',
			}}
			size={6}
			sortOptions={[
				{
					label: '相关度排序',
					dataField: '_score',
					sortBy: 'desc',
				},
				{
					label: '按标题升序',
					dataField: 'dynasty',
					sortBy: 'desc',
				},
			]}
		/>
	</div>
);

Results.propTypes = {
	toggleTopic: PropTypes.func,
	currentTopics: PropTypes.arrayOf(PropTypes.string),
};

export default Results;
