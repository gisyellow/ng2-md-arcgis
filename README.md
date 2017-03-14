# Ng2MdArcgisCli
This is a proof of concept between ArcGis, Angular2 and Material design.

## Database
Mongodb is used as database for this project. The database must be run before running the project.

## Development server
Run `node app.js` in the ng2-md-arcgis-server project to activate server side REST API.
Run `ng serve` in the ng2-md-arcgis-front project. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Productiom server
Run `ng build` in ng2-md-arcgis-front project to create a distribution
Run `node app.js` in the ng2-md-arcgis-server project and navigate to `http://localhost:3000/`.

## Cautions
This project uses:
<ul>
<li><a href="https://js.arcgis.com/4.0/">ArcGIS Javascript 4.0</a></li>
<li>Browser geolocation</li>
</ul>