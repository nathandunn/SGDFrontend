
//Set up navbar
add_navbar_title('<a href="' + link + '">' + display_name + '/' + format_name + '</a> Regulation');
add_navbar_element('Regulation Summary', 'summary');
if(target_count > 0) {
    add_navbar_element('Domains and Classification', 'domains');
    add_navbar_element('DNA Binding Site Motifs', 'binding');
  	add_navbar_element('Targets', 'targets');
  	add_navbar_element('Shared GO Processes Among Targets', 'enrichment');
}
if(regulator_count > 0) {
    add_navbar_element('Regulators', 'regulators');
}
if(target_count + regulator_count > 0) {
    add_navbar_element('Network Visualization', 'network');
}

$(document).ready(function() {

    if(target_count > 0) {
		$.getJSON(protein_domains_link, function(data) {
            var domain_table = create_domain_table(data);
            create_download_button("domains_table_download", domain_table, download_table_link, domains_table_filename);
		});
    }

    if(target_count > 0) {
	  	$.getJSON(binding_site_details_link, function(data) {
	        create_binding_site_table(data);
	    });
	}

	$.getJSON(regulation_details_link, function(data) {
  		if(target_count > 0) {
  		    var target_table = create_target_table(data["targets"]);
  		    create_analyze_button("targets_table_analyze", target_table, analyze_link, analyze_filename + ' targets', true);
  	        create_analyze_button("analyze_targets", target_table, analyze_link, analyze_filename + ' targets', false);
  	        create_download_button("targets_table_download", target_table, download_table_link, targets_table_filename);

  	        $.getJSON(regulation_target_enrichment_link, function(enrichment_data) {
                var enrichment_table = create_enrichment_table("enrichment_table", target_table, enrichment_data);
                create_download_button("enrichment_table_download", enrichment_table, download_table_link, enrichment_table_filename);
  	        });
  		}

  		if(regulator_count > 0) {
  		    var regulator_table = create_regulator_table(data["regulators"]);
  		    create_analyze_button("regulators_table_analyze", regulator_table, analyze_link, analyze_filename + ' targets', true);
  	        create_analyze_button("analyze_regulators", regulator_table, analyze_link, analyze_filename + ' targets', false);
  	        create_download_button("regulators_table_download", regulator_table, download_table_link, regulators_table_filename);
  		}
  	});

    $.getJSON(regulation_graph_link, function(data) {
        if(data != null && data["nodes"].length > 1) {
            var graph = create_cytoscape_vis("cy", layout, graph_style, data);
            var slider = create_slider('slider', graph, data['min_evidence_cutoff'], data['max_evidence_cutoff'], slider_filter);

            if(data['max_target_cutoff'] >= data['min_evidence_cutoff'] && data['max_regulator_cutoff'] >= data['min_evidence_cutoff']) {
                create_discrete_filter('all_radio', graph, slider, all_filter, data['max_evidence_cutoff']);
                create_discrete_filter('targets_radio', graph, slider, target_filter, data['max_target_cutoff']);
                create_discrete_filter('regulators_radio', graph, slider, regulator_filter, data['max_regulator_cutoff']);
                $("#discrete_filter").show();
            }
            else {
                $("#discrete_filter").hide();
            }
        }
        else {
            hide_section("network");

            //Hack because footer overlaps - need to fix this.
            next_section = $("#regulators");
            next_section.append(document.createElement("br"));
            next_section.append(document.createElement("br"));
            next_section.append(document.createElement("br"));
            next_section.append(document.createElement("br"));
            next_section.append(document.createElement("br"));
            next_section.append(document.createElement("br"));
        }
    });
});

function create_domain_table(data) {
    var domain_table = null;
    if(data != null && data.length > 0) {
        $("#domains").show();

	    var datatable = [];

        for (var i=0; i < data.length; i++) {
            datatable.push(domain_data_to_table(data[i]));
        }

        $("#domains_header").html(data.length);

        set_up_range_sort();

        var options = {};
        options["bPaginate"] = false;
        options["aaSorting"] = [[2, "asc"]];
        options["aoColumns"] = [{"bSearchable":false, "bVisible":false}, {"bSearchable":false, "bVisible":false}, { "sType": "range" }, { "sType": "html" }, null, null]
        options["aaData"] = datatable;

        domain_table = create_table("domains_table", options);
	}
	return domain_table;
}

function create_binding_site_table(data) {
    if(data.length > 0) {
        $("#binding").show();
	  	var list = $("#binding_motifs");
	    for (var i=0; i < data.length; i++) {
		    var evidence = data[i];

		    var a = document.createElement('a');
		    a.href = "http://yetfasco.ccbr.utoronto.ca/MotViewLong.php?PME_sys_qf2=" + evidence['motif_id']
		    a.target = "_blank";
		    var img = document.createElement('img');
		    img.src = evidence['img_url'];
		    img.className = "yetfasco";

		    a.appendChild(img);
		    list.append(a);
	    }
	}
	else {
	    hide_section("binding");
	}
}

function create_target_table(data) {
    var target_table = null;

	if(data.length > 0) {
	    $("#targets").show();
	  	var datatable = [];
	  	var genes = {};
	    for (var i=0; i < data.length; i++) {
		    datatable.push(regulation_data_to_table(data[i], false));
		    genes[data[i]['bioentity2']['id']] = true;
		}

  	    $("#targets_header").html(data.length);
  	    $("#targets_gene_header").html(Object.keys(genes).length);

  	    var options = {};
		options["bPaginate"] = true;
		options["aaSorting"] = [[4, "asc"]];
		options["aoColumns"] = [{"bSearchable":false, "bVisible":false}, {"bSearchable":false, "bVisible":false}, {"bSearchable":false, "bVisible":false}, {"bSearchable":false, "bVisible":false}, null, {"bSearchable":false, "bVisible":false}, null, null, null, null, null]
		options["aaData"] = datatable;

		target_table = create_table("targets_table", options);
  	}
    return target_table;
}

function create_regulator_table(data) {
    var regulator_table = null;

	if(data.length > 0) {
	    $("#regulators").show();
	  	var datatable = [];
	  	var genes = {};
	    for (var i=0; i < data.length; i++) {
		    datatable.push(regulation_data_to_table(data[i], true));
		    genes[data[i]['bioentity1']['id']] = true;
  	    }

  	    $("#regulators_header").html(data.length);
  	    $("#regulators_gene_header").html(Object.keys(genes).length);

  	    var options = {};
		options["bPaginate"] = true;
		options["aaSorting"] = [[2, "asc"]];
		options["aoColumns"] = [{"bSearchable":false, "bVisible":false}, {"bSearchable":false, "bVisible":false}, null, {"bSearchable":false, "bVisible":false}, {"bSearchable":false, "bVisible":false}, {"bSearchable":false, "bVisible":false}, null, null, null, null, null]
		options["aaData"] = datatable;

		regulator_table = create_table("regulators_table", options);
  	}
    return regulator_table;
}

function slider_filter(new_cutoff) {
    return "node, edge[evidence >= " + new_cutoff + "]";
}

function all_filter() {
    return "node, edge";
}

function target_filter() {
    return "node, edge[class_type = 'TARGET']";
}

function regulator_filter() {
    return "node, edge[class_type = 'REGULATOR']";
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
		'width': 2,
		'target-arrow-shape': 'triangle',
		'line-color': '#848484',
		'target-arrow-color': '#848484'
	})
	.selector("node[sub_type='FOCUS']")
	.css({
		'background-color': "#fade71",
		'text-outline-color': '#fff',
		'color': '#888'
	})
	.selector("node[class_type='TARGET'][sub_type!='FOCUS']")
	.css({
		'background-color': "#AF8DC3",
		'text-outline-color': '#888',
		'color': '#fff'
	})
	.selector("node[class_type='REGULATOR'][sub_type!='FOCUS']")
	.css({
		'background-color': "#7FBF7B",
		'text-outline-color': '#888',
		'color': '#fff'
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