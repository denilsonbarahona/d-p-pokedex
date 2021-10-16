

var ctx = document.getElementById('stats').getContext('2d');

export default function createChart(LABELS, DATA){
 
    return new Chart(ctx, {
        type: 'radar',
        data: {
            labels: LABELS,
            datasets:[{
                label:"",
                data: DATA,
                borderColor:"#fff",
                backgroundColor: "#f2f2f2" 
            }]
        }, 
        options:{
            maintainAspectRatio: false,
            plugins:{
                title:{
                    display: false,
                },
                legend: {
                    display: false 
                }
            },
            scales:{
                r:{
                    grid: {
                        color:"white",
                    },
                    pointLabels: {
                        color:"white",
                    },
                    angleLines: {
                        color:"white",
                    }
                }
            }
        },
    });
}