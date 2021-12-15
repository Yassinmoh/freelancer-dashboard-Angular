import { Options } from 'highcharts';

export const donutChartOptions: Options = {
  chart: {
    type: 'pie',
    plotShadow: false,
  },

  credits: {
    enabled: false,
  },
  plotOptions: {
    pie: {
      innerSize: '950%',
      borderWidth: 40,
      borderColor: '',
      slicedOffset: 20,
      dataLabels: {
        connectorWidth: 0,
      },
    },
  },
  title: {
    verticalAlign: 'middle',
    floating: true,
    text: `$ 600`,
  },
  legend: {
    enabled: false,
  },
  series: [
    {
      type: 'pie',
      data: [
        { name: 'Jan', y: 1, color: '#eeeeee' },
        { name: 'Feb', y: 2, color: '#393e46' },
        { name: 'Mar', y: 3, color: '#00adb5' },
        { name: 'Apr', y: 4, color: '#eeeeee' },
        { name: 'May', y: 5, color: '#506ef9' },
      ],
    },
  ],
};
