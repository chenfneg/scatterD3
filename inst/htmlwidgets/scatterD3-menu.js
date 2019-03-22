// Add menu to chart
function add_menu(chart) {

    var svg = chart.svg();

    // Gear icon
    var gear = svg.append("g")
        .attr("class", "gear-menu")
        .attr("transform", "translate(" + (chart.width() - 40) + "," + 10 + ")");
    gear.append("rect")
        .attr("class", "gear-toggle")
        .attr("width", "25")
        .attr("height", "25")
        .style("fill", "#FFFFFF");
    gear.append("path")
        .attr("d", gear_path())
        .attr("transform", "translate(-3,3)")
        .style("fill", "#666666");

    var menu_parent = d3v5.select(svg.node().parentNode);
    menu_parent.style("position", "relative");
    var menu = menu_parent.select(".scatterD3-menu");

    menu.attr("id", "scatterD3-menu-" + chart.settings().html_id);

    menu.append("li")
        .append("a")
        .on("click", function () { reset_zoom(chart) })
        .html("Reset zoom");

    menu.append("li")
        .append("a")
        .on("click", function () { export_svg(this, chart); })
        .html("Export to SVG");

    if (chart.settings().lasso) {
        menu.append("li")
            .append("a")
            .attr("class", "lasso-entry")
            .on("click", function() { lasso_toggle(chart); })
            .html("Toggle lasso on");
    }

    var label_export = menu.append("li")
        .attr("class", "label-export");
    label_export.append("a")
        .on("click", function () { export_labels_position(this, chart); })
        .html("Export labels positions");
    if (!chart.settings().has_labels) {
        label_export.style("display", "none");
    }

    gear.on("click", function (d, i) {
        var menu = d3v5.select("#scatterD3-menu-" + chart.settings().html_id);
        var gear = svg.select(".gear-menu");
        if (!menu.classed("open")) {
            menu.transition().duration(300)
                .style("opacity", "0.95")
                .style("width", "165px");
            gear.classed("selected", true);
            menu.classed("open", true);
        } else {
            menu.transition().duration(300)
                .style("opacity", "0")
                .style("width", "0px");
            gear.classed("selected", false);
            menu.classed("open", false);
        }
    });
}


// Add caption
function add_caption(chart) {

    var caption_parent = d3v5.select(chart.svg().node().parentNode);
    var caption = caption_parent.select(".scatterD3-caption");

    if (chart.settings().caption.title)
        caption.append("h1").attr("class", "title").html(chart.settings().caption.title);
    if (chart.settings().caption.subtitle)
        caption.append("h2").attr("class", "subtitle").html(chart.settings().caption.subtitle);
    if (chart.settings().caption.text)
        caption.append("p").attr("class", "caption").html(chart.settings().caption.text);
    caption.style("top", chart.dims().svg_height + "px");

    // Caption icon
    var caption_top_margin = chart.settings().menu ? 35 : 10;
    var caption_icon = chart.svg().append("g")
        .attr("class", "caption-icon")
        .attr("transform", "translate(" + (chart.dims().svg_width - 40) + "," + (chart.dims().svg_height - 71) + ")")
        .attr("transform", "translate(" + (chart.dims().svg_width - 40) + "," + caption_top_margin + ")");
    caption_icon.append("rect")
        .attr("class", "caption-toggle")
        .attr("width", "25")
        .attr("height", "25")
        .style("fill", "#FFFFFF");
    caption_icon.append("path")
        .attr("d", caption_path())
        .attr("transform", "translate(4,4)")
        .style("fill", "#666666");

    caption_icon.on("click", function () {
        if (!caption.classed("visible")) {
            caption.classed("visible", true);
            caption.style("margin-top", -caption.node().getBoundingClientRect().height + "px");
        }
        else {
            caption.classed("visible", false);
            caption.style("margin-top", "0px");
        }
    });

    caption.on("click", function () {
        caption.classed("visible", false);
        caption.style("margin-top", "0px");
    });

}