Miso.helper = function(args) {

	var ds = new Miso.Dataset({
		url: args.path,
		delimiter: ","
	});

	ds.fetch({

		csv_data: [],

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

			csv_data = highcharts_series_object;
		}
	});


	return {

		getData: function() {
			return csv_data;
		}

	}

};
