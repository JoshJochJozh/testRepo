
// hide the form if the browser doesn't do SVG,
// (then just let everything else fail)
if (!document.createElementNS) {
    document.getElementsByTagName("form")[0].style.display = "none";
}

// field definitions from:
// <http://www.census.gov/popest/data/national/totals/2011/files/NST-EST2011-alldata.pdf>



var percent = (function(yPos) {
            var fmt = d3.format(".2f");
            return function(n) { return fmt(n) + "%"; };
        })(),
        years = [1990,1991,1992,1993,1994,1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015],
        fields = [
//            {name: "(no scale)", id: "none"},
            {name: "Number of Articles in ISI", id: "num_articles", key: "num_articles%d", years: years}
//            {name: "Population", id: "num_articles2001", key: "num_articles2001", format: "+,"},
//            {name: "% FB users", id: "p_fb_users", key: "p_fb_users", format: percent},
            // {name: "% of Articles", id: "p_int_users", key: "p_int_users", format: percent},
//            {name: "% Internet users", id: "p_int_users", key: "p_int_users", format: percent},
//            {name: "% FB users of Internet Users", id: "p_fb_users_of_int_users", key: "p_fb_users_of_int_users", format: percent}
        ],
        fieldsById = d3.nest()
                .key(function(d) { return d.id; })
                .rollup(function(d) { return d[0]; })
                .map(fields),
        field = fields[0],
        year = years[0],
        colors = colorbrewer.Spectral[3]
                .reverse()
                .map(function(rgb) { return d3.hsl(rgb); });

var body = d3.select("body"),
        stat = d3.select("#status");





//var fieldSelect = d3.select("#field")
//        .on("change", function(e) {
//            field = fields[this.selectedIndex];
//            location.hash = "#" + [field.id, year].join("/");
//        });
//
//fieldSelect.selectAll("option")
//        .data(fields)
//        .enter()
//        .append("option")
//        .attr("value", function(d) { return d.id; })
//        .text(function(d) { return d.name; });

//var yearSelect = d3.select("#year")
//        .on("change", function(e) {
//            year = years[this.selectedIndex];
//            location.hash = "#" + [field.id, year].join("/");
//        });
//
//yearSelect.selectAll("option")
//        .data(years)
//        .enter()
//        .append("option")
//        .attr("value", function(y) { return y; })
//        .text(function(y) { return y; })

d3.select("input[type=range]").on("change", function() { year = this.value; update(); });
d3.select("input[type=range]").on("click", function() { clearInterval(intervalId); });





//    <!-- Javascript -->
//<script>


//*********************Year Changing*******************//





var intervalId = setInterval(function(){
    if (year < d3.max(years)) {

        year = year + 1;
        update()
    } else {
        setInterval(intervalId);
    }
},2000);







var map = d3.select("#map"),
        zoom = d3.behavior.zoom()
                .translate([-38, 32])
                .scale(1.4)
                .scaleExtent([0.5, 10.0])
                .on("zoom", updateZoom),
        layer = map.append("g")
                .attr("id", "layer"),
        countries = layer.append("g")
                .attr("id", "countries")
                .selectAll("path");

// map.call(zoom);
updateZoom();

function updateZoom() {
    var scale = zoom.scale();
    layer.attr("transform",
            "translate(" + zoom.translate() + ") " +
                    "scale(" + [scale, scale] + ")");
}

var proj = d3.geo.equirectangular(),
        topology,
        geometries,
        rawData,
        dataById = {},
        carto = d3.cartogram()
                .projection(proj)
                .properties(function(d) {
                    if (d.id in dataById) {
                        return dataById[d.id];
                    } else {
                        var tmp = d3.keys(dataById[d3.keys(dataById)[0]]);
                        var ret = {"numcode": d.id};
                        tmp.forEach(function(i){ret[i] = 0});
                        return ret;
                    }
                })
                .value(function(d) {
                    return +d.properties[field];
                });

//window.onhashchange = function() {
//    parseHash();
//};

var segmentized = location.search === "?segmentized",
        url = ["data",
            segmentized ? "world-segmentized.topojson" : "world-110m.json"
        ].join("/");
d3.json(url, function(topo) {
    topology = topo;
    geometries = topology.objects.countries.geometries;
    d3.csv("data/refugee_data.csv", function(data) {
        rawData = data;
        dataById = d3.nest()
                .key(function(d) { return d.numcode; })
                .rollup(function(d) { return d[0]; })
                .map(data);
        init();
    });
});

function init() {
    var features = carto.features(topology, geometries),
            path = d3.geo.path()
                    .projection(proj);

    countries = countries.data(features)
            .enter()
            .append("path")
            .attr("class", "country")
            .attr("id", function(d) {
                return d.id;
            })
            .attr("name", function(d) {
                return d.properties.country;
            })
            .attr("fill", "#fafafa")
            .attr("d", path);

    countries.append("title");

//    parseHash();
}

function reset() {
    stat.text("");
//    body.classed("updating", false);

    var features = carto.features(topology, geometries),
            path = d3.geo.path()
                    .projection(proj);

    countries.data(features)
            .transition()
            .duration(750)
            .ease("linear")
            .attr("fill", "#fafafa")
            .attr("d", path);

    countries.select("title")
            .text(function(d) {
                return d.id;
            });
}

function update() {
    var start = Date.now();
//    body.classed("updating", true);

    var key = field.key.replace("%d", year),
            fmt = (typeof field.format === "function")
                    ? field.format
                    : d3.format(field.format || ","),
            value = function(d) {
                return +d.properties[key];
            },
            values = countries.data()
                    .map(value)
                    .filter(function(n) {
                        return !isNaN(n);
                    })
                    .sort(d3.ascending),
            lo = values[0],
            hi = values[values.length - 1];

    var color = d3.scale.linear()
            .range(colors)
            .domain(lo < 0
                    ? [lo, 0, hi]
                    : [lo, d3.mean(values), hi]);

    // normalize the scale to positive numbers
    var scale = d3.scale.linear()
            .domain([lo, hi])
            .range([1, 3000]);

    // tell the cartogram to use the scaled values
    carto.value(function(d) {
        return scale(value(d));
    });

    // generate the new features, pre-projected
    var features = carto(topology, geometries).features;

    // update the data
    countries.data(features)
            .select("title")
            .text(function(d) {
                return [d.properties.country, fmt(value(d))].join(": ");
            });

    countries.transition()
            .duration(750)
            .ease("linear")
            .attr("fill", function(d) {
                return color(value(d));
            })
            .attr("d", carto.path);

//    var delta = (Date.now() - start) / 1000;
//    stat.text(["calculated in", delta.toFixed(1), "seconds"].join(" "));
//    body.classed("updating", false);

    d3.select("input[type=range]")[0][0].value=year;
    d3.select("#theyear > span")[0][0].innerHTML=year;
}

var deferredUpdate = (function() {
    var timeout;
    return function() {
        var args = arguments;
        clearTimeout(timeout);
        stat.text("calculating...");
        return timeout = setTimeout(function() {
            update.apply(null, arguments);
        }, 10);
    };
})();

//var hashish = d3.selectAll("a.hashish")
//        .datum(function() {
//            return this.href;
//        });
//
//function parseHash() {
//    var parts = location.hash.substr(1).split("/"),
//            desiredFieldId = parts[0],
//            desiredYear = +parts[1];
//
//    field = fieldsById[desiredFieldId] || fields[0];
//    year = (years.indexOf(desiredYear) > -1) ? desiredYear : years[0];
//
//    fieldSelect.property("selectedIndex", fields.indexOf(field));
//
//    if (field.id === "none") {
//
//        yearSelect.attr("disabled", "disabled");
//        reset();
//
//    } else {
//
//        if (field.years) {
//            if (field.years.indexOf(year) === -1) {
//                year = field.years[0];
//            }
//            yearSelect.selectAll("option")
//                    .attr("disabled", function(y) {
//                        return (field.years.indexOf(y) === -1) ? "disabled" : null;
//                    });
//        } else {
//            yearSelect.selectAll("option")
//                    .attr("disabled", null);
//        }
//
//        yearSelect
//                .property("selectedIndex", years.indexOf(year))
//                .attr("disabled", null);
//
//        deferredUpdate();
//        location.replace("#" + [field.id, year].join("/"));
//
//        hashish.attr("href", function(href) {
//            return href + location.hash;
//        });
//    }
//}
