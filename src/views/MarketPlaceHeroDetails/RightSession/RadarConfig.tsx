
export const RadarOptions = {
  scales: {
    r: {
      angleLines: {
        display: true,
        color: "rgba(255, 255, 255, .3)",
        lineWidth: 3,
        borderDash: [30,10]
      },
      suggestedMin: 10,
      suggestedMax: 100,
      ticks: {
        min: 0,
        max: 100,
        stepSize: 10,
        showLabelBackdrop: false,
        backdropColor: "rgba(203, 197, 11, 1)",
        lineWidth: 3,
        display: false
      },
      pointLabels: {
        font: {
          size: 25,
        },
        color:"#fff"
      },
    grid: {
      lineWidth: 3,
      circular: true,
      color: "#373D4E"
    }
    }
  },
};