
var Food = 500;
var util = 1000;
var transport = 2000;
var entertainment = 500;
var misc = 1000;


new Chart(document.getElementById('pie-chart'), {
    type: 'pie',
    data: {
        labels: ["Food", "Utilities", "Transport", "Entertainment", "miscellaneous"],
        datasets: [{
            backgroundColor: ["#52D726", "#FFEC00",
                "#FF0000", "#007ED6", "#7CDDDD"
            ],
            data: [Food, util, transport, entertainment, misc]
        }]
    },
    options: {
        title: {
            display: true,
            text: 'Pie Chart for admin panel'
        },
        responsive: true
    }
});
