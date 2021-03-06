import React from 'react';
import DonutChart from 'react-donut-chart';
import GetAppIcon from '@material-ui/icons/GetApp';
import { saveAs } from 'file-saver';
import Paper from '@material-ui/core/Paper';
import { Container } from '@material-ui/core';

export default class Income extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
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
          items: json,
        });
      });
  }

  render() {
    const results = this.state.items.results;
    if (!this.state.isLoaded) {
      return <div> Loading... </div>;
    } else {
      const income = results[0].latest.student;
      const blob = new Blob([JSON.stringify(income)], {
        type: 'application/json',
      });
      return (
        <div style={incomeStyle}>
          <Container component={Paper}>
            <div className="heading" style={headingStyle}>
              <h2>Student Family Income Breakdown</h2>
              <GetAppIcon
                cursor={'pointer'}
                onClick={() => saveAs(blob, 'IncomeData.csv')}
              />
              <p>Download to .csv</p>
            </div>
            <div className="chart" style={chartStyle}>
              <DonutChart
                height={750}
                width={750}
                legend={false}
                formatValues={(values, total) =>
                  `${((values / total) * 100).toFixed(2)}%`
                }
                data={[
                  {
                    label: '$0-$30,000',
                    value: income.share_lowincome['0_30000'] * 100,
                  },
                  {
                    label: '$30,001-$48,000',
                    value: income.share_middleincome['30001_48000'] * 100,
                  },
                  {
                    label: '$48,001-$75,000',
                    value: income.share_middleincome['48001_75000'] * 100,
                  },
                  {
                    label: '$75,001-$110,000',
                    value: income.share_highincome['75001_110000'] * 100,
                  },
                  {
                    label: '$110,001+',
                    value: income.share_highincome['110001plus'] * 100,
                  },
                ]}
              />
            </div>
          </Container>
        </div>
      );
    }
  }
}

const incomeStyle = {
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: 15,
};

const headingStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 15,
};

const chartStyle = {
  display: 'flex',
  justifyContent: 'center',
  padding: 25,
};
