export const layout1 = {
  // plot_bgcolor: "#F5F2F2",
  plot_bgcolor: "black",
  // paper_bgcolor: "#F5F2F2",
  paper_bgcolor: "black",
  autosize: false,
  margin: {
    l: 50,
    r: 50,
    b: 50,
    t: 50,
    pad: 10
  },
  hovermode: 'x',
  width: 800,
  height: 300,
  legend: {
    font: {
      color: 'white',
    },
  },
  xaxis: {
    color: 'white',
    automargin: false,
    range: [0, 40],
    title: {
      text: 'Дни',
      font: {
        family: 'sans-serif,Courier New, monospace',
        size: 16,
        // color: '#3B3636'
        color: 'white'
      }
    },
  },
  yaxis: {
    color: 'white',
    automargin: false,
    title: {
      text: 'Количество людей',
      font: {
        family: 'sans-serif,Courier New, monospace',
        size: 16,
        // color: '#3B3636'
        color: 'white'
      }
    }
  }
};

export const layout2 = {
  // plot_bgcolor: "#F5F2F2",
  plot_bgcolor: "black",
  // paper_bgcolor: "#F5F2F2",
  paper_bgcolor: "black",
  barmode: 'stack',
  bargroupgap: 1,
  autosize: false,
  hovermode: 'x',
  legend: {
    font: {
      color: 'white',
    },
  },
  margin: {
    l: 50,
    r: 50,
    b: 50,
    t: 50,
    pad: 10
  },
  width: 800,
  height: 300,
  xaxis: {
    color: 'white',
    automargin: false,
    range: [-1, 3],
    title: {
      text: 'Возраст',
      font: {
        family: 'sans-serif,Courier New, monospace',
        size: 16,
        // color: '#3B3636'
        color: 'white'
      }
    },
  },
  yaxis: {
    color: 'white',
    automargin: false,
    title: {
      text: 'Количество людей',
      font: {
        family: 'sans-serif,Courier New, monospace',
        size: 16,
        // color: '#3B3636'
        color: 'white',
      }
    }
  },
};
