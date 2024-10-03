import ee
ee.Initialize(project='ee-shumailarshadubit')
import geemap
import matplotlib.pyplot as plt
import pandas as pd
import os
import webbrowser
from geopy.geocoders import Nominatim
import pandas as pd

#------------------------ get the target coordinates ------------------------------------------------

# Initialize a Nominatim geocoder
geolocator = Nominatim(user_agent="my_app")

loc_name = str(input("enter the name of your target location = "))

# Geocode the location "sukkur"
location = geolocator.geocode(loc_name)

# Extract latitude and longitude
latitude = location.latitude
longitude = location.longitude

target_point = ee.Geometry.Point(longitude, latitude)

#----------------------- load landsat info -------------------------------------------------------

maps = geemap.Map(center=[latitude, longitude], zoom=10)

collection = ee.ImageCollection('LANDSAT/LC08/C02/T1')
  
# Define a function to find the most recent Landsat image
def find_most_recent_landsat_image(geometry):

  start_date = str(input("enter your Starting date for data capture = "))
  end_date = str(input("enter your Ending date for data capture = "))

  # Filter the collection by geometry and time
  filtered_collection = collection.filterBounds(geometry)\
    .filterDate(start_date, end_date)\
    .filterMetadata('CLOUD_COVER', 'less_than', 10)

  # Sort the collection by date and select the most recent image
  most_recent_image = filtered_collection.sort('system:time_start', False).first()

  return most_recent_image


wrs2_geometry = ee.Geometry.Polygon([[
  [longitude - 0.1677, latitude - 0.2617],
  [longitude - 0.1677, latitude + 0.2264],
  [longitude + 0.3323, latitude + 0.2264],
  [longitude + 0.3323, latitude - 0.2617]
]])

# Find the most recent Landsat image for Karachi
most_recent_landsat = find_most_recent_landsat_image(wrs2_geometry)


#--------------------------------- get landsat metadata -------------------------------------------------------------

landsat_props = geemap.image_props(most_recent_landsat)

lst = ['Sensor ID','Spacecraft ID','Station ID','Target WRS path','Target WRS row','WRS path','WRS row',
       'Image date','Cloud Cover','Cloud Cover Land','Image Quality OLI','Image Quality TIRS']

prp_lst = ['SENSOR_ID', 'SPACECRAFT_ID', 'STATION_ID',
'TARGET_WRS_PATH', 'TARGET_WRS_ROW', 'WRS_PATH', 'WRS_ROW',
'IMAGE_DATE','CLOUD_COVER','CLOUD_COVER_LAND', 'IMAGE_QUALITY_OLI', 'IMAGE_QUALITY_TIRS']

prop_dict = {}

prop_dict["Location name"] = loc_name
prop_dict["Latitude"] = latitude
prop_dict["Longitude"] = longitude

for i in range (len(lst)):
  prop_dict[lst[i]] = landsat_props.get(prp_lst[i]).getInfo()

for key, value in prop_dict.items():
    print(f"{key}: {value}",'\n')

get_csv = str(input("Do you want to download the metadata for the target location = "))

if (get_csv == "yes"):
  (pd.DataFrame.from_dict(data=prop_dict, orient='index')
   .to_csv('dict_file.csv', header=False))
else:
   print("thank you")


#--------------- create a display map of the target coordinate on the landsat data scene ------------------------ 

rgbVis = {'bands':["B4","B3","B2"], min:0, max:0.3}

# Add the image to the map
maps.addLayer(most_recent_landsat, rgbVis, 'Most Recent Landsat Image')
maps.addLayer(wrs2_geometry, {'color': 'red', 'opacity': 0.5}, 'Landsat Scene Extent')
maps.addLayer(target_point, {'color': 'blue'}, 'Target Point')

# Display the map


#--------------------- export the created scene map to a html file to display the map on browser--------------------

download_dir = os.path.join(os.path.expanduser("~"), "Downloads")
if not os.path.exists(download_dir):
    os.makedirs(download_dir)
html_file = os.path.join(download_dir, "my_map.html")
maps.to_html(filename=html_file, title="My Map", width="100%", height="880px")
import webbrowser
webbrowser.open(html_file)


#------------------ get/extract the landsat recent image stats for mean values of SR(surface reflection) 
# data and display it on graph -------------------------------------------------------------------------------------

landsat_stats = geemap.image_stats(most_recent_landsat, scale=90)
di = landsat_stats.getInfo()

def display_inner_keys(nested_dict, outer_key):
    for key, value in nested_dict.items():
        if key == outer_key and isinstance(value, dict):
            for inner_key in value.keys():
                lst_keys.append(inner_key)
        elif isinstance(value, dict):
            display_inner_keys(value, outer_key)  # Recursively process nested dictionaries

def display_inner_values(nested_dict, outer_key):
    for key, value in nested_dict.items():
        if key == outer_key and isinstance(value, dict):
            for inner_value in value.values():
                lst_vals.append(inner_value)
        elif isinstance(value, dict):
            display_inner_values(value, outer_key)  # Recursively process nested dictionaries


lst_keys = []
display_inner_keys(di, "mean")

lst_vals = []
display_inner_values(di, "mean")

res = dict(zip(lst_keys, lst_vals))


plt.plot(res.values())
plt.title('Spectral Signature')
plt.xlabel('Band Number')
plt.ylabel('Pixel Value')
plt.show()