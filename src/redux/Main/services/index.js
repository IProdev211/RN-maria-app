import GeoFencing from 'react-native-geo-fencing';
const {map} = require('p-iteration');

class Service {
  static async filterMarkers(markers, searchAnnotations) {
    let filterMarkers = [];
    let markerIds = [];
    await map(searchAnnotations.lines, async line => {
      await map(markers, async marker => {
        try {
          let contains = await GeoFencing.containsLocation(
            {
              lat: marker.location.latitude,
              lng: marker.location.longitude,
            },
            line,
          );
          if (contains) {
            filterMarkers.push(marker);
            markerIds.push(marker.id);
          }
        } catch (e) {}
      });
    });

    await map(searchAnnotations.polygons, async polygon => {
      await map(markers, async marker => {
        if (markerIds.indexOf(marker.id) == -1) {
          try {
            let contains = await GeoFencing.containsLocation(
              {
                lat: marker.location.latitude,
                lng: marker.location.longitude,
              },
              polygon,
            );
            if (contains) {
              filterMarkers.push(marker);
              markerIds.push(marker.id);
            }
          } catch (e) {}
        }
      });
    });

    await map(searchAnnotations.circles, async circle => {
      await map(markers, async marker => {
        if (markerIds.indexOf(marker.id) == -1) {
          if (circle.center) {
            let distance = Service.calculateDistance(
              marker.location,
              circle.center,
            );

            if (distance < circle.radius) {
              filterMarkers.push(marker);
              markerIds.push(marker.id);
            }
          }
        }
      });
    });

    return filterMarkers;
  }

  static calculateDistance(pointA, pointB) {
    const lat1 = pointA.latitude;
    const lon1 = pointA.longitude;

    const lat2 = pointB.latitude;
    const lon2 = pointB.longitude;

    const R = 6371e3; // earth radius in meters
    const φ1 = lat1 * (Math.PI / 180);
    const φ2 = lat2 * (Math.PI / 180);
    const Δφ = (lat2 - lat1) * (Math.PI / 180);
    const Δλ = (lon2 - lon1) * (Math.PI / 180);

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * (Math.sin(Δλ / 2) * Math.sin(Δλ / 2));

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c;
    return distance; // in meters
  }
}

export default Service;
