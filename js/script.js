window.onload = function() {
			chart.loadData();

			var d = [
			{
				name: "United States",
				data: [53.6, 17.6, 27.9, 32.7, 43.1, 35.7, 31.6, 71.8, 65.2, 66.4, 30.5],
				pointPlacement: 'off'
			}, {
				name: "Ukraine",
				data: [42.8, 32.3, 42.3, 19.9, 22.3, 39.4, 45.1, 59.0, 75.5, 85.8, 13.0],
				pointPlacement: 'off'
			}];

			chart.drawChart(d);

		};

		var chart = {

			master_data: [],

			loadData: function() {
				var ds = new Miso.Dataset({
					url: "data/data.csv",
					delimiter: ","
				});
				ds.fetch({
					success: function() {
						var columns = this._columns;
						var highcharts_series_object = [];
						var number_of_columns = columns.length;
						var number_of_rows = columns[0].data.length;
						for (var i = 0; i < number_of_rows; i++) {
							var country_name = [];
							var category_data_points = [];
							for (var j = 1; j < number_of_columns; j++) {
								var d = columns[j].data[i]
								if (typeof d === "number") {
									category_data_points.push(d);
								} else {
									country_name = d;
								}
							}
							highcharts_series_object.push({
								type: "area",
								name: country_name,
								data: category_data_points
							});
						}
						chart.master_data = highcharts_series_object;
					}
				});
			},

			submitList: function() {

				var first_selection = $("#list1 option:selected").text();
				var second_selection = $("#list2 option:selected").text();

				if (first_selection === "--" || second_selection === "--") {
					alert("Please select two countries from the lists");
				} else {

					var args = [];
					for (var i = 0; i < chart.master_data.length; i++) {
						var country = chart.master_data[i].name;
						if ( country == first_selection || country == second_selection ) {
							args.push(chart.master_data[i]);
						}
					}

					chart.drawChart(args);

				}
			},

			drawChart: function(data) {
				console.log(data);
                Highcharts.setOptions({
                    colors: ['#007172', '#421679'],
                    fontSize: '20px'
                });
                
				$("#radar-container").highcharts({
				    chart: {
				        style: {
                            fontFamily: '"Source Sans Pro", Ariel',
                            fontSize: '16px'
                        },
                        polar: true,
				        type: 'area'
				    },
				    title: {
				        text: '',
				    },
				    xAxis: {
				        categories: ['Independence', 'Self-Expression', 'Obedience', 'Unselfishness', 'Religious Faith', 'Determination, Perseverance', 'Thrift', 'Tolerance', 'Responsibility', 'Hard Work', 'Imagination'],
                        labels: {
                            style: {
                                fontSize: '13px',
                                fontFamily: '"Source Sans Pro", sans serif'
                            },
                        },
				        tickmarkPlacement: 'on',
				        lineWidth: 0
				    },
				    yAxis: {
				        gridLineInterpolation: 'polygon',
				        lineWidth: 2,
                        padding: 10,
				        min: 0
				    },
				    tooltip: {
				        shared: true,
                        style: {
                            fontSize: '14px'
                        },
                        pointFormat: '<b>{series.name}: </b>{point.y}%<br>'
				    },
				    legend: {
                        style: {
                            fontSize: '20px'
                        },
				        align: 'top',
				        verticalAlign: 'top',
				        layout: 'vertical'
				    },
				    credits: {
                        position: {
                            align: 'right'
                        },
                        style: {
                            fontSize: '14px'
                        },
				        text: '<strong>Data:</strong> World Values Survey',
                        href: 'http://www.worldvaluessurvey.org/wvs.jsp'
				    },

				    series: data
				});

			}

		}
