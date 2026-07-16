// Maps our 8 specific device types down to the 3 broad categories
// shown in the dashboard's Device Types legend (Sensors / Gateways / Actuators).

const CATEGORY_MAP = {
  'Temperature Sensor': 'Sensors',
  'Air Quality Sensor': 'Sensors',
  'Motion Sensor': 'Sensors',
  'Humidity Sensor': 'Sensors',
  'Security Camera': 'Sensors',
  'Smart Lock': 'Actuators',
  'Smart Thermostat': 'Actuators',
  'Energy Meter': 'Gateways',
};

export function getDeviceCategory(type) {
  return CATEGORY_MAP[type] || 'Sensors';
}