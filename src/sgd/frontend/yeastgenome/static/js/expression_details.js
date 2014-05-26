
$(document).ready(function() {
  	$.getJSON(expression_details_link, function(data) {
  	    var expression_table = create_expression_table(data);
        create_download_button("expression_table_download", expression_table, download_table_link, download_table_filename);
        $("#expression_table_analyze").hide();
        create_expression_chart(data);
  	});

  	$.getJSON(expression_graph_link, function(data) {
  		if(data['nodes'].length > 1) {
            var graph = create_cytoscape_vis("cy", layout, graph_style, data, null, true);
            var slider = create_slider("slider", graph, data["min_evidence_cutoff"], data["max_evidence_cutoff"], function(new_cutoff) {return "node, edge[evidence >= " + (new_cutoff) + "]";}, 100);
  		}
		else {
			hide_section("network");
		}
	});

	//Hack because footer overlaps - need to fix this.
	add_footer_space("resources");
});

function create_expression_table(data) {
    if("Error" in data) {
        var options = {};
        options["bPaginate"] = true;
        options["aaSorting"] = [[4, "asc"]];
        options["aoColumns"] = [{"bSearchable":false, "bVisible":false}, {"bSearchable":false, "bVisible":false}, {"bSearchable":false, "bVisible":false}, {"bSearchable":false, "bVisible":false}, null, null, {"bVisible":false}, null, null, null, {'sWidth': '250px'}, null];
        options["oLanguage"] = {"sEmptyTable": data["Error"]};
        options["aaData"] = [];
    }
    else {
        var datatable = [];
        var geo_ids = {};
        for (var i=0; i < data.length; i++) {
            datatable.push(expression_data_to_table(data[i], i));
            geo_ids[data[i]['geo_id']] = true;
        }

        set_up_header('expression_table', datatable.length, 'entry', 'entries', Object.keys(geo_ids).length, 'GEO ID', 'GEO IDS');

        var options = {};
        options["bPaginate"] = true;
        options["aaSorting"] = [[4, "asc"]];
        options["aoColumns"] = [{"bSearchable":false, "bVisible":false}, {"bSearchable":false, "bVisible":false}, {"bSearchable":false, "bVisible":false}, {"bSearchable":false, "bVisible":false}, null, null, null, null, null, null];
        options["oLanguage"] = {"sEmptyTable": "No expression data for " + display_name};
        options["aaData"] = datatable;
    }

    return create_table("expression_table", options);
}
google.load("visualization", "1", {packages:["corechart"]});

function create_expression_chart(data) {
    var datatable1 = [['Name', 'Number']];
    var datatable2 = [['Name', 'Number']];
    for (var i=0; i < data.length; i++) {
        if(data[i]['channel_count'] == 1) {
            datatable1.push([data[i]['condition'], data[i]['value']]);
        }
        else if(data[i]['channel_count'] == 2) {
            datatable2.push([data[i]['condition'], data[i]['value']]);
        }
    }

    var chart = new google.visualization.Histogram(document.getElementById('two_channel_expression_chart'));
    chart.draw(google.visualization.arrayToDataTable(datatable2), {
                                title: 'Number of 2-channel experiments vs. log2 ratios',
                                legend: { position: 'none' },
                                height: 300
                            });

    var chart = new google.visualization.Histogram(document.getElementById('one_channel_expression_chart'));
    chart.draw(google.visualization.arrayToDataTable(datatable1), {
                                title: 'Number of 1-channel experiments vs. log2 transformed expression levels',
                                legend: { position: 'none' },
                                height: 300
                            });
}

var graph_style = cytoscape.stylesheet()
	.selector('node')
	.css({
		'content': 'data(name)',
		'font-family': 'helvetica',
		'font-size': 14,
		'text-outline-width': 3,
		'text-outline-color': '#888',
		'text-valign': 'center',
		'color': '#fff',
		'width': 30,
		'height': 30,
		'border-color': '#fff'
	})
	.selector('edge')
	.css({
		'width': 2
	})
	.selector("node[sub_type='FOCUS']")
	.css({
		'background-color': "#fade71",
		'text-outline-color': '#fff',
		'color': '#888'
	})
	.selector("node[type='PHENOTYPE']")
	.css({
		'shape': 'rectangle',
		'text-outline-color': '#fff',
		'color': '#888',
		'background-color': "#D0A9F5"
});

var layout = {
	"name": "arbor",
	"liveUpdate": true,
	"ungrabifyWhileSimulating": true,
	"nodeMass":function(data) {
		if(data.sub_type == 'FOCUS') {
			return 10;
		}
		else {
			return 1;
		}
	}
};
