export const get_deviceprofiles = {
	request: {
		'url': 'https://api.smartthings.com/deviceprofiles',
		'method': 'get',
		'headers': {
			'Content-Type': 'application/json;charset=utf-8',
			'Accept': 'application/json',
			'Authorization': 'Bearer 00000000-0000-0000-0000-000000000000',
		},
	},
	response: {
		'items': [
			{
				'id': '9ec3fc36-84e8-44b5-8168-ea54a6951ef1',
				'name': 'AC-Thermostat',
				'owner': {
					'ownerType': 'USER',
					'ownerId': 'c257d2c7-332b-d60d-808d-550bfbd54556',
				},
				'components': [
					{
						'label': 'main',
						'id': 'main',
						'capabilities': [
							{
								'id': 'temperatureMeasurement',
								'version': 1,
							},
							{
								'id': 'thermostatCoolingSetpoint',
								'version': 1,
							},
							{
								'id': 'thermostatMode',
								'version': 1,
							},
							{
								'id': 'thermostatFanMode',
								'version': 1,
							},
							{
								'id': 'thermostatOperatingState',
								'version': 1,
							},
							{
								'id': 'healthCheck',
								'version': 1,
							},
						],
						'categories': [],
					},
				],
				'metadata': {
					'vid': 'ac-thermostat',
					'deviceType': 'Thermostat',
					'ocfDeviceType': 'oic.d.thermostat',
					'mnmn': 'fIIT',
					'ocfSpecVer': 'core 1.1.0',
					'mnid': 'fIIT',
				},
				'status': 'PUBLISHED',
			},
			{
				'id': '869b630c-670f-42f3-b813-778011c6032e',
				'name': 'Aggregate Switch-Motion',
				'owner': {
					'ownerType': 'USER',
					'ownerId': 'c257d2c7-332b-d60d-808d-550bfbd54556',
				},
				'components': [
					{
						'label': 'main',
						'id': 'main',
						'capabilities': [
							{
								'id': 'switch',
								'version': 1,
							},
							{
								'id': 'motionSensor',
								'version': 1,
							},
						],
						'categories': [],
					},
				],
				'metadata': {
					'vid': 'aggregate-switch-motion',
					'deviceType': 'Switch',
					'ocfDeviceType': 'oic.d.switch',
					'mnmn': '0ALX',
					'ocfSpecVer': 'core 1.1.0',
					'mnid': '0ALX',
				},
				'status': 'DEVELOPMENT',
			},
			{
				'id': '90969a16-6f2c-4f30-a2ff-473f8e6e3960',
				'name': 'Bob VirtualSTS Window Shade',
				'owner': {
					'ownerType': 'USER',
					'ownerId': 'c257d2c7-332b-d60d-808d-550bfbd54556',
				},
				'components': [
					{
						'label': 'main',
						'id': 'main',
						'capabilities': [
							{
								'id': 'windowShade',
								'version': 1,
							},
							{
								'id': 'healthCheck',
								'version': 1,
							},
						],
						'categories': [],
					},
				],
				'metadata': {
					'vid': 'BobVirtualSTSWindowShade',
					'deviceType': 'Others',
					'ocfDeviceType': 'oic.wk.d',
					'mnmn': 'SmartThings',
					'ocfSpecVer': 'core 1.1.0',
					'mnid': 'fIIT',
				},
				'status': 'PUBLISHED',
			},
			{
				'id': 'bf03602f-f7c6-47a2-8e9c-784e6e58b950',
				'name': 'Cooling Thermostat (Generic UI)',
				'owner': {
					'ownerType': 'USER',
					'ownerId': 'c257d2c7-332b-d60d-808d-550bfbd54556',
				},
				'components': [
					{
						'label': 'main',
						'id': 'main',
						'capabilities': [
							{
								'id': 'temperatureMeasurement',
								'version': 1,
							},
							{
								'id': 'thermostatCoolingSetpoint',
								'version': 1,
							},
							{
								'id': 'thermostatMode',
								'version': 1,
							},
							{
								'id': 'thermostatFanMode',
								'version': 1,
							},
							{
								'id': 'thermostatOperatingState',
								'version': 1,
							},
							{
								'id': 'healthCheck',
								'version': 1,
							},
						],
						'categories': [],
					},
				],
				'metadata': {
					'vid': 'hvac-thermostat-generic-ui',
					'deviceType': 'Thermostat',
					'ocfDeviceType': 'oic.d.thermostat',
					'mnmn': 'fIIT',
					'ocfSpecVer': 'core 1.1.0',
					'mnid': 'fIIT',
				},
				'status': 'PUBLISHED',
			},
			{
				'id': '96406249-c14c-4d0e-8dd2-f62fbe381e78',
				'name': 'HVAC-Thermostat',
				'owner': {
					'ownerType': 'USER',
					'ownerId': 'c257d2c7-332b-d60d-808d-550bfbd54556',
				},
				'components': [
					{
						'label': 'main',
						'id': 'main',
						'capabilities': [
							{
								'id': 'temperatureMeasurement',
								'version': 1,
							},
							{
								'id': 'thermostatHeatingSetpoint',
								'version': 1,
							},
							{
								'id': 'thermostatCoolingSetpoint',
								'version': 1,
							},
							{
								'id': 'thermostatMode',
								'version': 1,
							},
							{
								'id': 'thermostatFanMode',
								'version': 1,
							},
							{
								'id': 'thermostatOperatingState',
								'version': 1,
							},
							{
								'id': 'healthCheck',
								'version': 1,
							},
						],
						'categories': [],
					},
				],
				'metadata': {
					'vid': 'hvac-thermostat',
					'deviceType': 'Thermostat',
					'ocfDeviceType': 'oic.d.thermostat',
					'mnmn': 'fIIT',
					'ocfSpecVer': 'core 1.1.0',
					'mnid': 'fIIT',
				},
				'status': 'PUBLISHED',
			},
			{
				'id': '80fa58e3-09b5-4e7b-be8c-965b2a19a756',
				'name': 'HVAC-Thermostat (Generic UI)',
				'owner': {
					'ownerType': 'USER',
					'ownerId': 'c257d2c7-332b-d60d-808d-550bfbd54556',
				},
				'components': [
					{
						'label': 'main',
						'id': 'main',
						'capabilities': [
							{
								'id': 'temperatureMeasurement',
								'version': 1,
							},
							{
								'id': 'thermostatHeatingSetpoint',
								'version': 1,
							},
							{
								'id': 'thermostatCoolingSetpoint',
								'version': 1,
							},
							{
								'id': 'thermostatMode',
								'version': 1,
							},
							{
								'id': 'thermostatFanMode',
								'version': 1,
							},
							{
								'id': 'thermostatOperatingState',
								'version': 1,
							},
							{
								'id': 'healthCheck',
								'version': 1,
							},
						],
						'categories': [],
					},
				],
				'metadata': {
					'vid': 'hvac-thermostat-generic-ui',
					'deviceType': 'Thermostat',
					'ocfDeviceType': 'oic.d.thermostat',
					'mnmn': 'fIIT',
					'ocfSpecVer': 'core 1.1.0',
					'mnid': 'fIIT',
				},
				'status': 'PUBLISHED',
			},
			{
				'id': '18f7d1fe-74c8-43f0-8669-4600f855a909',
				'name': 'HVAC-Thermostat-With-Legacy',
				'owner': {
					'ownerType': 'USER',
					'ownerId': 'c257d2c7-332b-d60d-808d-550bfbd54556',
				},
				'components': [
					{
						'label': 'main',
						'id': 'main',
						'capabilities': [
							{
								'id': 'temperatureMeasurement',
								'version': 1,
							},
							{
								'id': 'thermostatHeatingSetpoint',
								'version': 1,
							},
							{
								'id': 'thermostatCoolingSetpoint',
								'version': 1,
							},
							{
								'id': 'thermostatMode',
								'version': 1,
							},
							{
								'id': 'thermostatFanMode',
								'version': 1,
							},
							{
								'id': 'thermostatOperatingState',
								'version': 1,
							},
							{
								'id': 'healthCheck',
								'version': 1,
							},
							{
								'id': 'thermostat',
								'version': 1,
							},
						],
						'categories': [],
					},
				],
				'metadata': {
					'vid': 'hvac-thermostat',
					'deviceType': 'Thermostat',
					'ocfDeviceType': 'oic.d.thermostat',
					'mnmn': 'fIIT',
					'ocfSpecVer': 'core 1.1.0',
					'mnid': 'fIIT',
				},
				'status': 'PUBLISHED',
			},
			{
				'id': 'ccdb21f9-0666-4f78-8fcd-48810364b2c1',
				'name': 'Heating Thermostat (Generic UI)',
				'owner': {
					'ownerType': 'USER',
					'ownerId': 'c257d2c7-332b-d60d-808d-550bfbd54556',
				},
				'components': [
					{
						'label': 'main',
						'id': 'main',
						'capabilities': [
							{
								'id': 'temperatureMeasurement',
								'version': 1,
							},
							{
								'id': 'thermostatHeatingSetpoint',
								'version': 1,
							},
							{
								'id': 'thermostatMode',
								'version': 1,
							},
							{
								'id': 'thermostatFanMode',
								'version': 1,
							},
							{
								'id': 'thermostatOperatingState',
								'version': 1,
							},
							{
								'id': 'healthCheck',
								'version': 1,
							},
						],
						'categories': [],
					},
				],
				'metadata': {
					'vid': 'hvac-thermostat-generic-ui',
					'deviceType': 'Thermostat',
					'ocfDeviceType': 'oic.d.thermostat',
					'mnmn': 'fIIT',
					'ocfSpecVer': 'core 1.1.0',
					'mnid': 'fIIT',
				},
				'status': 'PUBLISHED',
			},
			{
				'id': 'c9a88e65-5707-4c43-af59-80bdef27f8f0',
				'name': 'Heating-Thermostat',
				'owner': {
					'ownerType': 'USER',
					'ownerId': 'c257d2c7-332b-d60d-808d-550bfbd54556',
				},
				'components': [
					{
						'label': 'main',
						'id': 'main',
						'capabilities': [
							{
								'id': 'temperatureMeasurement',
								'version': 1,
							},
							{
								'id': 'thermostatHeatingSetpoint',
								'version': 1,
							},
							{
								'id': 'thermostatMode',
								'version': 1,
							},
							{
								'id': 'thermostatOperatingState',
								'version': 1,
							},
							{
								'id': 'healthCheck',
								'version': 1,
							},
						],
						'categories': [],
					},
				],
				'metadata': {
					'vid': 'heating-thermostat',
					'deviceType': 'Thermostat',
					'ocfDeviceType': 'oic.d.thermostat',
					'mnmn': 'fIIT',
					'ocfSpecVer': 'core 1.1.0',
					'mnid': 'fIIT',
				},
				'status': 'PUBLISHED',
			},
			{
				'id': '32c0fcf0-6940-43ee-9caf-ce3f6fb73ab6',
				'name': 'Simple Switch',
				'owner': {
					'ownerType': 'USER',
					'ownerId': 'c257d2c7-332b-d60d-808d-550bfbd54556',
				},
				'components': [
					{
						'label': 'main',
						'id': 'main',
						'capabilities': [
							{
								'id': 'switch',
								'version': 1,
							},
						],
						'categories': [],
					},
				],
				'metadata': {
					'vid': 'simple-switch',
					'deviceType': 'Switch',
					'ocfDeviceType': 'oic.d.switch',
					'mnmn': 'fIIT',
					'deviceTypeId': 'Switch',
					'ocfSpecVer': 'core 1.1.0',
					'mnid': 'fIIT',
					'mnId': 'fIIT',
				},
				'status': 'DEVELOPMENT',
			},
			{
				'id': 'ab2559eb-dcc3-43f1-b83f-e62375403f58',
				'name': 'Virtual STS Leak Detector',
				'owner': {
					'ownerType': 'USER',
					'ownerId': 'c257d2c7-332b-d60d-808d-550bfbd54556',
				},
				'components': [
					{
						'label': 'main',
						'id': 'main',
						'capabilities': [
							{
								'id': 'waterSensor',
								'version': 1,
							},
							{
								'id': 'refresh',
								'version': 1,
							},
							{
								'id': 'healthCheck',
								'version': 1,
							},
						],
						'categories': [],
					},
				],
				'metadata': {
					'vid': 'virtual-sts-leak-detector',
					'deviceType': 'LeakSensor',
					'ocfDeviceType': 'x.com.st.d.sensor.moisture',
					'mnmn': '0ALX',
					'deviceTypeId': 'LeakSensor',
					'ocfSpecVer': 'core 1.1.0',
					'mnid': '0ALX',
					'mnId': '0ALX',
				},
				'status': 'PUBLISHED',
			},
			{
				'id': '05c8badd-3ac9-4c18-a80c-da435e9f6fe8',
				'name': 'Virtual STS Lock',
				'owner': {
					'ownerType': 'USER',
					'ownerId': 'c257d2c7-332b-d60d-808d-550bfbd54556',
				},
				'components': [
					{
						'label': 'main',
						'id': 'main',
						'capabilities': [
							{
								'id': 'lock',
								'version': 1,
							},
							{
								'id': 'refresh',
								'version': 1,
							},
							{
								'id': 'healthCheck',
								'version': 1,
							},
						],
						'categories': [],
					},
				],
				'metadata': {
					'vid': 'virtual-sts-lock',
					'deviceType': 'SmartLock',
					'ocfDeviceType': 'oic.d.smartlock',
					'mnmn': '0ALX',
					'deviceTypeId': 'SmartLock',
					'ocfSpecVer': 'core 1.1.0',
					'mnid': '0ALX',
					'mnId': '0ALX',
				},
				'status': 'PUBLISHED',
			},
			{
				'id': 'acd1deab-30d5-4297-a005-a1e6b14a7e9b',
				'name': 'Virtual STS Smoke CO',
				'owner': {
					'ownerType': 'USER',
					'ownerId': 'c257d2c7-332b-d60d-808d-550bfbd54556',
				},
				'components': [
					{
						'label': 'main',
						'id': 'main',
						'capabilities': [
							{
								'id': 'smokeDetector',
								'version': 1,
							},
							{
								'id': 'carbonMonoxideDetector',
								'version': 1,
							},
							{
								'id': 'refresh',
								'version': 1,
							},
							{
								'id': 'healthCheck',
								'version': 1,
							},
						],
						'categories': [],
					},
				],
				'metadata': {
					'vid': 'virtual-sts-smoke-co',
					'deviceType': 'SmokeDetector',
					'ocfDeviceType': 'x.com.st.d.sensor.smoke',
					'mnmn': '0ALX',
					'deviceTypeId': 'SmokeDetector',
					'ocfSpecVer': 'core 1.1.0',
					'mnid': '0ALX',
					'mnId': '0ALX',
				},
				'status': 'PUBLISHED',
			},
			{
				'id': '82da5d6b-aedc-4ed5-81fb-9661e1e499a2',
				'name': 'VirtualSTS Air Conditioner',
				'owner': {
					'ownerType': 'USER',
					'ownerId': 'c257d2c7-332b-d60d-808d-550bfbd54556',
				},
				'components': [
					{
						'label': 'main',
						'id': 'main',
						'capabilities': [
							{
								'id': 'temperatureMeasurement',
								'version': 1,
							},
							{
								'id': 'thermostatCoolingSetpoint',
								'version': 1,
							},
							{
								'id': 'airConditionerMode',
								'version': 1,
							},
							{
								'id': 'thermostatOperatingState',
								'version': 1,
							},
							{
								'id': 'switch',
								'version': 1,
							},
							{
								'id': 'healthCheck',
								'version': 1,
							},
						],
						'categories': [],
					},
				],
				'metadata': {
					'vid': 'virtual-sts-air-conditioner',
					'deviceType': 'AirConditioner',
					'ocfDeviceType': 'oic.d.airconditioner',
					'mnmn': 'fIIT',
					'deviceTypeId': 'AirConditioner',
					'ocfSpecVer': 'core 1.1.0',
					'mnid': 'fIIT',
					'mnId': 'fIIT',
				},
				'status': 'PUBLISHED',
			},
			{
				'id': '3f3e6638-ab1f-4616-8ef7-82ddff2fd60b',
				'name': 'VirtualSTS Button',
				'owner': {
					'ownerType': 'USER',
					'ownerId': 'c257d2c7-332b-d60d-808d-550bfbd54556',
				},
				'components': [
					{
						'label': 'main',
						'id': 'main',
						'capabilities': [
							{
								'id': 'button',
								'version': 1,
							},
							{
								'id': 'healthCheck',
								'version': 1,
							},
						],
						'categories': [],
					},
				],
				'metadata': {
					'vid': 'virtual-sts-button',
					'deviceType': 'IRRemote',
					'ocfDeviceType': 'x.com.st.d.irblaster',
					'mnmn': 'fIIT',
					'deviceTypeId': 'IRRemote',
					'ocfSpecVer': 'core 1.1.0',
					'mnid': 'fIIT',
					'mnId': 'fIIT',
				},
				'status': 'PUBLISHED',
			},
			{
				'id': 'c890a957-1ea7-4dba-b98d-68518bcb9834',
				'name': 'VirtualSTS Power Supply',
				'owner': {
					'ownerType': 'USER',
					'ownerId': 'c257d2c7-332b-d60d-808d-550bfbd54556',
				},
				'components': [
					{
						'label': 'main',
						'id': 'main',
						'capabilities': [
							{
								'id': 'switch',
								'version': 1,
							},
							{
								'id': 'bobdemo.outputVoltage',
								'version': 1,
							},
							{
								'id': 'bobdemo.outputModulation',
								'version': 1,
							},
							{
								'id': 'healthCheck',
								'version': 1,
							},
						],
						'categories': [],
					},
				],
				'metadata': {
					'vid': 'BobdemoPowerSupply',
					'ocfDeviceType': 'oic.d.smartplug',
					'mnmn': 'SmartThings',
					'mnid': 'SmartThings',
				},
				'status': 'PUBLISHED',
			},
			{
				'id': '3c7e7257-c378-4a43-a8c5-760ff7e9b644',
				'name': 'VirtualSTS Two Channel Outlet',
				'owner': {
					'ownerType': 'USER',
					'ownerId': 'c257d2c7-332b-d60d-808d-550bfbd54556',
				},
				'components': [
					{
						'label': 'main',
						'id': 'main',
						'capabilities': [
							{
								'id': 'switch',
								'version': 1,
							},
							{
								'id': 'healthCheck',
								'version': 1,
							},
						],
						'categories': [],
					},
					{
						'label': 'outlet1',
						'id': 'outlet1',
						'capabilities': [
							{
								'id': 'switch',
								'version': 1,
							},
						],
						'categories': [],
					},
					{
						'label': 'outlet2',
						'id': 'outlet2',
						'capabilities': [
							{
								'id': 'switch',
								'version': 1,
							},
						],
						'categories': [],
					},
				],
				'metadata': {
					'vid': 'virtual-sts-two-channel-outlet',
					'deviceType': 'SmartPlug',
					'ocfDeviceType': 'oic.d.smartplug',
					'mnmn': 'fIIT',
					'ocfSpecVer': 'core 1.1.0',
					'mnid': 'fIIT',
				},
				'status': 'PUBLISHED',
			},
			{
				'id': 'dc1a5647-7f1e-465f-8a78-c541852c91ed',
				'name': 'VirtualSTS Utility Meter',
				'owner': {
					'ownerType': 'USER',
					'ownerId': 'c257d2c7-332b-d60d-808d-550bfbd54556',
				},
				'components': [
					{
						'label': 'main',
						'id': 'main',
						'capabilities': [
							{
								'id': 'powerMeter',
								'version': 1,
							},
							{
								'id': 'energyMeter',
								'version': 1,
							},
							{
								'id': 'gasMeter',
								'version': 1,
							},
							{
								'id': 'healthCheck',
								'version': 1,
							},
						],
						'categories': [],
					},
				],
				'metadata': {
					'vid': 'virtual-sts-utility-meter',
					'deviceType': 'Others',
					'ocfDeviceType': 'oic.wk.d',
					'mnmn': 'fIIT',
					'ocfSpecVer': 'core 1.1.0',
					'mnid': 'fIIT',
				},
				'status': 'PUBLISHED',
			},
			{
				'id': '9938ef87-3167-40f1-a256-0e7efa9afdc3',
				'name': 'VirtualSTS Window Shade',
				'owner': {
					'ownerType': 'USER',
					'ownerId': 'c257d2c7-332b-d60d-808d-550bfbd54556',
				},
				'components': [
					{
						'label': 'main',
						'id': 'main',
						'capabilities': [
							{
								'id': 'windowShade',
								'version': 1,
							},
							{
								'id': 'healthCheck',
								'version': 1,
							},
						],
						'categories': [],
					},
				],
				'metadata': {
					'vid': 'virtual-sts-window-shade',
					'deviceType': 'Others',
					'ocfDeviceType': 'oic.wk.d',
					'mnmn': 'fIIT',
					'ocfSpecVer': 'core 1.1.0',
					'mnid': 'fIIT',
				},
				'status': 'PUBLISHED',
			},
			{
				'id': '0a4f14c1-4702-4d25-accd-810eafa6c8df',
				'name': 'VirtualSTS Window Shade Preset',
				'owner': {
					'ownerType': 'USER',
					'ownerId': 'c257d2c7-332b-d60d-808d-550bfbd54556',
				},
				'components': [
					{
						'label': 'main',
						'id': 'main',
						'capabilities': [
							{
								'id': 'windowShade',
								'version': 1,
							},
							{
								'id': 'windowShadePreset',
								'version': 1,
							},
							{
								'id': 'healthCheck',
								'version': 1,
							},
						],
						'categories': [],
					},
				],
				'metadata': {
					'vid': 'virtual-sts-window-shade-preset',
					'deviceType': 'Others',
					'ocfDeviceType': 'oic.wk.d',
					'mnmn': 'fIIT',
					'ocfSpecVer': 'core 1.1.0',
					'mnid': 'fIIT',
				},
				'status': 'PUBLISHED',
			},
		],
		'_links': {
			'next': null,
			'previous': null,
		},
	},
}

export const get_deviceprofiles_96406249_c14c_4d0e_8dd2_f62fbe381e78 = {
	request: {
		'url': 'https://api.smartthings.com/deviceprofiles/96406249-c14c-4d0e-8dd2-f62fbe381e78',
		'method': 'get',
		'headers': {
			'Content-Type': 'application/json;charset=utf-8',
			'Accept': 'application/json',
			'Authorization': 'Bearer 00000000-0000-0000-0000-000000000000',
		},
	},
	response: {
		'id': '96406249-c14c-4d0e-8dd2-f62fbe381e78',
		'name': 'HVAC-Thermostat',
		'owner': {
			'ownerType': 'USER',
			'ownerId': 'c257d2c7-332b-d60d-808d-550bfbd54556',
		},
		'components': [
			{
				'label': 'main',
				'id': 'main',
				'capabilities': [
					{
						'id': 'temperatureMeasurement',
						'version': 1,
					},
					{
						'id': 'thermostatHeatingSetpoint',
						'version': 1,
					},
					{
						'id': 'thermostatCoolingSetpoint',
						'version': 1,
					},
					{
						'id': 'thermostatMode',
						'version': 1,
					},
					{
						'id': 'thermostatFanMode',
						'version': 1,
					},
					{
						'id': 'thermostatOperatingState',
						'version': 1,
					},
					{
						'id': 'healthCheck',
						'version': 1,
					},
				],
				'categories': [],
			},
		],
		'metadata': {
			'vid': 'hvac-thermostat',
			'deviceType': 'Thermostat',
			'ocfDeviceType': 'oic.d.thermostat',
			'mnmn': 'fIIT',
			'ocfSpecVer': 'core 1.1.0',
			'mnid': 'fIIT',
		},
		'status': 'PUBLISHED',
	},
}

export const get_deviceprofiles_3acbf2fc_6be2_4be0_aeb5_c10f4ff357bb_i18n = {
	request: {
		'url': 'https://api.smartthings.com/deviceprofiles/3acbf2fc-6be2-4be0-aeb5-c10f4ff357bb/i18n',
		'method': 'get',
		'headers': {
			'Content-Type': 'application/json;charset=utf-8',
			'Accept': 'application/json',
			'Authorization': 'Bearer 00000000-0000-0000-0000-000000000000',
		},
	},
	response: {
		'items': [
			{
				'tag': 'en',
			},
			{
				'tag': 'es',
			},
		],
	},
}
