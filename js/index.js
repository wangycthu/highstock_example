// button onclick

function search() {
    // get text from the input box, you should pass this to your api call for data
    query = $("#query").val();
    if (query == "")
        query = "8";

    // this is a mock of your API call, you should change this to your own api call
    mydata = fakedata(query);
    console.log(mydata);

    // now update table with data
    tbody = $("#tabledata > tbody");
    tbody.empty();
    var idx = 0;
    var tr;
    for (element in mydata["table"]) {
        value = addCommas(mydata["table"][element].toFixed(2));
        if (idx % 4 == 0) {
            tr = $('<tr>');
            tr.append('<td class="left-divisor"><strong>' + element + '</strong></td>');
            tr.append('<td class="right-divisor">' + value + '</td>');
        } else if (idx % 4 == 3) {
            tr.append('<td><strong>' + element + '</strong></td>');
            tr.append('<td class="right-divisor">' + value + '</td>');
            tbody.append(tr);
        } else {
            tr.append('<td><strong>' + element + '</strong></td>');
            tr.append('<td class="right-divisor">' + value + '</td>');
        }
        idx++;
    };
    tbody.append(tr);
    $("#table-wrapper").show();
    // then update the chart with data

    $('#high-chart').highcharts('StockChart', {
        chart: {
            zoomType: 'xy'
        },

        title: {
            text: 'Netting Chart'
        },
        subtitle: {
            text: 'This is a subtitle'
        },

        rangeSelector: {
            selected: 1
        },

        yAxis: [{ // Primary yAxis
            labels: {
                format: '{value}%',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            title: {
                text: 'Unit one',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            opposite: false
        }, { // Secondary yAxis
            labels: {
                format: '{value} m',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            title: {
                text: 'Unit two',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            }

        }],
        plotOptions: {
            spline: {
                pointStart: Date.UTC(2015, 6, 23, 0, 0, 0),
                pointInterval: 864000000 // ten days
            },
            column: {
                pointStart: Date.UTC(2015, 6, 23, 0, 0, 0),
                pointInterval: 864000000, // ten days
            }
        },
        series: [{ // double stack
                name: 'Unit one',
                data: mydata["unit1"],
                type: 'spline',
                tooltip: {
                    valueDecimals: 2,
                    valueSuffix: '%'
                }
            }, {
                name: 'Unit two',
                data: mydata["unit2_1"],
                yAxis: 1,
                type: 'column',
                color: 'orange',
                tooltip: {
                    valueDecimals: 2,
                    valueSuffix: ' m'
                }
            }, {
                name: 'Unit two',
                data: mydata["unit2_2"],
                yAxis: 1,
                type: 'column',
                color: 'green',
                tooltip: {
                    valueDecimals: 2,
                    valueSuffix: ' m'
                }
            }
        ]
    });
}


function addCommas(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}


function makestring(len) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < len; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}


function fakedata(query) {
    var num = parseInt(query);
    var res = {
        "table": {},
        "unit1": [],
        "unit2_1": [],
        "unit2_2": []
    };
    for (var i = 0; i < num; i++) {
        attName = makestring(Math.floor((Math.random() * 5) + 1));
        res["table"][attName] = Math.random() * 1000000;
    }
    // fake highstock data
    for (var i = 0; i < num * 10; i++) {
        // fake unit1 values
        res["unit1"].push(Math.random() * 50);
        // fake unit2 values
        res["unit2_1"].push(Math.random() * 400);
        // fake unit2 values
        res["unit2_2"].push(Math.random() * 400);
    }
    return res;
}


// this function is executed when document is ready, only for a quick view
$(function() {
    $("#table-wrapper").hide();
    search();
});
