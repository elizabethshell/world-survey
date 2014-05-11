Miso.helper = function() {

	return {

		init: function() {
			var ds = new Miso.Dataset({
				url: "data/data.csv",
				delimiter: ","
			});

			ds.fetch({
				success: function() {
					return "asdfasdf";
				}
			})
		}

	}

}
