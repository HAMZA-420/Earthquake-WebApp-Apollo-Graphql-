const { RESTDataSource } = require('apollo-datasource-rest');

class QuakeAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://earthquake.usgs.gov/fdsnws/event/1/';
  }

  async getAllQuakes() {

    const query = "query?format=geojson&starttime=2014-01-01&endtime=2014-01-02";
    const response = await this.get(query);
    return Array.isArray(response.features)
      ? response.features.map(quake => this.quakeReducer(quake))
      : [];
  }
  quakeReducer(quake) {
    
    const date = new Date(quake.properties.time)
    const year = date.getFullYear();
    const month = monthName(date.getMonth());
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes() <10 ? "0" + date.getMinutes() : date.getMinutes();
    const seconds = date.getSeconds();
    const datestring = `${month} ${day}, ${year} at ${hour}:${minute} and ${seconds} seconds`;
    const timestamp = quake.properties.time

    function monthName(index) {
        const monthLegend = {
            0:'Jan',
            1:'Feb',
            2:'March',
            3:'April',
            4:'May',
            5:'June',
            6:'July',
            7:'Aug',
            8:'Sept',
            9:'Oct',
            10:'Nov',
            11:'Dec'
        }
        return monthLegend[index];
    };
    return {
        mangnitude: quake.properties.mag,
        location: quake.properties.place,
        when: datestring,
        time: quake.properties.time,
        id: quake.id
    };
  }
  
  
}

module.exports = QuakeAPI;
