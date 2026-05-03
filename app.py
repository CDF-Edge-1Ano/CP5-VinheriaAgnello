from flask import Flask, jsonify
import requests

from flask import Flask, jsonify, render_template


app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

BASE_URL = "http://34.39.176.211:8666"
ENTITY_ID = "urn:ngsi-ld:Sensor:001"

headers = {
    'fiware-service': 'smart',
    'fiware-servicepath': '/'
}

def obter_dados(atributo, lastN=30):
    url = f"{BASE_URL}/STH/v1/contextEntities/type/Sensor/id/{ENTITY_ID}/attributes/{atributo}?lastN={lastN}"
    
    try:
        response = requests.get(url, headers=headers, timeout=5)

        if response.status_code == 200:
            data = response.json()
            valores = data['contextResponses'][0]['contextElement']['attributes'][0]['values']
            return valores
        else:
            return []
    except:
        return []

@app.route("/dados")
def dados():
    luminosity = obter_dados("luminosity")
    temperature = obter_dados("temperature")
    humidity = obter_dados("humidity")

    return jsonify({
        "luminosity": luminosity,
        "temperature": temperature,
        "humidity": humidity
    })

if __name__ == "__main__":
    app.run(port=5000, debug=True)