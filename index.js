var ttn = require('ttn');
var request = require('request');

var region = 'eu';
var appId = 'collector';
var accessKey = 'ttn-account-v2.KcaCDA8Iw0iBIOchoWfg6MraIWe_0-A08zBjOkAEKA0';

var client = new ttn.Client(region, appId, accessKey);

client.on('message', function(deviceId, data) {
  //console.info('[INFO] ', 'Message:', deviceId, JSON.stringify(data, null, 2));
	//console.info('[INFO] ', 'Message:', deviceId, JSON.stringify(data.payload_fields, null, 2));
	if (data.payload_fields.sensor === '1Wire') {
		request.get('https://api.thingspeak.com/update?api_key=ZMCIZJJNUJWIPV8I&field1=' + data.payload_fields.vcc + '&field2=' + data.payload_fields.temperature);
		request.get('https://dweet.io/dweet/for/diy_1_wire?vcc=' + data.payload_fields.vcc + '&t=' + data.payload_fields.temperature );
		request.post('http://things.ubidots.com/api/v1.6/devices/diy_1_wire/?token=mcZUg57nVxS1CsHyWGveG32faNeNxJ',
								{formData: {
												    vcc: data.payload_fields.vcc,
												    t: data.payload_fields.temperature
												  },
							  json: true}, 
								function (err, res, body) {
													  // assert.equal(typeof body, 'object')
								}
								);
	}
  if (data.payload_fields.sensor === 'DHT') {
		request.get('https://dweet.io/dweet/for/diy_dht?vcc=' + data.payload_fields.vcc + '&t=' + data.payload_fields.temperature + '&h=' + data.payload_fields.humidity);
		request.get('https://api.thingspeak.com/update?api_key=ZMCIZJJNUJWIPV8I&field1=' + data.payload_fields.vcc + '&field3=' + data.payload_fields.temperature + "&field4="+data.payload_fields.humidity);
		request.post('http://things.ubidots.com/api/v1.6/devices/diy_dht/?token=mcZUg57nVxS1CsHyWGveG32faNeNxJ',
								{formData: {
												    vcc: data.payload_fields.vcc,
												    t: data.payload_fields.temperature,
														h: data.payload_fields.humidity
												  },
							  json: true}, 
								function (err, res, body) {
													  // assert.equal(typeof body, 'object')
								}
								);
	}
});