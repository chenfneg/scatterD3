// Export to SVG function
function export_svg(sel, svg, settings) {
    var svg_content = svg
        .attr("xmlns", "http://www.w3.org/2000/svg")
        .attr("version", 1.1)
        .node().parentNode.innerHTML;
    // Dirty dirty dirty...
    var tmp = svg_content.replace(/<g class="gear-menu[\s\S]*?<\/g>/, '');
    var svg_content2 = tmp.replace(/<ul class="scatterD3-menu[\s\S]*?<\/ul>/, '');
    var image_data = "data:image/octet-stream;base64," + window.btoa(svg_content2);
    d3.select(sel)
        .attr("download", settings.html_id + ".svg")
        .attr("href", image_data);
}

// Function to export custom labels position to CSV file
function export_labels_position(sel, data, settings, scales) {
    var lines_data = ["scatterD3_label,scatterD3_label_x,scatterD3_label_y"];
    data.forEach(function(d, index){
        var labx = d.x;
        if (d.lab_dx !== undefined) {
	    labx = d.x + scales.x.invert(d.lab_dx) - scales.x.domain()[0];
        }
        var size = (d.size_var === undefined) ? settings.point_size : scales.size(d.size_var);
        var offset_y = (-Math.sqrt(size) / 2) - 6;
        if (d.lab_dy !== undefined) {
	    offset_y = d.lab_dy;
        }
        var laby = d.y + scales.y.invert(offset_y) - scales.y.domain()[1];
        var this_line = d.lab + "," + labx + "," + laby;
        lines_data.push(this_line);
    });
    var csv_content = "data:text/csv;base64," + btoa(lines_data.join("\n"));
    d3.select(sel)
        .attr("download", settings.html_id + "_labels.csv")
        .attr("href", encodeURI(csv_content));
}