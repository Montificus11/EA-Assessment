import React from 'react';
import Programs from './Programs';
import Ethnicity from './Ethnicity';
import Income from './Income';

class School extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			items: [],
			isLoaded: false
		};
	}

	componentDidMount() {
		fetch(
			'https://api.data.gov/ed/collegescorecard/v1/schools/?school.operating=1&2015.academics.program_available.assoc_or_bachelors=true&2015.student.size__range=1..&school.degrees_awarded.predominant__range=1..3&school.degrees_awarded.highest__range=2..4&id=240444&api_key=BEI70IJXY5xi2kznCtC5aScZhlSQtT3qFS1ahNx2'
		)
			.then((res) => res.json())
			.then((json) => {
				this.setState({
					isLoaded: true,
					items: json
				});
			});
	}

	render() {
		const results = this.state.items.results;
		if (!this.state.isLoaded) {
			return <div> Loading... </div>;
		} else {
			console.log(results[0]);
			const students = results[0].latest.student.demographics.race_ethnicity;
			const programs = results[0].latest.academics.program_percentage;
			const income = results[0].latest.student;
			const enrollment = results[0].latest.student.enrollment;
			console.log(programs, 'here are the programs');
			return (
				<div>
					<div id="school-info">
						<div id="name">School: {results[0].school.name}</div>
						<div id="website">Website: {results[0].school.school_url}</div>
						<div id="location">
							City: {results[0].school.city}
							State: {results[0].school.state}
							Zip: {results[0].school.zip}
						</div>
						<div id="total-students">
							Total Number of Students: {enrollment.undergrad_12_month + enrollment.grad_12_month}
						</div>
						<div id="charts">
							<Programs programs={programs} />
							<Ethnicity students={students} />
							<Income income={income} />
						</div>
					</div>
				</div>
			);
		}
	}
}

export default School;
