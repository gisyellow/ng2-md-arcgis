/**
 * Created by najorcruzcruz on 11/7/16.
 */
window.ARCGIS_MODULE = window.ARCGIS_MODULE || {};
(function () {

    var view;
    var featureLayer;

    function init(idElement, callback) {
        callback = callback || function() {};
        require([
            "esri/Map",
            "esri/WebMap",
            "esri/views/MapView",
            "esri/widgets/Search",
            "esri/geometry/Point",
            "esri/tasks/Locator",
            "esri/symbols/SimpleMarkerSymbol",
            "esri/Graphic",
            "esri/layers/FeatureLayer",
            "esri/renderers/SimpleRenderer",
            "esri/renderers/UniqueValueRenderer",
            "esri/symbols/PictureMarkerSymbol",
            "dojo/domReady!"
        ], function (Map, WebMap, MapView, Search, Point, Locator,
                     SimpleMarkerSymbol, Graphic, FeatureLayer, SimpleRenderer,
                     UniqueValueRenderer, PictureMarkerSymbol) {

            var locatorTask = new Locator({
                url: "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer"
            });

            var map = new Map({
                basemap: "streets"
                // basemap: "dark-gray"
            });

            view = new MapView({
                map: map,
                container: idElement
            });


            var searchWidget = new Search({
                view: view
            });

            view.ui.add(searchWidget, {
                position: "top-left",
                index: 0
            });

            var markerSymbol = new PictureMarkerSymbol({
                url: "/assets/img/marker.svg",
                width: "28px",
                height: "28px",
                yoffset: 12
            });

            var renderer = new UniqueValueRenderer({
                field: "id",
                defaultSymbol: markerSymbol
            });


            featureLayer = new FeatureLayer({
                fields: [
                    {
                        name: "id",
                        alias: "id",
                        type: "string"
                    }, {
                        name: "firstName",
                        alias: "FirstName",
                        type: "string"
                    }, {
                        name: "lastName",
                        alias: "LastName",
                        type: "string"
                    }, {
                        name: "email",
                        alias: "Email",
                        type: "string"
                    }],
                source: [],
                objectIdField: "id",
                geometryType: "point",
                spatialReference: {wkid: 4326},
                renderer: renderer,
                popupTemplate: {
                    title: "{firstName} {lastName}",
                    content: "<point-id>{id}</point-id>"
                }
            });

            map.add(featureLayer);

            var first = true;
            view.on("layerview-create", function (event) {
                if (first) {
                    first = false;
                    callback();
                }
            });


            window.ARCGIS_MODULE.removePoint = function(newPoint) {
                if (newPoint) {
                    var foundPoint = featureLayer.source.find(function (point) {
                        return point.attributes.id === newPoint._id;
                    });

                    featureLayer.source.remove(foundPoint);
                }
            };

            window.ARCGIS_MODULE.addPoint = function (newPoints) {
                var points = [];

                newPoints.forEach(function (newPoint) {
                    points.push(new Graphic({
                        geometry: new Point({
                            latitude: newPoint.latitude,
                            longitude: newPoint.longitude
                        }),
                        symbol: markerSymbol,
                        attributes: {
                            id: newPoint._id,
                            firstName: newPoint.firstName,
                            lastName: newPoint.lastName
                        }
                    }))
                });

                featureLayer.source.addMany(points);
            };


            window.ARCGIS_MODULE.loadCoordinates = function (coords) {
                view.zoom = 9;
                view.center = new Point({
                    latitude: coords.latitude,// - 0.25,
                    longitude: coords.longitude
                });
            };

            window.ARCGIS_MODULE.getAddress = function (coords) {
                return new Promise (function (fulfill, reject) {
                    locatorTask.locationToAddress(new Point({
                        latitude: coords.latitude,
                        longitude: coords.longitude
                    })).then(function(data) {
                        fulfill(data);
                    }).otherwise(function(error) {
                        reject(error);
                    })
                });
            };
        });
    }


    function load(opts) {

        if (opts) {
            var coords = opts.coords;
            var onClick = opts.onClick;

            if (coords) {
                window.ARCGIS_MODULE.loadCoordinates(coords);
            }

            view.on('click', onClick);
        }
    }

    window.ARCGIS_MODULE.load = load;
    window.ARCGIS_MODULE.init = init;

})();